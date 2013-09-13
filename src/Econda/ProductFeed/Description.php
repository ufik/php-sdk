<?php
namespace Econda\ProductFeed;

class Description
{
	/**
	 * Name of generator, e.g. "econda top-shop plugin"
	 * @var string
	 */
	protected $generatorName = '';
	
	/**
	 * Version number of generator, e.g. "1.5"
	 * @var string
	 */
	protected $generatorVersion = '';
	
	/**
	 * List of datasources provided by this product feed
	 * @var unknown
	 */
	protected $dataSources;
}