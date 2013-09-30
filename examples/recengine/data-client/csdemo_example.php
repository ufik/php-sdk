<?php
// this example shows how to get recommendations from cross sell recommendations service
// we will not render the result to html, it's just about fetching data

chdir(dirname(__DIR__));

// setup autoloading, this will work, if you've imported this library using composer
require 'vendor/autoload.php';

// create client instance
$client = new \Econda\RecEngine\Client\Client(array(
    'accountId' => '00000cec-d98025a8-912b-46a4-a57d-7a691ba7a376-1'
));

// first we request a list of new products. Rules are defined in cross sell management interface
// widget id defines which ruleset to use
$client->getRequest()->setWidgetId(6);
$response = $client->execute();

echo "RESPONSE =>\n";
echo "Title: " . $response->getTitle() . "\n";
foreach($response->getProducts() as $data) {
    echo "- " . $data['id'] . ': ' . $data['price'] . "\n";
}

// get product id of first product in response, we'll use it as context later
$firstProductId = $response->getProducts()[0]['id'];

// get recommendations for iven product
$client->setRequest(new \Econda\RecEngine\Client\Request\RequestModel(array(
    'widgetId' => 7,
    'context' => new \Econda\RecEngine\Context\Context(array(
        'productIds' => $firstProductId
    ))
)));
$response = $client->execute();

// output info
echo "RECOMMENDATIONS FOR =>" . $firstProductId ."\n";
echo "Title: " . $response->getTitle() . "\n";
foreach($response->getProducts() as $data) {
    echo "- " . $data['id'] . ': ' . $data['price'] . "\n";
}
