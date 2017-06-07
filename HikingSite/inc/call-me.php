<?php

$response = [];
$messages = [];

$callType = ( isset( $_POST[ 'type' ] ) ? $_POST[ 'type' ] : false );
$mailTo = ( isset( $_POST[ 'mail_to' ] ) ? $_POST[ 'mail_to' ] : false );
$mailFrom = ( isset( $_POST[ 'mail_from' ] ) ? $_POST[ 'mail_from' ] : false );
$mailSubject = ( isset( $_POST[ 'subject' ] ) ? $_POST[ 'subject' ] : false );
$mailPhone = ( isset( $_POST[ 'phone' ] ) ? $_POST[ 'phone' ] : false );
$mailMessage = ( isset( $_POST[ 'message' ] ) ? $_POST[ 'message' ] : false );

$ns = " is not (correctly) defined - or it is not being sent in your request to the server";

if ( !$callType ) {
  $response[ 'type' ] = $callType;
  $messages[] = 'Error: "type"' . $ns;
}

if ( $callType === "contact" && !$mailTo )
  $messages[] = 'Error: "mail_to"' . $ns;

if ( $callType === "contact" && !$mailFrom )
  $messages[] = 'Notice: "mail_from"' . $ns;

if ( $callType === "contact" && !$mailSubject )
  $messages[] = 'Notice: "subject"' . $ns;

if ( $callType === "contact" && !$mailPhone )
  $messages[] = 'Notice: "phone"' . $ns;

if ( $callType === "contact" && !$mailMessage )
  $messages[] = 'Notice: "message"' . $ns;


$response[ 'type' ] = $callType;

switch ( $callType ) {
  case 'contact':
    $sendMessage = ( $mailFrom ? "<br/>From: " . $mailFrom : "" ) . ( $mailPhone ? "<br/>Phone: " . $mailPhone : "" ) . ( $mailMessage ? "<br/>Message: " . $mailMessage : "" );

    $mail = sendMail( $mailTo, $mailSubject, $sendMessage );
    if ( $mail[ 'success' ] ) {
      $response[ 'success' ] = true;
      $messages[] = 'Mail sent!';
    } else {
      $messages[] = array( 'mail_message' => $mail );
    }
    break;
  case "blog":
    // do blog thing
    $response[ 'success' ] = true;
    $messages[] = 'Blog being retrieved...';
    $response[ 'blog' ] = get_blog();
    break;
  default:
    // do default thing...
    $response[ 'success' ] = false;
    $response[ 'type' ] = $callType;
    $messages[] = 'Error: "type"' . $ns;
}

function get_blog() {
  return json_decode( file_get_contents( "blog-content.json" ) );
}

function sendMail( $to, $subject, $message ) {
  $r = [];

  if ( !preg_match( '/student.usc.edu.au/', $to ) ) {
    $r[ 'success' ] = false;
    $r[ 'mail_error' ] = 'email can only be sent to student account. mail_to must be set to your student email i.e.: example@student.usc.edu.au';
    return $r;
  }

  try {
    if ( !mail( $to, $subject, $message ) ) {
      $r[ 'success' ] = false;
      $r[ 'mail_error' ] = 'mail not sent - php\'s mail function is not working.';
    } else {
      $r[ 'success' ] = true;
    }
  } catch ( Error $error ) {
    $r[ 'success' ] = false;
    $r[ 'mail_error_object' ] = $error;

  }

  return $r;

}

$post_vars = $_POST;
$get_vars = $_GET;

$response[ 'post_variables_received' ] = $post_vars;
//$response[ 'get_variables_received' ] = $get_vars;

$messages[] = 'Please note: "Error" is bad, "Notice" is okay depending on your requirements. ' . 'If you are having trouble - please email me for help - dvagg@usc.edu.au';
$response[ 'messages' ] = $messages;
echo json_encode( $response );
exit;