<?php
/**
  * This example shows how to acces the econda recommendations service and render
  * an HTML output using the SDK's renderer function
  */
chdir(dirname(__DIR__));

// this will setup autoloading if installed using composer.
require 'vendor/autoload.php';

// get widget instance. Widget id defines which widget configuration to use (as defined in cross sell management interface
$widget = new \Econda\RecEngine\Widget\Widget(array(
    'accountId' => '00000cec-d98025a8-912b-46a4-a57d-7a691ba7a376-1',
    'id' => 6
));

// set template from string (s.a. setTemplatePath() )
$widget->setTemplate(implode('', array(
    '<div>',
        '<div><?= $this->getTitle() ?></div>',
        '<ul>',
            '<?php foreach($this->getProducts() as $product): ?>',
                '<li><?= $product["id"] ?></li>',
            '<?php endforeach; ?>',
        '</ul>',
    '</div>')));
	
// render widget and output result
echo $widget->render();