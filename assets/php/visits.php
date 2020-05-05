<?php

//open the database
$db = new \PDO("mysql:dbname=u934219028_as;host=mysql.hostinger.hr", "u934219028_as", "euro2008", array(
    \PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
        ));


$table_visitors = 'visitors';


header('Access-Control-Allow-Origin: *');  
/*
  /*
 * Ajax SCRIPT ROUTING BY $_POST AND $_SERVER ARGUMENT
 */
$error_flag = false;
$data = $_POST ? $_POST : $_GET;

$ip = $_SERVER['REMOTE_ADDR'];

$location = file_get_contents('https://freegeoip.app/json/'.$ip);
$location=  json_decode($location);

$country= $location->country_name=="" ? $location->country_code : $location->country_name ;

$element = array(
    "ip" => $ip,
    "url" => $data["url"],
    "country" => $country,
    "from_url" => $data["from_url"]
);
    
$q = "INSERT INTO `$table_visitors` (";
$count = count($element);
foreach ($element as $col => $val) {
    $q.=" $col ";
    $count--;
    if ($count) {
        $q.=",";
    }
}
$q.=') VALUES (';
$count = count($element);
foreach ($element as $col => $val) {
    $q.=" '". urlencode($val)."'";
    $count--;
    if ($count) {
        $q.=",";
    }
}
$q.=')';
    
var_dump($q);

// add to database
$q = $db->prepare($q);
$error_flag = $q->execute();


echo json_encode(array("done" => $error_flag));
