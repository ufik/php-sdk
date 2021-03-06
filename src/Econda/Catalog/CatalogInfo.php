<?php
namespace Econda\Catalog;

/**
 * Provides information about the local product catalog
 * 
 * @author cluetjen
 */
class CatalogInfo
{
	/**
	 * Name of shop system
	 * @var string
	 */
	protected $shopSystemName = '';
	
	/**
	 * Version of shop system
	 * @var string
	 */
	protected $shopSystemVersion = '';
	
	/**
	 * Name of contact person in case of technical problems
	 * @var string
	 */
	protected $contactName = '';
	
	/**
	 * Email of contact person
	 * @var string
	 */
	protected $contactEmail = '';
	
	/**
	 * Phone number of contact person
	 * @var string
	 */
	protected $contactPhone = '';
	
	/**
	 * Charset used in data (UTF-8, or ISO code)
	 * @var string
	 */
	protected $charset = 'UTF-8';
	
	/**
	 * Collection of available fields (meta data)
	 * @var unknown
	 */
	protected $fields;
}