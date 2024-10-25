<?php

// print_r($_GET['route']); 

$route = $_GET['route'] ?? '';


switch ($route) {
    case '';
        require 'templates/home.php';
        break;

    case $route;
        require 'templates/category.php';
        break;    
        
    // case 'samorezy';
    //     require 'templates/category.php';
    //     break;    
}





