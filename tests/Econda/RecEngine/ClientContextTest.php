<?php
use Econda\RecEngine\Client\Request\Context;

class ClientContextTest extends PHPUnit_Framework_TestCase
{
    use \Econda\Test\StandardGetterSetterTrait;

    public function testGetVisitorIdFromSession()
    {
        $cookieName = Context::COOKIE_NAME_VISITOR_ID;
        $_COOKIE[$cookieName] = 'some random cookie id';
        $this->assertEquals('some random cookie id', (new Context())->getVisitorId());
    }

    public function testGetSetVisitorId()
    {
        $c = new Context();
        $this->_testStringGetSet($c, 'visitorId', null);
    }

    public function testGetBestProductIdsFromSession()
    {
        $_COOKIE[Context::COOKIE_NAME_BEST_PRODUCTS] = '1234:5678:ABCD';
        $c = new Context();
        $this->assertEquals(['1234','5678','ABCD'], $c->getBestProductIds());
    }

    public function testGetSetBestProductIds()
    {
        $c = new Context();
        $this->assertEquals($c->setBestProductIds('123A')->getBestProductIds(), ['123A']);
        $this->assertEquals($c->setBestProductIds(['BVCC'])->getBestProductIds(), ['BVCC']);
    }
}