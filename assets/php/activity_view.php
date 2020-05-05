<?php

//open the database
$db = new \PDO("mysql:dbname=u934219028_as;host=mysql.hostinger.hr", "u934219028_as", "euro2008", array(
    \PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
        ));


$table_visitors = 'visitors';

//DOHVAĆAMO SVE REZERVACIJE

$q = "SELECT * FROM `$table_visitors`";
$q = $db->prepare($q);
$q->execute();

$tablica = array();
foreach ($q as $visit) {
    echo $visit["id"] ."\t". $visit["timestamp"] ."\t". $visit["ip"] ."\t".$visit["country"] ."\t".urldecode($visit["url"]) ."\t".urldecode($visit["from_url"])."<br>";
}