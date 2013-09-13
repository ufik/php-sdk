<?php
namespace Econda\RecEngine;

use Econda\RecEngine\Config\ConfigAwareTrait;
use Econda\RecEngine\Widget\Renderer\AbstractRenderer;
use Econda\RecEngine\Client\Request\Context;

class Widget
{
	use ConfigAwareTrait;
	
	/**
	 * Widget ID as defined in cross sell management interface
	 * @var int
	 */
	protected $widgetId;
	
	/**
	 * @var Context
	 */
	protected $context;
	
	/**
	 * Object to use to render this widget
	 * @var AbstractRenderer
	 */
	protected $renderer;
	
	public function __construct($config = null)
	{
		if($config) {
			$this->config = $config;
		}
		
		$this->context = new Context();
	}
	
	public function render()
	{
		
	}
}