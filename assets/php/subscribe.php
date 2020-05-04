<?php

//open the database
$db = new \PDO("mysql:dbname=u934219028_as;host=mysql.hostinger.hr", "u934219028_as", "euro2008", array(
    \PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
        ));


$table_subscribe = 'subscribers';
$table_preorder = 'preorders';
$table_contact = 'contact';


header('Access-Control-Allow-Origin: *');  
/*
  /*
 * Ajax SCRIPT ROUTING BY $_POST AND $_SERVER ARGUMENT
 */
$error_flag = false;
$arrayOfParameters = $_POST ? $_POST : $_GET;

if (isset($arrayOfParameters['action']) ) { //Checks if action value exists
    if($arrayOfParameters['action'] == "contact"){
        $q = "INSERT INTO `$table_contact` (";
        $element = array('email' => $arrayOfParameters['email'], 'name' => $arrayOfParameters['name'], 'message' => $arrayOfParameters['message']);
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
        
        // add to database
        $q = $db->prepare($q);
        $error_flag = $q->execute();
    }elseif($arrayOfParameters['action'] == "subscribe"){
        
        $q = "INSERT INTO `$table_subscribe` (";
        $element = array('email' => $arrayOfParameters['email']);
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
        
        // add to database
        $q = $db->prepare($q);
        $error_flag = $q->execute();
    }elseif($arrayOfParameters['action'] == "preorder"){
        $q = "INSERT INTO `$table_preorder` (";
        $element = array('email' => $arrayOfParameters['email'], 'name' => $arrayOfParameters['name'], 'quantity' => $arrayOfParameters['quantity'], 'message' => $arrayOfParameters['message']);
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
        
        // add to database
        $q = $db->prepare($q);
        $error_flag = $q->execute();
    }
}

$m_address = 'antun.skuric@outlook.com';
$message = '';
foreach ($arrayOfParameters as $key => $value) {
    $message.=$key . ' : ' . $value . "\n";
}
mail($m_address,$arrayOfParameters["action"], $message);


echo json_encode(array("done" => $error_flag));
