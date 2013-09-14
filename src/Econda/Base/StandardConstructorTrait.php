<?php
namespace Econda\Base;

/**
  * User: christoph.luetjen
  */

class StandardConstructorTrait
{
    protected function initPropertiesFromArray($data)
    {
        if(!is_array($data)) {
            throw new InvalidArgumentException("Constructor expects an array of properties with their values.");
        }
        foreach($data as $key => $value) {
            $setterName = 'get' . ucfirst($key);
            if(!method_exists($this, $setterName)) {
                throw new InvalidArgumentException("No property exists with name: " . $key);
            }
            $this->$setterName($value);
        }
    }
}