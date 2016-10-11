<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<title>AJ Collective</title>
		<meta name="description" content="AJCollective. Creative Research. Directors Interpretation. Commercial / Film / Music Video Treatments. Creative Writing. Music Research. Mood Films."/>
		<link rel="icon" type="image/png" href="resources/favicon.png" />
		<link href="css/styles.css" rel="stylesheet" type="text/css">
	</head>
	<body>

		<!-- Grid for development -->
		<?php include "partials/_grid.php" ?>

		<!-- Splash screen -->
		<?php include "partials/_splash.php" ?>

		<!-- Navigation -->
		<?php include "partials/_nav.php" ?>

		<!-- Contact -->
		<?php include "partials/_contact.php" ?>

		<!-- Loader -->
		<?php include "partials/_loader.php" ?>

		<!-- Popin video -->
		<?php include "partials/_popin.php" ?>

		<!-- Main container -->
		<main class="main js-main">

			<section class="panel panel--home js-panel is-active" id="home">
				<a class="panel__instagram" href="https://www.instagram.com/ajcollective/" target="_blank"><?php include('partials/icons/instagram.php'); ?></a>
				<div class="panel__container">
					<div class="grid">
						<div class="cell cell-18 prepend-7">
							<h2 class="intro">AJCollective.<br>Creative Research. Directors Interpretation. Commercial / Film / Music Video Treatments. Creative Writing. Music Research. Mood Films.</h2>
						</div>
					</div>
					<div class="panel__pager">
						<div class="panel__btn panel__btn--top">
							<h1 class="panel__btn__label panel__btn__label--lrg">AJCollective</h1>
						</div>
						<div class="panel__btn panel__btn--right">
							<a class="panel__btn__label js-contact-toggle" href="#">About / Contact</a>
						</div>
						<div class="panel__btn panel__btn--bottom panel__btn--bordered">
							<a class="panel__btn__label js-panel-move js-panel-move--bottom" data-direction="bottom" href="#0">Discover our work</a>
						</div>
						<div class="panel__btn panel__btn--left">
							<a class="panel__btn__label js-nav-toggle" href="#">Creatives</a>
						</div>
					</div>
				</div>
			</section>

		</main>

		<script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
	</body>
</html>
