<?php
/**
 * econda recommendations client library
 *
 * @copyright Copyright econda GmbH
 * @link http://www.econda.de
 * @package Econda/RecEngine
 * @license MIT License
 */
namespace Econda\RecEngine\Client\Request\Context;

use Econda\RecEngine\Base\StandardConstructorTrait;
use Econda\RecEngine\Exception\InvalidArgumentException;

/**
 * Class Category specifies a category to get recommendations for
 * @package Econda\RecEngine
 */
class Category
{
    use StandardConstructorTrait;

    /**
     * @var string
     */
    protected $id;

    /**
     * @var array <string>
     */
    protected $path;

    /**
     * @var string
     */
    protected $variant;

    /**
     * @var string
     */
    protected $type;

    /**
     * Constructor
     * @param null $data
     */
    public function __construct($data=null)
    {
        if($data) {
            if(isset($data['delimiter'])) {
                $this->setPathFromString($data['path'], $data['delimiter']);
            } else {
                $this->initPropertiesFromArray($data);
            }
        }
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    public function getType()
    {
        return $this->type;
    }

    public function setType($type)
    {
        $this->type = $type;
        return $this;
    }

    public function getPath()
    {
        return $this->path;
    }

    public function setPath($parts)
    {
        if(!is_array($parts)) {
            throw new InvalidArgumentException("Path must be an array of strings. S.a. setPathFromString().");
        }
        $this->path = $parts;
        return $this;
    }

    public function setPathFromString($path, $delimiter = '/')
    {
        $this->path = explode($delimiter, $path);
        return $this;
    }

    public function getVariant()
    {
        return $this->variant;
    }

    public function setVariant($variant)
    {
        $this->variant = $variant;
        return $this;
    }
}