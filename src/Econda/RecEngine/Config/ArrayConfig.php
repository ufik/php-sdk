<?php
/**
 * econda recommendations client library
 *
 * @copyright Copyright econda GmbH
 * @link http://www.econda.de
 * @package Econda/RecEngine
 * @license MIT License
 */
namespace Econda\RecEngine\Config;

use Econda\RecEngine\Exception\InvalidArgumentException;

/**
 * Configuration for cross sell related functions
 */
class ArrayConfig implements ConfigInterface
{
	/**
	 * Cross sell account id
	 * @var string
	 */
	protected $accountId;
	
	/**
	 * Constructor
	 * @param array $interable accepts an array ['propertyName' => 'value']
	 */
	public function __construct($arr=null)
	{
		if($arr != null) {
			if(!empty($arr['accountId'])) {
				throw new InvalidArgumentException("Missing array key 'accountId' or empty value in config.");
			}
			$this->setAccountId($arr['accountId']);
		}
	}
	
	/**
	 * Set crosssell account id
	 * @param string $accountId
	 */
	public function setAccountId($accountId)
	{
		$this->accountId = $accountId;
	}
	
	/**
	 * (non-PHPdoc)
	 * @see \Econda\RecEngine\Config\ConfigInterface::getAccountId()
	 */
	public function getAccountId()
	{
		return $this->accountId;
	}
}