<?php
namespace Econda\RecEngine\Widget\Model;

/**
 * This functions are required if we want to use this as model for widget renderer 
 */
interface ModelInterface
{
	/**
	 * Get widget title
	 * @return string
	 */
	public function getTitle();
	
	/**
	 * Get array of products
	 * @return array
	 */
	public function getProducts();
	
	/**
	 * True if this widget should not be displayed if there are no products to show
	 * @return true
	 */
	public function getDisableOnEmpty();
}