<?php
use Econda\RecEngine\Client\Request\Context;

class ClientContextTest extends PHPUnit_Framework_TestCase
{
    use \Econda\Test\StandardGetterSetterTrait;

    public function testContructor()
    {
        $c = new Context(['productIds' => ['ABC']]);;
        $this->assertEquals('ABC', $c->getProductIds()[0]);
    }

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

    public function testCategoryConstructor()
    {
        // empty
        $cat1 = new Context\Category();

        // with path array
        $cat2 = new Context\Category(['path' => ['level1', 'level2', 'level3']]);
        $this->assertEquals('level1', $cat2->getPath()[0]);

        // with category id
        $cat3 = new Context\Category(['id' => 'ABC']);
        $this->assertEquals('ABC', $cat3->getId());

        // with category path
        $cat4 = new Context\Category(['path' => 'level1/level2/level3', 'delimiter' => '/']);
        $this->assertEquals('level1', $cat4->getPath()[0]);
        $this->assertEquals('level3', $cat4->getPath()[2]);
    }

    public function testGetSetCategoryId()
    {
        $c = new Context\Category();
        $this->_testStringGetSet($c, 'id', null);
    }

    public function testGetSetCategoryPath()
    {
        $c = new Context\Category();
        $this->assertEquals('level1', $c->setPath(['level1', 'level2'])->getPath()[0]);
        $this->assertEquals('level1', $c->setPathFromString('level1/level2')->getPath()[0]);
        $this->assertEquals('level1', $c->setPathFromString('level1.level2', '.')->getPath()[0]);
    }

    public function testGetSetCategoryType()
    {
        $c = new Context\Category();
        $this->_testStringGetSet($c, 'type', null);
    }

    public function testGetSetCategoryVariant()
    {
        $c = new Context\Category();
        $this->_testStringGetSet($c, 'variant', null);
    }
}