<!DOCTYPE>
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

			<!-- Homepage -->
			<section class="panel panel--blue js-panel is-active" id="home">
				<div class="panel__pager">
					<div class="panel__btn panel__btn--top">
						<span class="panel__btn__label panel__btn__label--lrg">AJCollective</span>
					</div>
					<div class="panel__btn panel__btn--right">
						<a class="panel__btn__label js-contact-toggle" href="#">About / Contact</a>
					</div>
					<div class="panel__btn panel__btn--bottom panel__btn--bordered">
						<a class="panel__btn__label js-panel-move js-panel-move--bottom" data-direction="bottom" href="#ajcolomb">Discover our work</a>
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

			<!-- Creative researcher -->
			<section class="panel panel--black js-panel is-bottom" id="ajcolomb">
				<div class="panel__pager">
					<div class="panel__btn panel__btn--top panel__btn--bordered panel__btn--bordered--top">
						<span class="panel__btn__label panel__btn__label--left panel__btn__label--lrg">AJCollective</span>
						<a class="panel__btn__label panel__btn__label--bordered js-panel-move js-panel-move--top" data-direction="top" href="#home">Back home</a>
						<a class="panel__btn__label panel__btn__label--right js-contact-toggle" href="#">About / Contact</a>
					</div>
					<div class="panel__btn panel__btn--bottom panel__btn--bordered panel__btn--bordered--bottom">
						<a class="panel__btn__label js-panel-move js-panel-move--bottom" data-direction="bottom" href="#katieanderton">Next Writer</a>
					</div>
					<div class="panel__btn panel__btn--left">
						<a class="panel__btn__label js-nav-toggle" href="#">Creative Researchers &amp; Writers</a>
					</div>
				</div>
				<div class="panel__container">
					<div class="grid">
						<div class="cell-31 prepend-5">
							<div class="carousel js-carousel">
								<ul class="carousel__slider js-carousel-slider">
									<li class="carousel__item carousel__item--text js-carousel-item js-carousel-item--text">
										<h2 class="heading-2">AJ Colomb</h2>
										<span class="carousel__jobtitle">Creative researcher &amp; founder</span>
										<p class="carousel__txt">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
									</li>
									<li class="carousel__item js-carousel-item">
										<div class="carousel__item__container">
											<img class="carousel__img" src="http://placehold.it/2000x600/ffffff/000000"/>
											<a class="carousel__full js-carousel-full-btn" href="#"><?php include "partials/icons/full.php" ?></a>
										</div>
									</li>
									<li class="carousel__item js-carousel-item">
										<div class="carousel__item__container">
											<img class="carousel__img" src="http://placehold.it/360x223/ffffff/000000"/>
										</div>
									</li>
									<li class="carousel__item js-carousel-item">
										<div class="carousel__item__container">
											<img class="carousel__img" src="http://placehold.it/2000x600/ffffff/000000"/>
											<a class="carousel__full js-carousel-full-btn" href="#"><?php include "partials/icons/full.php" ?></a>
										</div>
									</li>
									<li class="carousel__item js-carousel-item">
										<div class="carousel__item__container">
											<img class="carousel__img" src="http://placehold.it/360x223/ffffff/000000"/>
										</div>
									</li>
									<li class="carousel__item js-carousel-item">
										<div class="carousel__item__container">
											<img class="carousel__img" src="http://placehold.it/2000x600/ffffff/000000"/>
											<a class="carousel__full js-carousel-full-btn" href="#"><?php include "partials/icons/full.php" ?></a>
										</div>
									</li>
									<li class="carousel__item js-carousel-item">
										<div class="carousel__item__container">
											<img class="carousel__img" src="http://placehold.it/360x223/ffffff/000000"/>
										</div>
									</li>
									<li class="carousel__item js-carousel-item">
										<div class="carousel__item__container">
											<img class="carousel__img" src="http://placehold.it/2000x600/ffffff/000000"/>
											<a class="carousel__full js-carousel-full-btn" href="#"><?php include "partials/icons/full.php" ?></a>
										</div>
									</li>
									<li class="carousel__item js-carousel-item">
										<div class="carousel__item__container">
											<img class="carousel__img" src="http://placehold.it/360x223/ffffff/000000"/>
										</div>
									</li>
									<li class="carousel__item js-carousel-item">
										<div class="carousel__item__container">
											<img class="carousel__img" src="http://placehold.it/2000x600/ffffff/000000"/>
											<a class="carousel__full js-carousel-full-btn" href="#"><?php include "partials/icons/full.php" ?></a>
										</div>
									</li>
									<li class="carousel__item js-carousel-item">
										<div class="carousel__item__container">
											<img class="carousel__img" src="http://placehold.it/360x223/ffffff/000000"/>
										</div>
									</li>
								</ul>
								<div class="carousel__pager">
									<button class="carousel__btn carousel__btn--prev js-carousel-btn js-carousel-btn-prev" data-direction="prev" href="#"></button>
									<button class="carousel__btn carousel__btn--next js-carousel-btn js-carousel-btn-next" data-direction="next" href="#"></button>
								</div>
								<div class="carousel__viewer js-carousel-viewer">
									<div class="carousel__viewer__rectangle"></div>
									<div class="carousel__viewer__slider js-carousel-viewer-slider"></div>
								</div>
								<a class="carousel__close js-carousel-full-btn" href="#">
									leave full screen view
									<span class="carousel__close__btn"><?php include "partials/icons/close.php" ?></span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Writers -->
			<section class="panel panel--black js-panel is-bottom" id="katieanderton">
				<div class="panel__pager">
					<div class="panel__btn panel__btn--top panel__btn--bordered panel__btn--bordered--top">
						<span class="panel__btn__label panel__btn__label--left panel__btn__label--lrg">AJCollective</span>
						<a class="panel__btn__label panel__btn__label--bordered js-panel-move js-panel-move--top" data-direction="top" href="#ajcolomb">AJ Colomb</a>
						<a class="panel__btn__label panel__btn__label--right js-contact-toggle" href="#">About / Contact</a>
					</div>
					<div class="panel__btn panel__btn--bottom"></div>
					<div class="panel__btn panel__btn--left">
						<a class="panel__btn__label js-nav-toggle" href="#">Creative Researchers &amp; Writers</a>
					</div>
				</div>
				<div class="panel__container">
					<div class="grid">
						<div class="cell-31 prepend-5">
							<div class="carousel carousel--writer js-carousel">
								<ul class="carousel__slider js-carousel-slider">
									<li class="carousel__item carousel__item--text js-carousel-item js-carousel-item--text">
										<h2 class="heading-2">Katie Anderton</h2>
										<span class="carousel__jobtitle">Treatment writer</span>
										<p class="carousel__txt">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
									</li>
									<li class="carousel__item carousel-item--doc js-carousel-item js-carousel-item--doc">
										<div class="carousel__doc">
											<span class="carousel__doc__title">Lorem ipsum dolor sit amet</span>
											<span class="carousel__doc__type">PDF</span>
											<span class="carousel__doc__pages">7 pages</span>
											<a class="carousel__doc__overlay" href="#">
												<span class="carousel__doc__btn"><?php include "partials/icons/pdf.php" ?></span>
											</a>
										</div>
									</li>
									<li class="carousel__item carousel-item--doc js-carousel-item js-carousel-item--doc">
										<div class="carousel__doc">
											<span class="carousel__doc__title">Consectetur adipisicing elit, sed do eiusmod</span>
											<span class="carousel__doc__type">PDF</span>
											<span class="carousel__doc__pages">7 pages</span>
											<a class="carousel__doc__overlay" href="#">
												<span class="carousel__doc__btn"><?php include "partials/icons/pdf.php" ?></span>
											</a>
										</div>
									</li>
									<li class="carousel__item carousel-item--doc js-carousel-item js-carousel-item--doc">
										<div class="carousel__doc">
											<span class="carousel__doc__title">Lorem ipsum dolor sit amet</span>
											<span class="carousel__doc__type">PDF</span>
											<span class="carousel__doc__pages">7 pages</span>
											<a class="carousel__doc__overlay" href="#">
												<span class="carousel__doc__btn"><?php include "partials/icons/pdf.php" ?></span>
											</a>
										</div>
									</li>
									<li class="carousel__item carousel-item--doc js-carousel-item js-carousel-item--doc">
										<div class="carousel__doc">
											<span class="carousel__doc__title">Lorem ipsum dolor sit amet</span>
											<span class="carousel__doc__type">PDF</span>
											<span class="carousel__doc__pages">7 pages</span>
											<a class="carousel__doc__overlay" href="#">
												<span class="carousel__doc__btn"><?php include "partials/icons/pdf.php" ?></span>
											</a>
										</div>
									</li>
									<li class="carousel__item carousel-item--doc js-carousel-item js-carousel-item--doc">
										<div class="carousel__doc">
											<span class="carousel__doc__title">Lorem ipsum dolor sit amet</span>
											<span class="carousel__doc__type">PDF</span>
											<span class="carousel__doc__pages">7 pages</span>
											<a class="carousel__doc__overlay" href="#">
												<span class="carousel__doc__btn"><?php include "partials/icons/pdf.php" ?></span>
											</a>
										</div>
									</li>
									<li class="carousel__item carousel-item--doc js-carousel-item js-carousel-item--doc">
										<div class="carousel__doc">
											<span class="carousel__doc__title">Lorem ipsum dolor sit amet</span>
											<span class="carousel__doc__type">PDF</span>
											<span class="carousel__doc__pages">7 pages</span>
											<a class="carousel__doc__overlay" href="#">
												<span class="carousel__doc__btn"><?php include "partials/icons/pdf.php" ?></span>
											</a>
										</div>
									</li>
									<li class="carousel__item carousel-item--doc js-carousel-item js-carousel-item--doc">
										<div class="carousel__doc">
											<span class="carousel__doc__title">Lorem ipsum dolor sit amet</span>
											<span class="carousel__doc__type">PDF</span>
											<span class="carousel__doc__pages">7 pages</span>
											<a class="carousel__doc__overlay" href="#">
												<span class="carousel__doc__btn"><?php include "partials/icons/pdf.php" ?></span>
											</a>
										</div>
									</li>
								</ul>
								<div class="carousel__pager">
									<button class="carousel__btn carousel__btn--prev js-carousel-btn js-carousel-btn-prev" data-direction="prev" href="#"></button>
									<button class="carousel__btn carousel__btn--next js-carousel-btn js-carousel-btn-next" data-direction="next" href="#"></button>
								</div>
								<div class="carousel__viewer js-carousel-viewer">
									<div class="carousel__viewer__rectangle"></div>
									<div class="carousel__viewer__slider js-carousel-viewer-slider"></div>
								</div>
								<a class="carousel__close js-carousel-full-btn" href="#">
									leave full screen view
									<span class="carousel__close__btn"><?php include "partials/icons/close.php" ?></span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

		</main>

		<script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
	</body>
</html>