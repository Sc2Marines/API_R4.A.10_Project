<?php
    header('Content-Type: application/json');
    ini_set("allow_url_fopen", 1);
    echo file_get_contents('https://restcountries.com/v2/all');
?>