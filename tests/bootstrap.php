<?php
chdir(dirname(__DIR__));

function testAutoload($className)
{
	$className = ltrim($className, '\\');
    $fileName  = '';
    $namespace = '';
    if ($lastNsPos = strripos($className, '\\')) {
        $namespace = substr($className, 0, $lastNsPos);
        $className = substr($className, $lastNsPos + 1);
        $fileName  = str_replace('\\', DIRECTORY_SEPARATOR, $namespace) . DIRECTORY_SEPARATOR;
    }
    $fileName .= './src/' . str_replace('_', DIRECTORY_SEPARATOR, $className) . '.php';

    if(file_exists($fileName)) {
    	require $fileName;
    }
}
spl_autoload_register('testAutoload');

require_once dirname(__DIR__) . '/vendor/autoload.php';

require_once __DIR__ . '/Econda/Test/StandardGetterSetterTrait.php';