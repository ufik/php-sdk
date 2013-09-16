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

use Econda\RecEngine\Exception\RuntimeException;
use Econda\RecEngine\Exception\InvalidArgumentException;

class HtmlRenderer extends AbstractRenderer
{
	/**
	 * Html code of template
	 * @var string
	 */
	protected $template;
	
	/**
	 * Path to template file. Ignored if template is set
	 * @var string
	 */
	protected $templatePath;

	/**
	 * @param mixed $template string or array of strings
	 * @throws InvalidArgumentException
	 * @return \Econda\RecEngine\Widget\Renderer\HtmlRenderer
	 */
	public function setTemplate($template)
	{
		switch(true) {
			case is_array($template):
				$this->template = implode('', $template);
				break;
			case is_string($template):
				$this->template = $template;
				break;
			default:
				throw new InvalidArgumentException("String or array of strings expected as template.");
		}
		return $this;
	}
	
	/**
	 * @return string
	 */
	public function getTemplate()
	{
		return $this->template;
	}
	
	/**
	 * Set path to template
	 * @param string $templatePath
	 * @return \Econda\RecEngine\Widget\Renderer\HtmlRenderer
	 */
	public function setTemplatePath($templatePath)
	{
		$this->templatePath = $templatePath;
		return $this;
	}
	
	/**
	 * Path to template
	 * @return string
	 */
	public function getTemplatePath()
	{
		return $this->templatePath;
	}
	
	/**
	 * (non-PHPdoc)
	 * @see \Econda\RecEngine\Widget\Renderer\AbstractRenderer::render()
	 */
	public function render()
	{
		if(!$this->template && !$this->templatePath) {
			throw new RuntimeException('Missing template.');
		}
		if(!$this->model) {
			throw new RuntimeException('Missing render model.');
		}
		
		if($this->template) {
			$phtml = $this->template;
		} else {
			$path = $this->templatePath;
			if(!file_exists($path)) {
				throw new RuntimeException('Template file does not exist: ' . $path);
			}
            $phtml = file_get_contents($path);
		}
        return eval('?>' . $phtml);
	}

    /**
     * Redirects functions calls to assigned model
     * @param $methodName
     * @param $arguments
     * @return mixed
     */
    public function __call($methodName, $arguments)
	{
        return call_user_func_array(array($this->model, $methodName), $arguments);
	}
}