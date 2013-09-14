<?php
/**
  * User: christoph.luetjen
  */

$serviceConfig = ['accountId' => 'YOUR ECONDA CROSS SELL ACCOUNT ID'];

// initialize client
$recClient = new \Econda\RecEngine\Client($serviceConfig);

// setup request
// context defines for which products/categories/... we want to get recommendations
$context = new \Econda\RecEngine\Client\Request\Context();
$context->setProductIds(['SKU1', 'SKU2']);

$recClient->getRequest()
    ->setWidgetId(123)
    ->setContext($context);

$response = $recClient->execute();

// done, process response

// --------------
// if you prefer a more compact style...

$recClient = new \Econda\RecEngine\Client(['accountId' => 'YOUR ECONDA CROSS SELL ACCOUNT ID']);
$recClient->getRequest()
    ->setWidgetId(123)
    ->setContext(new \Econda\RecEngine\Client\Request\Context(['productIds' => ['SKU1', 'SKU2']]));
$response = $recClient->execute();

