<?php
//$name = htmlspecialchars($_REQUEST['name'], ENT_QUOTES);
$name = htmlspecialchars($_REQUEST['name'], ENT_QUOTES);
$phone = htmlspecialchars($_REQUEST['phone'], ENT_QUOTES);
$thanks_file = 'success.php';



if (!$errors) {
    $to = 'marketing.house@yandex.ru';
    $header = 'MIME-Version: 1.0'."\r\n";
    $header .= 'Content-type: text/html; charset=utf-8'."\r\n";
    $header .= 'From: =?utf-8?b?'.base64_encode("Заявка с сайта marketinghouse").'?= <no-reply@'.$_SERVER['HTTP_HOST'].'>'."\r\n";
    $header .= 'Заявка с сайта marketinghouse ['.$phone.']';
    $subject = 'Заявка на получение консультации маркетолога (попап)';
    $msg = '<html>'."\n";
    $msg .= ' <head>'."\n";
    $msg .= ' <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'."\n";
    $msg .= ' </head>'."\n";
    $msg .= ' <body>'."\n";
    $msg .= ' <h2>Заявка на получение консультации маркетолога</h2>'."\n";
    $msg .= ' <table cellpadding="5" cellspacing="0">'."\n";
    $msg .= ' <tr><td><strong>Имя:</strong></td><td>'.$name.'</td></tr>'."\n";
    $msg .= ' <tr><td><strong>Телефон:</strong></td><td>'.$phone.'</td></tr>'."\n";
    $msg .= ' </table>'."\n";
    $msg .= ' </body>'."\n";
    $msg .= '</html>'."\n";

    if(empty(trim($phone))){
        if (mail($to, $subject, $msg, $header, '-fno-reply@'.$_SERVER['HTTP_HOST'])) {
//            header('Location: ' . $thanks_file);
            console_log( $phone );
        } else {
            $output = '<p>Произошла ошибка, пожалуйста повторите попытку позже.</p>';
        }
    }else{
        $output = '<p>Произошла ошибка, пожалуйста повторите попытку позже.</p>';
    }
}

print $output;
