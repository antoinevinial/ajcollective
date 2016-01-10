<nav class="nav js-nav">	
	<ul class="nav__list js-nav-list"></ul>
</nav>
<div class="nav__layer js-nav-toggle"></div>

<nav class="nav-mobile js-nav-mobile">
	<div class="nav-mobile__header">
		<button class="nav-mobile__btn js-nav-mobile-btn">
			<?php include "partials/icons/menu.php" ?>
			<?php include "partials/icons/close.php" ?>
		</button>
		<button class="nav-mobile__btn nav-mobile__btn--back js-nav-mobile-btn-panel">
			<?php include "partials/icons/back.php" ?>
		</button>
		<h1 class="nav-mobile__title">AJCollective</h1>
	</div>
	<div class="nav-mobile__content">
		<div class="nav-mobile__panel">
			<ul class="nav-mobile__list">
				<li class="nav-mobile__item">
					<a class="nav-mobile__link js-nav-mobile-panel-link" href="#panel1">Creatives</a>
				</li>
				<li class="nav-mobile__item">
					<a class="nav-mobile__link js-nav-mobile-panel-link" href="#panel2">About</a>
				</li>
				<li class="nav-mobile__item">
					<a class="nav-mobile__link js-nav-mobile-panel-link" href="#panel3">Contact</a>
				</li>
			</ul>
		</div>
		<div class="nav-mobile__panel js-nav-mobile-panel is-hidden" id="panel1">
			<ul class="nav-mobile__list js-nav-list"></ul>
		</div>
		<div class="nav-mobile__panel js-nav-mobile-panel is-hidden" id="panel2">
			<h2 class="heading-2 trailer-25">About</h2>
			<p class="contact__txt">AJCollective is a multi-disciplined creative team of highly talented individuals who specialise primarily in crafting treatments for some of the most prestigious production companies and Directors in the industry.</p>
			<p class="contact__txt">Originally founded in 2012 by South African-Londoner-Danish imposter Andrea Jade Colomb, as a creative research company,  it has organically grown and expanded and can now boost not only an arsenal of imagery accumulated over the years, but now also a stellar breed of treatment writers, illustrators and music technicians. All of whom are armed with an encyclopaedic knowledge of films, advertising, design, photography, and visual fancies, along with a solid knowledge of production.</p>
			<p class="contact__txt">With librarians brains and artists hands, AJCollective’s talent is putting together, thoughtfully and skilfully,  the core idea of the Director’s head, and then some.</p>
		</div>
		<div class="nav-mobile__panel js-nav-mobile-panel is-hidden" id="panel3">
			<h2 class="heading-2 trailer-25">Contact</h2>
			<div class="contact__bloc">
				<span class="contact__label">Treatment writing</span>
				<p class="contact__txt">
					<span class="contact__txt__label">Katie</span>
					<a class="contact__txt__label" href="mailto:katie@ajcolomb.com">katie@ajcolomb.com</a> 
					<span class="contact__txt__label">0039 (0) 667 303 221</span>
				</p>
			</div>
			<div class="contact__bloc">
				<span class="contact__label">All other inquieries + availability</span>
				<p class="contact__txt">
					<span class="contact__txt__label">Andrea</span>
					<a class="contact__txt__label" href="mailto:andrea@ajcolomb.com">andrea@ajcolomb.com</a>
					<span class="contact__txt__label">0044 (0) 787 403 6993</span>
				</p>
			</div>
		</div>
	</div>
</nav>