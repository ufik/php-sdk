<?php
namespace Econda\Test;

trait StandardGetterSetterTrait
{
	protected function _testNumericGetSet($obj, $propertyName, $defaultValue)
	{
		$this->_testGetter($obj, $propertyName, $defaultValue); // first !!
		$this->_testNumericSetter($obj, $propertyName);
	}
	
	protected function _testBooleanGetSet($obj, $propertyName, $defaultValue)
	{
		$this->_testGetter($obj, $propertyName, $defaultValue);
		$this->_testBooleanSetter($obj, $propertyName, $defaultValue);
	}
	
	protected function _testGetter($obj, $propertyName, $defaultValue)
	{
		$setterName = 'set' . ucfirst($propertyName);
		$getterName = 'get' . ucfirst($propertyName);
		
		$this->assertTrue(method_exists($obj, $getterName), 'No getter for ' . $propertyName);
		$this->assertTrue(method_exists($obj, $setterName), 'Could not set value, no setter for ' . $propertyName);
		$this->assertSame($obj->$getterName(), $defaultValue);
		
		$obj->$setterName(123);
		$this->assertEquals($obj->$getterName(),
				123
			);
	}
	
	protected function _testBooleanSetter($obj, $propertyName)
	{
		$setterName = 'set' . ucfirst($propertyName);
		
		$this->assertTrue(method_exists($obj, $setterName), 'No setter for ' . $propertyName);
		$this->assertSame($obj, $obj->$setterName(true));
	}
	
	protected function _testNumericSetter($obj, $propertyName)
	{
		$setterName = 'set' . ucfirst($propertyName);
		
		$this->assertTrue(method_exists($obj, $setterName), 'No setter for ' . $propertyName);
		$this->assertSame($obj, $obj->$setterName(123));
		$this->assertSame($obj, $obj->$setterName("123"));
		
		try {
			$obj->$setterName("1A5");
			$this->fail("Setter must throw an InvalidArgumentException.");
		} catch(\InvalidArgumentException $e) {}
	}
}