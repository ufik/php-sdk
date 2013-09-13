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

use Econda\RecEngine\Config\ArrayConfig;
use Econda\RecEngine\Config\ConfigInterface;

/**
 * Adds configuration property + getter / setter to class
 */
trait ConfigAwareTrait
{
	/**
	 * Configuration
	 * @var \Econda\RecEngine\Config\ConfigInterface
	 */
	protected $config;
	
	/**
	 * Set configuration
	 * 
	 * @param mixed $config ConfigInterface or array
	 * @throws InvalidArgumentException
	 * @return \Econda\RecEngine\Config\ConfigAwareTrait
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
}