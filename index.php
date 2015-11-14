<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<title>AJ Collective</title>
		<link href="css/styles.css" rel="stylesheet" type="text/css">
	</head>
	<body>

		<!-- Grid for development -->
		<?php include "partials/_grid.php" ?>

		<!-- Navigation -->
		<?php include "partials/_nav.php" ?>

		<!-- Contact -->
		<?php include "partials/_contact.php" ?>

		<!-- Main container -->
		<main class="main js-main">

			<section class="panel panel--blue js-panel is-active" id="home">
				<div class="panel__pager">
					<div class="panel__btn panel__btn--top">
						<span class="panel__btn__label panel__btn__label--lrg">AJCollective</span>
					</div>
					<div class="panel__btn panel__btn--right">
						<a class="panel__btn__label js-contact-toggle" href="#">About / Contact</a>
					</div>
					<div class="panel__btn panel__btn--bottom panel__btn--bordered">
						<a class="panel__btn__label js-panel-move js-panel-move--bottom" data-direction="bottom" href="#0">Discover our work</a>
					</div>
					<div class="panel__btn panel__btn--left">
						<a class="panel__btn__label js-nav-toggle" href="#">Creative Researchers &amp; Writers</a>
					</div>
				</div>
				<div class="panel__container">
					<div class="grid">
						<div class="cell-16 prepend-8">
							<img class="panel__cover" src="http://placehold.it/720x480"/>
						</div>
					</div>
				</div>
			</section>

		</main>

		<script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
	</body>
</html>