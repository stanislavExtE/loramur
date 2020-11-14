$(window).on('load', function () {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
		$('body').addClass('ios');
	} else {
		$('body').addClass('web');
	};
	$('body').removeClass('loaded');
});
/* viewport width */
function viewport() {
	var e = window,
		a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return {
		width: e[a + 'Width'],
		height: e[a + 'Height']
	}
};

function blockVH(el, dif) {
	var block = $(el),
		vh = $(window).height();

	if (dif) {
		block.css({
			'min-height': vh - dif,
		});
	} else {
		block.css({
			'min-height': vh,
		});
	}
}
var handler = function () {

	var height_footer = $('footer').height();
	var height_header = $('header').height();
	//$('.content').css({'padding-bottom':height_footer+40, 'padding-top':height_header+40});


	var viewport_wid = viewport().width;
	var viewport_height = viewport().height;

	if (viewport_wid <= 991) {

	} else {
		blockVH('.intro', $('.header').height());
	}

}
$(window).bind('load', handler);
$(window).bind('resize', handler);
/* viewport width */
$(function () {


	if ($('.js-intro-slider').length) {
		$('.js-intro-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			fade: true,
			speed: 1000,
			prevArrow: '.intro-slider__arrow.arrow_prev',
			nextArrow: '.intro-slider__arrow.arrow_next',
			autoplay: false,
			autoplaySpeed: 2000,
			// infinite: false,
			// pauseOnHover:false
		});
	}


	var y_offsetWhenScrollDisabled = 0,
		offset = 0;

	$(window).scroll(function () {
		y_offsetWhenScrollDisabled = $(window).scrollTop();
	});

	function lockScroll() {
		offset = y_offsetWhenScrollDisabled;
		$('html').addClass('scrollDisabled');
		$('html').css('margin-top', -y_offsetWhenScrollDisabled);
	}

	function unlockScroll() {
		$('html').removeClass('scrollDisabled');
		$('html').css('margin-top', '');
		$('html, body').animate({
			scrollTop: offset
		}, 0);
	}

	/* placeholder*/


	function scrollNav(el) {

		let offsetLastPos = 0;

		function fixedNavigation(lastOffset) {
			let curr_pos = window.pageYOffset || document.documentElement.scrollTop;

			if (curr_pos > lastOffset && window.pageYOffset > header.offsetHeight * 1.3) {
				header.classList.add("sticky");
			} else {
				header.classList.remove("sticky");
			}

			offsetLastPos = curr_pos <= 0 ? 0 : curr_pos;
		}


		let header = document.querySelector(el),
			body = document.querySelector("body");

		let sticky = header.offsetTop,
			sticky_height = header.offsetHeight;


		function setTopPadding() {
			header_height = header.offsetHeight;
			body.style.paddingTop = header_height + 'px';
		}

		// function fixedNav(pos) {
		// 	if (window.pageYOffset > pos) {
		// 		header.classList.add("sticky");

		// 	} else {
		// 		header.classList.remove("sticky");
		// 		// body.removeAttribute('style');
		// 	}
		// }
		setTopPadding();

		window.onscroll = function (e) {
			fixedNavigation(offsetLastPos);
		};

		window.onresize = function () {
			fixedNavigation(offsetLastPos);
		}

		fixedNavigation(offsetLastPos);
	}

	scrollNav('.header');

	function navigation() {
		let $burger = jQuery('.burger'),
			$overlay = jQuery('.js-nav-overlay'),
			$nav = jQuery('.nav');


		if (jQuery(window).width() > 1279) {
			var $sub_btn = $nav.find('.parent .parent');
		} else {
			var $sub_btn = jQuery('.nav__item.parent');
		}


		function subShow(el) {
			let $this = el,
				$sub = $this.children('.sublist');


			$sub.stop().slideDown('200');
			$this.addClass('active');
		}

		function subHide(el) {
			let $this = el,
				$sub = $this.children('.sublist');
			$sub.stop().slideUp('200');
			$this.removeClass('active');
		}




		function subClick(el) {
			let $this = el;

			if ($this.is('.active') && $this.children('span').is(e.target)) {
				subHide(el)
			} else {
				subShow(el)
			}
		}


		function checkNavShown() {
			if ($nav.hasClass('active')) {
				return true;
			} else {
				return false
			}
		}


		function showNav() {
			$nav.addClass('active');
			lockScroll();
			$overlay.addClass('active');
		}


		function hideNav() {
			$nav.removeClass('active');
			unlockScroll();
			$overlay.removeClass('active');
		}

		$burger.on('click', function () {
			showNav();
		})

		$('.nav-close').on('click', function () {
			hideNav();
		})

		// if (jQuery(window).width() < 992 && jQuery(window).width() < 1280)  {


		// } else 
		// if (jQuery(window).width() < 992) {

		// 	$sub_btn.click(function (e) {
		// 		let $this = jQuery(this);

		// 		if ($this.is('.shown') && $this.children('span').is(e.target)) {
		// 			subHide($this)
		// 		} else {
		// 			subShow($this)
		// 		}
		// 	})
		// } else {
		// 	$sub_btn.mouseenter(function () {
		// 		subShow(jQuery(this))
		// 	});

		// 	$sub_btn.mouseleave(function () {
		// 		subHide(jQuery(this))
		// 	});
		// }

		jQuery(document).mouseup(function (e) {
			if (!$nav.is(e.target) && $nav.has(e.target).length === 0 && $nav.hasClass('active')) {
				hideNav()
			}
		});
	}
	navigation()


	function getOffsetTop(el) {
		let $pos = jQuery(el).scrollTop();

		return $pos;
	}

	function showOnScroll($btn, $offset) {
		let $window_offset = getOffsetTop(window);

		if ($window_offset > $offset) {
			$btn.fadeIn(400);
		} else {
			$btn.fadeOut(200);
		}
	}

	if (jQuery('.js-scroll-up').length) {
		let $btn = jQuery('.js-scroll-up')
		showOnScroll($btn, 900);

		jQuery(window).scroll(function () {
			showOnScroll($btn, 900);
		})

		$btn.on('click', function () {
			jQuery("html, body").animate({
				scrollTop: "0"
			}, 600);
		})
	}

	function parallaxMove(elem, wrapper, animSpeed, posTranslate, resetOnOut) {
		var wrapp = jQuery(wrapper);

		wrapp.mousemove(function (e) {
			var pos = jQuery(this).offset(),
				wrapp_left = pos.left,
				wrapp_top = pos.top,
				wrapp_width = jQuery(this).width(),
				wrapp_height = jQuery(this).height(),
				x_center,
				y_center,
				el = jQuery(this).find(elem);



			x_center = (wrapp_width / 2) - (e.pageX - wrapp_left);
			y_center = (wrapp_height / 2) - (e.pageY - (wrapp_top + el.height()));





			if (el.attr('data-speed')) {
				var speed = el.attr('data-speed')
			} else if (animSpeed) {
				var speed = animSpeed
			} else {
				var speed = 2
			}

			if (posTranslate) {
				var posCorrection = posTranslate;
			} else {
				var posCorrection = 1;
			}

			var xPos = Math.round(x_center / 20 * speed),
				yPos = Math.round(y_center / 20 * speed);

			el.css('transform', 'translate3d(' + xPos * -posCorrection + 'px, ' + yPos * -posCorrection + 'px, 0px)');
		});

		if (resetOnOut == 'reset' || resetOnOut == 'true') {
			wrapp.mouseout(function (e) {
				el = jQuery(this).find(elem);
				el.removeAttr('style');
			})
		}

	}


	if ($(window).innerWidth() > 992) {
		parallaxMove('.btn__text', '.btn', 1.18, 4.5, 'reset');
	};



	

	(function cardsSlider() {
		var $cardsSlider = $('.js-cards-slider');

		if ($cardsSlider.length) {
			var $cardsSliderDots = $cardsSlider.closest('.cards-slider-wrapper').find('.cards__dots'),
				cardsSliderSettings = {
					slidesToShow: 2,
					slidesToScroll: 2,
					// fade: true,
					speed: 600,
					arrows: false,
					dots: true,
					appendDots: $cardsSliderDots,
					customPaging: function (slider, i) {
						return '<span class="slider-dot"></span>';
					},
					autoplay: true,
					autoplaySpeed: 10000,
					// infinite: false,
					// pauseOnHover:false
					responsive: [{
						breakpoint: 568,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						}
					}],
				};

			$cardsSlider.slick(cardsSliderSettings);
		}
	})();


	(function aboutSlider() {
		var $aboutSlider = $('.js-about-slider');

		if ($aboutSlider.length) {
			var $aboutSliderDots = $aboutSlider.closest('.about-slider-wrapper').find('.about__dots'),
				aboutSliderSettings = {
					slidesToShow: 1,
					slidesToScroll: 1,
					fade: true,
					speed: 1000,
					arrows: false,
					dots: true,
					appendDots: $aboutSliderDots,
					customPaging: function (slider, i) {
						return '<span class="slider-dot"></span>';
					},
					autoplay: true,
					autoplaySpeed: 7000,
					// infinite: false,
					// pauseOnHover:false
				};

			$aboutSlider.slick(aboutSliderSettings);
		}
	})();

	(function reviewsSlider() {
		var $aboutSlider = $('.js-reviews-slider');

		if ($aboutSlider.length) {
			var $aboutSliderDots = $aboutSlider.closest('.reviews-slider-wrapper').find('.reviews__dots'),
				aboutSliderSettings = {
					slidesToShow: 1,
					slidesToScroll: 1,
					speed: 1000,
					arrows: false,
					dots: true,
					appendDots: $aboutSliderDots,
					customPaging: function (slider, i) {
						return '<span class="slider-dot"></span>';
					},
					autoplay: true,
					autoplaySpeed: 7000,
					// infinite: false,
					// pauseOnHover:false
				};

			$aboutSlider.slick(aboutSliderSettings);
		}
	})();


	(function galleryImgBasis() {
		var $img = $('.gallery-img');


		if (!$img.length) {
			return false;
		};

		var $item = $img.closest('.gallery-item');

		var hoverTrigger = true;

		function setImgBasis(img) {
			img.css({
				'flex': '1 0 60%',
				'filter': 'none'
				// 'transition': 'flex-shrink 1.6s, flex-basis 0'
			})
		}

		setImgBasis($item.eq(0));

		function changeMainImg(el) {
			if (hoverTrigger) {
				var $hoveredItem = el.closest('.gallery-item');
				$item.removeAttr('style');
				setImgBasis($hoveredItem);
			}
			hoverTrigger = false;

			setTimeout(function () {
				hoverTrigger = true;
			}, 10);
		}

		function resetMainImg() {
			$item.removeAttr('style');
			setImgBasis($item.eq(0));
		}


		$img.mouseenter(function () {
			changeMainImg($(this));
		})

		$img.closest('.gallery').mouseleave(function () {
			resetMainImg()
		})

	})()



	function checkInViewport(el, expansion) {
		var $el = el;

		if (!$el.length){
			return false;
		}

		expansion = expansion ? expansion : 0;

		var topPos = $el.offset().top;
		windowScrollVal = Math.round($(window).scrollTop() + $(window).innerHeight());
		

		if (topPos - expansion <= windowScrollVal && topPos + $el.innerHeight() + expansion >= $(window).scrollTop()) {
			return true;
			
		} else {
			return false;
		}
	}

	// function parallaxBG() {
	// 	var $slider = document.querySelector(".cta-section");

	// 	var yPos = window.pageYOffset / 2;
	// 	yPos = -yPos;

	// 	var coords = 'center calc(100% + '+ yPos + 'px)';

	// 	$slider.style.backgroundPosition = coords;
	// }

	function parallaxBackground(el, speed, startPos) {

		if (!checkInViewport(el, 20)) {
			el.removeAttr('style');
			return false;
		}
		var $slider = el,
			topPositionModifyer = el.offset().top - $(window).scrollTop();

		var bgSpeed = speed ? speed : 0.2;
		var startPos = startPos ? startPos : '65%';

		var yPos = topPositionModifyer * bgSpeed;
		yPos = -yPos;

		var coords = 'center calc('+ startPos + ' - ' + yPos + 'px)';

		$slider.css({
			'background-position': coords,
		})
	}

	function parallaxTransition(el, directionProp, speedMainDir, speedSecondDir) {

		if (!checkInViewport(el, 250)) {
			el.removeAttr('style');
			return false;
		}
		var $slider = el,
			topPositionModifyer = el.offset().top - $(window).scrollTop();

		var mainSpeed = speedMainDir ? speedMainDir : 0.2;
		var mainPos = topPositionModifyer * mainSpeed;
		mainPos = -mainPos;

		var secondSpeed = speedSecondDir ? ', ' + speedSecondDir + 'px' : '';
		var secondPos = '';

		if (secondSpeed != '') {
			secondPos = topPositionModifyer * secondSpeed;
			secondPos = -secondPos;
		}

		switch (directionProp) {
			case 'X':
				directionProp = 'translateX';
				break;
			case 'Y':
				directionProp = 'translateY';
				break;
			case 'XY':
				directionProp = 'translate';
				break;
		}

		var transformValue = mainPos + 'px' + secondPos;

		$slider.css({
			'transform': directionProp + '(' + transformValue + ')',
		})
	}

	window.addEventListener("scroll", function () {

		if ($(window).innerWidth() > 567) {
			parallaxTransition($('.intro__content'),'Y', 0.1 );
		}

		if ($(window).innerWidth() > 1024) {
			parallaxBackground($('.cta-section'),'', '50%');
		} else if ($(window).innerWidth() > 768){
			parallaxBackground($('.cta-section'), 0.1, '16%');
		} else {
			parallaxBackground($('.cta-section'), 0.05, '-10%');
		}
		
		if ($(window).innerWidth() > 419) {
			parallaxBackground($('.inform-cta__img'), -0.2,'0%' );
			parallaxTransition($('.inform-cta__img'),'Y', 0.1 );
		}
		addAnimateClass($('.intro__social-box'));
		addAnimateClass($('.intro-info'));
		addAnimateClass($('.exellences'));
		addAnimateClass($('.about-container'));
		addAnimateClass($('.catalog-section'));
		addAnimateClass($('.inform-cta-section'));
		
	});

	addAnimateClass($('.intro__social-box'));
	addAnimateClass($('.intro-info'));
	addAnimateClass($('.exellences'));
	addAnimateClass($('.about-container'));
	addAnimateClass($('.catalog-section'));
	addAnimateClass($('.inform-cta-section'));

	(function FocusedInputLabel() {
		var $input = $('.input');

		function checkIfHasLabel(el) {
			return (el.find('.input-label').length);
		}

		function checkIfEmptyVal(el) {
			return (el.val() !== '')
		}

		function addFocus(el) {

			el.on('change keyup', function () {
				var $this = $(this),
					$box = $this.closest('.input-box'),
					ifHasLabel = checkIfHasLabel($box),
					ifHasVal = checkIfEmptyVal($this);

				if (!$box.length && ifHasLabel) {
					return false;
				}

				if (ifHasVal) {
					$box.addClass('focused');
				} else {
					$box.removeClass('focused');
				}
			})
		}
		addFocus($input);
	})()



	if (jQuery('.js-scroll-up').length) {
		let $btn = jQuery('.js-scroll-up')

		$btn.on('click', () => {
			jQuery("html, body").animate({
				scrollTop: "0"
			}, 1000);
		})
	}

	if ($('.js-profile-main-slider').length) {
		$('.js-profile-main-slider').slick({
			dots: false,
			infinite: true,
			arrows: true,
			speed: 200,
			slidesToShow: 1,
			slidesToScroll: 1,
			swipeToSlide: false,
			swipe: false,
			fade: true,
			asNavFor: '.js-profile-thumbs-slider',
			prevArrow: $('.profile__arrow_prev'),
			nextArrow: $('.profile__arrow_next'),
		});

		$('.js-profile-thumbs-slider').slick({
			dots: false,
			infinite: true,
			arrows: false,
			speed: 200,
			slidesToShow: 5,
			slidesToScroll: 1,
			swipeToSlide: true,
			focusOnSelect: true,
			asNavFor: '.js-profile-main-slider',
			responsive: [{
					breakpoint: 1280,
					settings: {
						slidesToShow: 4,
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 5,
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 4,
					}
				},

				{
					breakpoint: 568,
					settings: {
						slidesToShow: 3,
					}
				},
			]
		});
	};


	function addAnimateClass(el){

		if ($(window).innerWidth < 992){
			return false;
		}

		if (checkInViewport(el)){
			el.addClass('animated');
		}
	}












	// function setWowOffset(el, offset) {

	// 	if (Array.isArray(el)) {
	// 		for (let i = 0; i <= el.length; i++) {
	// 			let $item = $(el[i]);

	// 			$item.attr('data-wow-offset', offset);
	// 		}
	// 	} else {
	// 		$(el).attr('data-wow-offset', offset);
	// 	}
	// }

	// function setWowdelay(el, delay) {

	// 	if (Array.isArray(el)) {
	// 		for (let i = 0; i <= el.length; i++) {
	// 			let $item = $(el[i]);

	// 			$item.attr('data-wow-delay', delay);
	// 		}
	// 	} else {
	// 		$(el).attr('data-wow-delay', delay);
	// 	}
	// }

	// const wow_list = [

	// ]

	// const wowOffset_list = [

	// ]

	// const wowDelay_list = [

	// ]


	// for (let i = 0; i <= wow_list.length; i++) {
	// 	$(wow_list[i]).addClass('wow');
	// }

	// setWowOffset(wowOffset_list, 200);
	// setWowdelay('.gallery-section', '.9s');

	// $('.news-item').each(function (i) {
	// 	$delay = `1.${i}s`;
	// 	setWowdelay(this, $delay)
	// })


});

