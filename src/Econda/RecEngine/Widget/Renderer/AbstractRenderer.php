<?php
/**
 * econda recommendations client library
 *
 * @copyright Copyright econda GmbH
 * @link http://www.econda.de
 * @package Econda/RecEngine
 * @license MIT License
 */
namespace Econda\RecEngine\Widget\Renderer;

use Econda\RecEngine\Widget\Model\ModelInterface;

/**
 * Base class for rendering a reccomendation widget
 */
abstract class AbstractRenderer
{
	/**
	 * @var \Econda\RecEngine\Widget\Model\ModelInterface
	 */
	protected $model;

	/**
	 * @param ModelInterface $model
	 * @return \Econda\RecEngine\Widget\Renderer\AbstractRenderer
	 */
	public function setModel(ModelInterface $model)
	{
		$this->model = $model;
		return $this;
	}
	
	/**
	 * @return \Econda\RecEngine\Widget\Model\ModelInterface
	 */
	public function getModel()
	{
		return $this->model;
	}
	
	/**
	 * insert variables in template
	 */
	abstract function render();
}