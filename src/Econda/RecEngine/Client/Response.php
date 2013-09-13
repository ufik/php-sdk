<?php
namespace Econda\RecEngine\Client;

use Econda\RecEngine\Widget\Model\ModelInterface;

class Response implements ModelInterface
{
	protected $httpResponse;
	
	protected $title;
	
	public function getHttpResponse()
	{
		return $this->httpResponse;
	}
}