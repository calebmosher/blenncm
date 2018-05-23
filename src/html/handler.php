<?

$data = (object) array(
    name => sanitize_data($_POST["name"]),
    email => sanitize_data($_POST["email"]),
    message => sanitize_data($_POST["message"]),
);

function sanitize_data($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$mail = (object) array(
    to => "me@blenncm.com",
    subject => "Blenncm Contact",
    message => ""
);

$mail->message =
    "Blenn Portfolio Site Contact\n" .
    "\n" .
    "Name: " . $data->name . "\n" .
    "Email: " . $data->email . "\n" .
    "Message:\n" .
    $data->message;

echo mail($mail->to, $mail->subject, $mail->message);

?>
