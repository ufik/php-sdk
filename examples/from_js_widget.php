<?php
chdir(dirname(__DIR__));

require 'vendor/autoload.php';

// sample data as our js widget would provide
$_REQUEST['data'] = '{"id":6,"accountId":"00000cec-d98025a8-912b-46a4-a57d-7a691ba7a376-1","context":{"productIds":["prodId1","prodId2"],"category":{"type":"brand","path":["econda"],"id":null}},"startIndex":0}';

$widget = new \Econda\RecEngine\Widget\Widget(json_decode($_REQUEST['data']));
$widget->setTemplatePath(__DIR__ . '/example_template.phtml');
echo $widget->render();

echo "DEBUG: >> ----------------\n";
echo $widget->getLastRequestInfo(true);