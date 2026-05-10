<?php

$html = file_get_contents(__DIR__ . '/index.html');

libxml_use_internal_errors(true);

$dom = new DOMDocument();
$dom->loadHTML($html);

libxml_clear_errors();

// ======================================
// DADOS
// ======================================

$title = '';
$titleTags = $dom->getElementsByTagName('title');
if ($titleTags->length > 0) {
    $title = $titleTags->item(0)->nodeValue;
}

$metas = [];
$metaTags = $dom->getElementsByTagName('meta');
foreach ($metaTags as $meta) {
    $name = $meta->getAttribute('name');
    $property = $meta->getAttribute('property');
    $content = $meta->getAttribute('content');
    if ($name) {
        $metas[$name] = $content;
    }

    if ($property) {
        $metas[$property] = $content;
    }
}

// ============================================
// API
// ============================================

$apiUrl = 'https://api.abcch.com.br';

// ============================================
// URL ATUAL
// ============================================

$requestUri = $_SERVER['REQUEST_URI'];
$path = parse_url($requestUri, PHP_URL_PATH);

// ============================================
// EXEMPLO:
// /noticia/123
// ============================================

if (preg_match('#^/noticia/([0-9]+)#', $path, $matches)) {
    $id = $matches[1];

    $apiUrl .= '/noticias/' . $id;
    $ch = curl_init($apiUrl);

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 5,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_SSL_VERIFYPEER => false,
    ]);

    $response = curl_exec($ch);

    // ERRO CURL
    if ($response === false) {
        //echo 'CURL ERROR: ' . curl_error($ch);
    } else {
        // STATUS HTTP
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        //echo 'HTTP CODE: ' . $httpCode;
        //echo '<pre>';
        //print_r($response);
    }

    curl_close($ch);

    curl_close($ch);
    if ($response) {
        $json = json_decode($response, true);
        //print_r($json);
        if (!empty($json)) {
            $title = $json['titulo'] . $title ?? $title;

            $description = strip_tags($json['texto']);
            $description = str_replace(PHP_EOL, ' ', $description);
            $description = trim($description);
            $description = preg_replace('/\s+/', ' ', $description);
            if (mb_strlen($description) > 150) {
                $description = mb_substr($description, 0, 150) . '...';
            }
            $metas['description'] = $description;

            $metas['image'] = $json['imagem_url'];
        }
    }
}

// ============================================
// AJUSTA O HTML
// ============================================

$html = preg_replace(
    '/<title>(.*?)<\/title>/is',
    '<title>' . htmlspecialchars($title) . '</title>',
    $html
);

$html = preg_replace(
    '/<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\'][^>]*>/is',
    '<meta name="description" content="' . htmlspecialchars($metas['description']) . '">',
    $html
);

// ============================================
// ADICIONA NOVAS METAS
// ============================================

$html_metas = '
<meta property="og:type" content="website">
<meta property="og:title" content="' . htmlspecialchars($title) . '">
<meta property="og:description" content="' . htmlspecialchars($metas['description']) . '">
' . (isset($metas['image']) ? '<meta property="og:image" content="' . htmlspecialchars($metas['image']) . '">' : '') . '
<meta property="og:url" content="https://' . $_SERVER['HTTP_HOST'] . $path . '">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="' . htmlspecialchars($title) . '">
<meta name="twitter:description" content="' . htmlspecialchars($metas['description']) . '">
' . (isset($metas['image']) ? '<meta name="twitter:image" content="' . htmlspecialchars($metas['image']) . '">' : '') . '
';

$html = preg_replace(
    '/<\/head>/i',
    $html_metas . PHP_EOL . '</head>',
    $html
);



// ============================================
// OUTPUT
// ============================================

echo $html;
