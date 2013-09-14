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

    public function testGetSetExcludeProductIds()
    {
        $req = new \Econda\RecEngine\Client\Request();
        $this->assertEquals([], $req->getExcludeProductIds());
        $this->assertSame($req, $req->setExcludeProductIds('ABC'));
        $this->assertEquals(['ABC'], $req->getExcludeProductIds());
        $this->assertEquals(['A1','A2'], $req->setExcludeProductIds(['A1','A2'])->getExcludeProductIds());
    }

    public function testGetSetContext()
    {
        $req = new \Econda\RecEngine\Client\Request();
        $req->setContext((new \Econda\RecEngine\Client\Request\Context(['productIds' => 'ABC'])));
        $this->assertEquals('ABC', $req->getContext()->getProductIds()[0]);
    }
}