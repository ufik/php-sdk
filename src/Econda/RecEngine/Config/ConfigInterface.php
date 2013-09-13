<?php
namespace Econda\RecEngine\Config;

/**
 * Configuration classes for econda recommendation engine must implement this interface
 */
interface ConfigInterface
{
	/**
	 * Get econda cross sell accountid
	 * @return string
	 */
	public function getAccountId();
}