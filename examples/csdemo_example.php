<?php
/**
  * User: christoph.luetjen
  */
chdir(dirname(__DIR__));

require 'vendor/autoload.php';

$client = new \Econda\RecEngine\Client([
    'accountId' => '00000cec-d98025a8-912b-46a4-a57d-7a691ba7a376-1'
]);

// first we simple request a list of new products
$client->getRequest()->setWidgetId(6);
$response = $client->execute();

