<?php
/**
 * econda recommendations client library
 *
 * @copyright Copyright econda GmbH
 * @link http://www.econda.de
 * @package Econda/RecEngine
 * @license MIT License
 */
namespace Econda\RecEngine\Client;

use Econda\RecEngine\Client\Response\ResponseModel;
use Econda\RecEngine\Client\Request\RequestModel;
use Econda\RecEngine\Exception\RuntimeException;
use Econda\RecEngine\Client\Request\Context;
use Econda\RecEngine\Exception\InvalidArgumentException;
use Econda\RecEngine\Config\ConfigInterface;
use Econda\RecEngine\Config\ArrayConfig;

/**
 * Client to request recommendations from econda recommendation engine.
 */
class Client
{
    const REC_SERVICE_BASE_URI = 'http://widgets.crosssell.info';

    /**
     * Configuration
     * @var \Econda\RecEngine\Config\ConfigInterface
     */
    protected $config;
    
	/**
	 * request object or null if not initialized
	 * 
	 * @var \Econda\RecEngine\Client\Request
	 */
	protected $request;

    /**
     * @var object
     */
    protected $httpClient;

    /**
     * Last send http request
     * @var object
     */
    protected $lastHttpRequest;
    
    /**
     * @var Response
     */
    protected $response;

	/**
	 * Constructor, requires configuration
	 * @param mixed $config
	 */
	public function __construct($config = null)
	{
		if($config) {
			$this->setConfig($config);
		}
		
		$this->request = new RequestModel();
	}
	
	/**
	 * Set configuration
	 *
	 * @param mixed $config ConfigInterface or array
	 * @throws InvalidArgumentException
	 * @return Client
	 */
	public function setConfig($config)
	{
		switch(true) {
			case is_array($config):
				$this->config = new ArrayConfig($config);
				break;
			case ($config instanceof ConfigInterface):
				$this->config = $config;
				break;
			default:
				throw new InvalidArgumentException('Got invalid configuration data in constructor.');
		}
		return $this;
	}
	
	/**
	 * @return ConfigInterface
	 */
	public function getConfig()
	{
		return $this->config;
	}
	
	/**
	 * Get request or null in not initialized
	 * 
	 * @return \Econda\RecEngine\Client\Request
	 */
	public function getRequest()
	{
		return $this->request;
	}
	
	/**
	 * Set request object.
	 * 
	 * @param Client\Request $request
	 * @return \Econda\RecEngine\Client
	 */
	public function setRequest(RequestModel $request)
	{
		$this->request = $request;
		return $this;
	}

    /**
     * @return \Guzzle\Http\Client
     */
    public function getHttpClient()
    {
        if(!$this->httpClient) {
            $this->httpClient = new \Guzzle\Http\Client(self::REC_SERVICE_BASE_URI);
        }
        return $this->httpClient;
    }

    /**
     * Sends request to recommendation server and returns recommendations on success or null on error
     * @return Response|null
     */
    public function execute()
    {
        $httpClient = $this->getHttpClient();

        $httpRequest = $httpClient->post('/eps/crosssell/recommendations/' . $this->config->getAccountId() . '.do');
        $headers = $httpRequest->getHeaders();
        $httpRequest->addHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
        $httpRequest->addHeader('User-Agent', 'Econda PHP SDK');

        $httpRequest->addPostFields($this->getHttpPostFields());
        $httpResponse = $httpRequest->send();

        if($httpResponse->isSuccessful()) {
            $responseData = $httpResponse->json();
            $this->response = $this->getResponseFromHttpResponse($responseData);
        }

        $this->lastHttpRequest = $httpRequest;
        
        return $this->response;
    }

    protected function getResponseFromHttpResponse($responseData)
    {
        $response = new ResponseModel();

        if(isset($responseData['start'])) {
            $response->setStartIndex($responseData['start']);
        }
        if(isset($responseData['title'])) {
            $response->setTitle($responseData['title']);
        }
        if(isset($responseData['items'])) {
            $response->setProducts($responseData['items']);
        }

        return $response;
    }

    /**
     * Read request and context and return array key > value with post parameters
     * @return array
     * @throws RuntimeException
     */
    protected function getHttpPostFields()
    {
        $config = $this->getConfig();
        $request = $this->getRequest();
        $context = $request->getContext();

        $params = array();

        $params['aid'] = $config->getAccountId();

        $params['type'] = $request->getType();
        $params['wid'] = $request->getWidgetId();
        $params['start'] = $request->getStartIndex();
        if($chunkSize = $request->getChunkSize()) {
            $params['csize'] = $chunkSize;
        }
        $params['widgetdetails'] = $request->getIncludeWidgetDetails() ? '1' : '0';

        if($productIdsToExclude = $request->getExcludeProductIds()) {
            $params['excl'] = $productIdsToExclude;
        }

        // context
        if($visitorId = $context->getVisitorId()) {
            $params['emvid'] = $visitorId;
        }
        if($productIds = $context->getProductIds()) {
            $params['pid'] = $productIds;
        }
        $categories = $context->getCategories();
        if(count($categories) > 0) {
            if(count($categories) > 1) {
                throw new RuntimeException("Only one or zero categories in context allowed in current implementation.");
            }
            $cat = $categories[0]; /* @var $cat Context\Category */
            $params['ctxcat.ct'] = $cat->getType();
            if($catId = $cat->getId()) {
                $params['ctxcat.cid'] = $catId;
            } else {
                $params['ctxcat.paa'] = $cat->getPath();
                $params['ctxcat.pv'] = $cat->getVariant();
            }
        }

        return $params;
    }

    public function getResponse()
    {
        return $this->response;
    }
    
    /**
     * Just a debug function. Retuns info to last send http request
     * @param string $asString
     * @return Ambigous <string, multitype:NULL >
     */
    public function getLastRequestInfo($asString=false)
    {
    	$req = $this->lastHttpRequest;
    	
    	$info = array();
    	$info['headers'] = $req->getHeaders()->getAll();
    	$info['fields'] = $req->getPostFields()->getAll();
    	
    	// string outpug
    	$text = "HEADERS:\n";
    	$headers = $info['headers'];
    	foreach($headers as $header) {
    		$text.= "- " . $header->getName() . ': ' . implode(', ', $header->toArray()) . "\n";
    	}
    	$text.= "PARAMS:\n";
    	foreach($info['fields'] as $field => $value) {
    		$text.= $field . ': ' . $value . "\n";
    	}
    	
    	return ($asString? $text : $info);
    }
}