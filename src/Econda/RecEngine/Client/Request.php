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

use Econda\RecEngine\Exception\InvalidArgumentException;
use Econda\RecEngine\Client\Request\Context;

class Request
{
	/**
	 * Request context (recommendations for...)
	 * @var Context
	 */
	protected $context;
	
	/**
	 * Widget id from cross sell management interface
	 * @var int
	 */
	protected $widgetId;
	
	/**
	 * Number of elements to retrieve
	 * @var int
	 */
	protected $chunkSize;
	
	/**
	 * First product element to retrieve
	 * @var int
	 */
	protected $startIndex = 0;
	
	/**
	 * True to get widget details in crosssell response
	 * @var bool
	 */
	protected $includeWidgetDetails = true;

    /**
     * Array of product ids to exclude from response data
     * @var array
     */
    protected $excludeProductIds = [];

	/**
	 * Constructor
	 */
	public function __construct()
	{
	}
	
	/**
	 * Context to get recommendations for
	 * @param Context $context
     * @return $this
     */
	public function setContext(Context $context)
	{
		$this->context = $context;
		return $this;
	}
	
	/**
	 * Get current context
	 * @return Context
	 */
	public function getContext()
	{
		return $this->context;
	}
	
	/**
	 * Get current widget id
	 * @return int
	 */
	public function getWidgetId()
	{
		return $this->widgetId;
	}
	
	/**
	 * Set widget id as defined in cross sell management interface
	 * 
	 * @param numeric $widgetId
	 * @throws InvalidArgumentException
	 * @return \Econda\RecEngine\Client\Request
	 */
	public function setWidgetId($widgetId)
	{
		if(!is_numeric($widgetId)) {
			throw new InvalidArgumentException('Value is not an integer');
		}
		$this->widgetId = (int) $widgetId;
		return $this;
	}
	
	/**
	 * Get first requested element index
	 * @return number
	 */
	public function getStartIndex()
	{
		return $this->startIndex;
	}
	
	/**
	 * Set first element. Used for server side paging
	 * @param int $index
	 * @throws InvalidArgumentException
	 * @return \Econda\RecEngine\Client\Request
	 */
	public function setStartIndex($index)
	{
		if(!is_numeric($index)) {
			throw new InvalidArgumentException('Value is not an integer.');
		}
		$this->startIndex = (int) $index;
		return $this;
	}
	
	/**
	 * Get max number of recommendations
	 * @return number
	 */
	public function getChunkSize()
	{
		return $this->chunkSize;
	}
	
	/**
	 * Set max number of recommendations to return
	 * @param number $chunkSize
	 * @throws InvalidArgumentException
	 * @return \Econda\RecEngine\Client\Request
	 */
	public function setChunkSize($chunkSize)
	{
		if(!is_numeric($chunkSize)) {
			throw new InvalidArgumentException("Value is not an integer.");
		}
		$this->chunkSize = (int) $chunkSize;
		return $this;
	}
	
	/**
	 * True if we'll include widget details in response
	 * @return boolean
	 */
	public function getIncludeWidgetDetails()
	{
		return $this->includeWidgetDetails;
	}
	
	/**
	 * Set to false to exclude widget details from server response
	 * @param boolean $includeWidgetDetails
	 * @return \Econda\RecEngine\Client\Request
	 */
	public function setIncludeWidgetDetails($includeWidgetDetails)
	{
		$this->includeWidgetDetails = $includeWidgetDetails;
		return $this;
	}

    /**
     * Set product ids to exclude from response data
     * @param array|string $productIds
     * @return $this
     */
    public function setExcludeProductIds($productIds)
    {
        if(!is_array($productIds)) {
            $productIds = [$productIds];
        }
        $this->excludeProductIds = $productIds;
        return $this;
    }

    /**
     * Get array of product ids to exclude from response data
     * @return array
     */
    public function getExcludeProductIds()
    {
        return $this->excludeProductIds;
    }
}