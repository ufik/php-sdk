<?php
/**
 * econda recommendations client library
 *
 * @copyright Copyright econda GmbH
 * @link http://www.econda.de
 * @package Econda/RecEngine
 * @license MIT License
 */
namespace Econda\RecEngine\Widget;

use Econda\RecEngine\Client\Client;
use Econda\RecEngine\Client\Request\RequestModel;
use Econda\RecEngine\Config\ArrayConfig;
use Econda\RecEngine\Exception\InvalidArgumentException;
use Econda\RecEngine\Widget\Model\ModelInterface;
use Econda\RecEngine\Widget\Renderer\AbstractRenderer;
use Econda\RecEngine\Widget\Renderer\HtmlRenderer;
use Econda\RecEngine\Context\Context;

class Widget
{
	/**
	 * Widget ID as defined in cross sell management interface
	 * @var int
	 */
	protected $id;
	
	/**
	 * Configuration
	 * @var \Econda\RecEngine\Config\ConfigInterface
	 */
	protected $config;
	
	/**
	 * @var Context
	 */
	protected $context;

    /**
     * Data to render (result of request)
     * @var ModelInterface
     */
    protected $model;

    /**
     * Index of first item, starting at 0
     * @var int
     */
    protected $startIndex = 0;

    /**
     * Max numer of items to retrieve from rec service
     * @var int
     */
    protected $chunkSize;

    /**
     * Template Html
     * @var string
     */
    protected $template;

    /**
     * Path to file containing template html
     * @var string
     */
    protected $templatePath;

	/**
	 * Object to use to render this widget
	 * @var AbstractRenderer
	 */
	protected $renderer;
	
	/**
	 * Reference to last used econda client
	 * @var \Econda\RecEngine\Client\Client
	 */
	protected $client;
	
	public function __construct($config = null)
	{
		$this->context = new Context();
		
		if($config) {
			if(is_object($config) && get_class($config) == 'stdClass') {
				$config = get_object_vars($config);
			}
				
			$this->config = new ArrayConfig();
            if(isset($config['accountId'])) {
                $this->config->setAccountId($config['accountId']);
                unset($config['accountId']);
            }
            $this->initPropertiesFromArray($config);
		}
	}
	
	
	protected function initPropertiesFromArray($data)
	{
		if(!is_array($data)) {
			throw new InvalidArgumentException("Constructor expects an array of properties with their values.");
		}
		foreach($data as $key => $value) {
			$setterName = 'set' . ucfirst($key);
			if(!method_exists($this, $setterName)) {
				throw new InvalidArgumentException("No setter found for property with name: " . $key);
			}
			$this->$setterName($value);
		}
	}

	/**
	 * Set configuration
	 *
	 * @param mixed $config ConfigInterface or array
	 * @throws InvalidArgumentException
	 * @return Widget
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
	
    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        if(!is_numeric($id)) {
            throw new InvalidArgumentException("Value for property id must be numeric.");
        }
        $this->id = (int) $id;
        return $this;
    }

    public function getRenderer()
    {
        if(!$this->renderer) {
            $this->renderer = new HtmlRenderer();
        }
        return $this->renderer;
    }

    public function setRenderer(AbstractRenderer $renderer)
    {
        $this->renderer = $renderer;
        return $this;
    }

    public function getContext()
    {
        return $this->context;
    }

    public function setContext($context)
    {
    	if($context instanceof Context == false) {
    		$context = new Context($context);
    	}
        $this->context = $context;
        return $this;
    }

    public function setStartIndex($startIndex)
    {
    	if(!is_numeric($startIndex)) {
    		throw new InvalidArgumentException("Start index must be a number.");
    	}
    	$this->startIndex = $startIndex;
    	return $this;
    }
    
    public function getStartIndex()
    {
    	return $this->startIndex;
    }
    
    public function setChunkSize($chunkSize)
    {
    	if($chunkSize != null && is_numeric($chunkSize) == false) {
    		throw new InvalidArgumentException("Chunk size must be a number or null.");
    	}
    	$this->chunkSize = $chunkSize;
    	return $this;
    }
    
    public function getModel()
    {
        return $this->model;
    }

    public function setModel(ModelInterface $model)
    {
        $this->model = $model;
        return $this;
    }

    public function setTemplate($template)
    {
        $this->template = $template;
        return $this;
    }

    public function getTemplate()
    {
        return $this->template;
    }

    public function setTemplatePath($path)
    {
        $this->templatePath = $path;
        return $this;
    }

    public function getTemplatePath()
    {
        return $this->templatePath;
    }

	public function render()
	{
		if(!$this->model) {
            $this->executeRequest();
        }

        $renderer = $this->getRenderer();
        $renderer->setModel($this->model);

        if($this->template) {
            $renderer->setTemplate($this->template);
        }
        if($this->templatePath) {
            $renderer->setTemplatePath($this->templatePath);
        }

        $html = $renderer->render();
        return $html;
	}

    /**
     * Get recommendations from rec service and write to model property.
     */
    public function executeRequest()
    {
        $client = new Client($this->getConfig());
        $client->getRequest()
            ->setStartIndex($this->startIndex)
            ->setChunkSize($this->chunkSize)
            ->setWidgetId($this->id)
            ->setContext($this->context);

        $this->model = $client->execute();
        
        $this->client = $client;
    }
    
    public function getLastRequestInfo($asString = false)
    {
    	if($this->client) {
    		return $this->client->getLastRequestInfo($asString);
    	} else {
    		return null;
    	}
    }
}