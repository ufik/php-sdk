<?php
class ClientRequestTest extends PHPUnit_Framework_TestCase
{
	use \Econda\Test\StandardGetterSetterTrait;
	
	public function testGetSetWidgetId()
	{
		$req = new \Econda\RecEngine\Client\Request();
		$this->_testNumericGetSet($req, 'widgetId', null);
	}
		
	public function testGetSetStartIndex()
	{
		$req = new \Econda\RecEngine\Client\Request();
		$this->_testNumericGetSet($req, 'startIndex', 0);
	}

	public function testGetSetStartChunkSize()
	{
		$req = new \Econda\RecEngine\Client\Request();
		$this->_testNumericGetSet($req, 'chunkSize', null);
	}
	
	public function testGetSetIncludeWidgetDetails()
	{
		$req = new \Econda\RecEngine\Client\Request();
		$this->_testBooleanGetSet($req, 'includeWidgetDetails', true);
	}
	

}