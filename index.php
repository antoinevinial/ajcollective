<!DOCTYPE>
<html>
	<head>
		<meta charset="utf-8">
		<title>AJ Collective</title>
		<link href="css/styles.css" rel="stylesheet" type="text/css">
	</head>
	<body>

		<!-- Navigation -->
		<nav class="nav js-nav">
			<ul class="nav__list">
				<li class="nav__item">
					<a class="nav__link" href="#">
						<span class="nav__link__name">AJ<br>Colomb</span>
						<span class="nav__link__jobtitle">Creative researcher &amp; founder</span>
					</a>
				</li>
				<li class="nav__item">
					<a class="nav__link" href="#">
						<span class="nav__link__name">Tegan<br>+ Jody</span>
						<span class="nav__link__jobtitle">Creative researcher</span>
					</a>
				</li>
				<li class="nav__item">
					<a class="nav__link" href="#">
						<span class="nav__link__name">Micheal<br>McCool</span>
						<span class="nav__link__jobtitle">Creative researcher</span>
					</a>
				</li>
			</ul>
		</nav>
		<!-- End of navigation -->

		<main class="main js-main">
			<!-- Homepage -->
			<section class="panel panel--blue js-panel is-active">
				<div class="panel__pager">
					<a class="panel__btn panel__btn--top" href="#">AJCollective</a>
					<a class="panel__btn panel__btn--right" href="#">About/Contact</a>
					<a class="panel__btn panel__btn--bottom panel__btn--bordered panel__btn--bordered--bottom js-panel-move" data-panel="work" data-move="top-to-bottom" href="#">Discover our work</a>
					<a class="panel__btn panel__btn--left js-nav-toggle" href="#">Creative, Researchers &amp; Writers</a>
				</div>
				<div class="panel__container">
					<img class="panel__cover" src="http://placehold.it/720x480"/>
				</div>
			</section>
			<!-- End of homepage -->

			<!-- Work -->
			<section class="panel panel--black panel--no-right js-panel" id="work">
				<div class="panel__pager">
					<a class="panel__btn panel__btn--top panel__btn--bordered panel__btn--bordered--bottom" href="#">Back home</a>
					<a class="panel__btn panel__btn--bottom panel__btn--bordered panel__btn--bordered--bottom js-panel-move" data-panel="work" data-move="bottom-to-top" href="#">Next Creative Researchers</a>
					<a class="panel__btn panel__btn--left js-nav-toggle" href="#">Creative, Researchers &amp; Writers</a>
				</div>
				<div class="panel__container">
					<div class="carousel js-carousel">
						<div class="carousel__slider js-carousel-slider">
							<div class="carousel__item carousel__item--intro js-carousel-item">
								<h2>AJ Colomb</h2>
								<span class="carousel__jobtitle">Creative researcher &amp; founder</span>
								<p class="carousel__txt">Lorem ipsum dolor sit amet, consectetur adipisicing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!-- End of work -->
		</main>

		<script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
	</body>
</html>