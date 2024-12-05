<?php
// Ustawienia API
$api_url = 'https://newsdata.io/api/1/news';  // URL zewnętrznego API
$api_key = 'pub_5944662628c04af6fe1dfe8b857495abc442f';  // API Key
// Pobierz parametry zapytania przekazane przez JavaScript
$query = isset($_GET['query']) ? $_GET['query'] : '';
$language = isset($_GET['language']) ? $_GET['language'] : '';
$prioritydomain = isset($_GET['prioritydomain']) ? $_GET['prioritydomain'] : '';
$country = isset($_GET['country']) ? $_GET['country'] : '';
// Przygotowanie parametrów zapytania
$params = [
    'apikey' => $api_key,
    'qInTitle' => $query,
    'language' => $language,
    'prioritydomain' => $prioritydomain,
    'country' => $country,
    'image' => '1',   // Wymagaj obrazki
    'removeduplicate' => '1'  // Usuwanie duplikatów
];
// Zakodowanie parametrów w formie zapytania URL
$query_string = http_build_query($params, '', '&', PHP_QUERY_RFC3986); // Użycie RFC3986
// Składa pełne zapytanie URL do zewnętrznego API
$request_url = $api_url . '?' . $query_string;
try {
    // Wykonanie zapytania do API
    $response = file_get_contents($request_url);
    if ($response === FALSE) {
        throw new Exception("Błąd podczas pobierania danych z API");
    }
    // Sprawdzenie odpowiedzi
    error_log("Odpowiedź API: " . $response);  // Zapisz odpowiedź w logu
    // Zwrócenie odpowiedzi z API do JavaScript (w formacie JSON)
    header('Content-Type: application/json');
    echo $response;
} catch (Exception $e) {
    // Obsługa błędów, jeśli zapytanie do API się nie powiedzie
    header('Content-Type: application/json');
    echo json_encode(['error' => $e->getMessage()]);
}
?>
