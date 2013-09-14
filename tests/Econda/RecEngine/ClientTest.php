<?php
/**
  * User: christoph.luetjen
  */

use Econda\RecEngine\Client;

class ClientTest extends PHPUnit_Framework_TestCase
{
    public function testClientConstructor()
    {
        try {
            $c = new Client();
            $this->fail('Client requires a configuration object/array in constructor.');
        } catch(Exception $e) {}

        $c = new Client(['accountId' => 'ACCOUNT']);
        $this->assertEquals('ACCOUNT', $c->getConfig()->getAccountId());
    }
}