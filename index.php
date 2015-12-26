<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>AJ Collective</title>
		<link href="css/styles.css" rel="stylesheet" type="text/css">
	</head>
	<body>

		<!-- Grid for development -->
		<?php include "partials/_grid.php" ?>

		<!-- Splash screen -->
		<?php /* include "partials/_splash.php" */ ?>

		<!-- Navigation -->
		<?php include "partials/_nav.php" ?>

		<!-- Contact -->
		<?php include "partials/_contact.php" ?>

		<!-- Loader -->
		<?php include "partials/_loader.php" ?>

		<!-- Main container -->
		<main class="main js-main">

			<section class="panel panel--blue js-panel is-active" id="home">
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
						<a class="panel__btn__label js-nav-toggle" href="#">Creative Researchers &amp; Writers</a>
					</div>
				</div>
				<div class="panel__container">
					<ul class="slideshow js-slideshow">
						<li class="slideshow__item js-slideshow-item">
							<img class="slideshow__img" src="resources/slideshow/4.jpg"/>
						</li>
						<li class="slideshow__item js-slideshow-item">
							<img class="slideshow__img" src="resources/slideshow/5.jpg"/>
						</li>
						<li class="slideshow__item js-slideshow-item">
							<img class="slideshow__img" src="resources/slideshow/6.jpg"/>
						</li>
						<li class="slideshow__item js-slideshow-item">
							<img class="slideshow__img" src="resources/slideshow/7.jpg"/>
						</li>
						<li class="slideshow__item js-slideshow-item">
							<img class="slideshow__img" src="resources/slideshow/8.jpg"/>
						</li>
						<li class="slideshow__item js-slideshow-item">
							<img class="slideshow__img" src="resources/slideshow/9.jpg"/>
						</li>
						<li class="slideshow__item js-slideshow-item">
							<img class="slideshow__img" src="resources/slideshow/10.jpg"/>
						</li>
						<li class="slideshow__item js-slideshow-item">
							<img class="slideshow__img" src="resources/slideshow/11.jpg"/>
						</li>
						<li class="slideshow__item js-slideshow-item">
							<img class="slideshow__img" src="resources/slideshow/12.jpg"/>
						</li>
						<li class="slideshow__item js-slideshow-item">
							<img class="slideshow__img" src="resources/slideshow/13.jpg"/>
						</li>
					</ul>
				</div>
			</section>

		</main>

		<script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
	</body>
</html>