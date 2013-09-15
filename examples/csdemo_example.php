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

echo "RESPONSE =>\n";
echo "Title: " . $response->getTitle() . "\n";
foreach($response->getProducts() as $data) {
    echo "- " . $data['id'] . ': ' . $data['price'] . "\n";
}

$firstProductId = $response->getProducts()[0]['id'];

// get recommendations for a given product
$client->setRequest(new \Econda\RecEngine\Client\Request([
    'widgetId' => 7,
    'context' => new \Econda\RecEngine\Client\Request\Context([
        'productIds' => $firstProductId
    ])
]));
$response = $client->execute();
echo "RECOMMENDATIONS FOR =>" . $firstProductId ."\n";
echo "Title: " . $response->getTitle() . "\n";
foreach($response->getProducts() as $data) {
    echo "- " . $data['id'] . ': ' . $data['price'] . "\n";
}
