<?php
require('conn.php');
$stmt = $conn->prepare("DELETE FROM personnel WHERE id = :id");
$stmt->bindParam(':id', $_POST['id']);
$stmt->execute();
header("Location: index.php");
?>