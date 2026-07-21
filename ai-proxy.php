<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents('php://input'), true);
$msg = $data['msg'];

$apiKey = "api_groq_api_key_yahan_lagyen";
$url = "https://api.groq.com/openai/v1/chat/completions";

$postData = json_encode([
    "model" => "llama-3.1-8b-instant",
    "messages" => [
        ["role" => "system", "content" => "You are Sania's AI Assistant. Reply in friendly Roman Urdu."],
        ["role" => "user", "content" => $msg]
    ]
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json', 'Authorization: Bearer '.$apiKey]);

$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);
$reply = $result['choices'][0]['message']['content']?? "Error: ".$response;

echo json_encode(["response" => $reply]);
?>