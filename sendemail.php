<!DOCTYPE HTML>
<html>
<head>
	<meta charset="UTF-8" />
	<title>Sending mail ...</title>
	<style type="text/css">
		body {
			background-color: transparent;
		}

		.ok {
			margin-top: 10px;
			color:#1A1;
		}

		.err {
			margin-top: 10px;
			color:#A11;
		}
	</style>
</head>
<body>
	<?php
		error_reporting(E_ALL ^ E_NOTICE);

		$admin = 'info@omidgharib.ir';
		
		$name		= $_POST['name'];
		$email		= $_POST['email'];
		$msg		= $_POST['message'];

		if( strlen($name)>=3 && strlen($email)>=7 && strlen($msg)>=8 ){
			if( @mail ( $admin,"omidgharib.ir contact : $subject", $msg, "From:$admin\r\nReply-To:$name <$email>" ) ){
				echo '<h2 class="ok">Your message was sent.</h2>';
			}else{
				echo '<h2 class="err">Your message was not sent please try again.</h2>';
			}
		}else{
			echo '<h2 class="err">Your message was not sent please try again.</h2>';
		}
	?>
</body>
</html>