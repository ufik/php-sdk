<?php
/**
  * User: christoph.luetjen
  */
chdir(dirname(__DIR__));

require 'vendor/autoload.php';

$widget = new \Econda\RecEngine\Widget\Widget(array(
    'accountId' => '00000cec-d98025a8-912b-46a4-a57d-7a691ba7a376-1',
    'id' => 6
));
$widget->setTemplate(implode('', array(
    '<div>',
        '<div><?= $this->getTitle() ?></div>',
        '<ul>',
            '<?php foreach($this->getProducts() as $product): ?>',
                '<li><?= $product["id"] ?></li>',
            '<?php endforeach; ?>',
        '</ul>',
    '</div>')));
echo $widget->render();