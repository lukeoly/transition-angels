<?php
if ($_POST) {
    $name  = $_POST['name'];
    $email = $_POST['email'];
    $text  = $_POST['text'];

    //send email
    mail("info@transitionangels.com.au", "Website contact form submission", $text, "From:" . $email);
}

?>
