<?php
$data = json_decode(file_get_contents('php://input'), true);

$pdo = new PDO("mysql:host=localhost;dbname=misha-catalog2", "root", "");
// $pdo = new PDO("mysql:host=localhost;dbname=k908509b_sol", "k908509b_sol", "hitler@4850");

$catUrl = $data['catUrl'];

$sql = "SELECT p.*, c.ru_name AS category_ru_name
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE c.name = '$catUrl'";

$stmt = $pdo->prepare($sql);
$stmt->execute();
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($products);



// require 'rb/rb-mysql.php'; // Подключаем RedBeanPHP

// // Настраиваем соединение с базой данных
// R::setup('mysql:host=localhost;dbname=misha-catalog2', 'root', '');

// $data = json_decode(file_get_contents('php://input'), true);
// $catUrl = $data['catUrl'];

// // Получаем категорию по имени
// $category = R::findOne('categories', 'name = ?', [$catUrl]);

// if ($category) {
//     // Находим все продукты, связанные с категорией
//     $products = R::findAll('products', 'category_id = ?', [$category->id]);
    
//     // Преобразуем продукты в массив с дополнительным полем category_ru_name
//     $result = [];
//     foreach ($products as $product) {
//         $result[] = [
//             'id' => $product->id,
//             'name' => $product->name,
//             'price' => $product->price,
//             'category_ru_name' => $category->ru_name,
//             'category_name' => $category->name,
//             // Добавьте другие поля, если необходимо
//         ];
//     }

//     echo json_encode($result);
// } else {
//     echo json_encode([]); // Если категория не найдена, возвращаем пустой массив
// }
