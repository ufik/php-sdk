<?php
chdir(dirname(__DIR__));

require 'vendor/autoload.php';

$widget = new \Econda\RecEngine\Widget\Widget(array(
    'accountId' => '00000cec-d98025a8-912b-46a4-a57d-7a691ba7a376-1',
    'id' => 6
));
$widget->setTemplatePath(__DIR__ . '/example_template.phtml');
echo $widget->render();

// second widget for category
$widget = new \Econda\RecEngine\Widget\Widget(array(
		'accountId' => '00000cec-d98025a8-912b-46a4-a57d-7a691ba7a376-1',
		'id' => 6,
		'context' => new \Econda\RecEngine\Client\Request\Context\Context(array(
				'category' => new \Econda\RecEngine\Client\Request\Context\Category(array(
						'type' => 'productcategory',
						'id' =>  '0000001574herren-schuhe-offene-schuhe'
					))
			))
));
$widget->setTemplatePath(__DIR__ . '/example_template.phtml');
echo $widget->render();

echo $widget->getLastRequestInfo(true);