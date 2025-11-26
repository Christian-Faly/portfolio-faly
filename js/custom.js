(function ($) {

	"use strict";

	$(window).on("load", function () {

		/* ----------------------------------------------------------- */
		/*  PRELOADER ANIMATION
		/* ----------------------------------------------------------- */

		var pageTransitionAnimationDuration = 500
		var preloader = $(".preloader");
		pageTransition({
			target: document.querySelector('.page'),
			delay: 0,
			duration: pageTransitionAnimationDuration,
			classActive: 'animated',
			conditions: function (event, link) {
				return
				!/(\#|callto:|tel:|mailto:|:\/\/)/.test(link)
					&& !event.currentTarget.hasAttribute('data-lightgallery')
					&& event.currentTarget.getAttribute('href') !== 'javascript:void(0);';
			},
			onTransitionStart: function (options) {
				setTimeout(function () {
					preloader.removeClass('loaded');
				}, options.duration * .75);
			},
			onReady: function () {
				preloader.addClass('loaded');
			}
		});

		/* ----------------------------------------------------------- */
		/*  TEXT ROTATOR ANIMATION
		/* ----------------------------------------------------------- */
		if ($("#selector").length) {
			$("#selector").animatedHeadline({
				animationType: "clip"
			});
		}

	});

	jQuery(document).ready(function ($) {

		/* ----------------------------------------------------------- */
		/*  STRETCHY NAVIGATION
		/* ----------------------------------------------------------- */

		$(document).ready(function () {

			// TOGGLE NAV MENU
			if ($(".cd-stretchy-nav").length > 0) {
				var nav = $(".cd-stretchy-nav");
				nav.each(function () {
					var $thisNav = $(this);
					var trigger = $thisNav.find(".cd-nav-trigger");

					trigger.on("click", function (e) {
						e.preventDefault();
						$thisNav.toggleClass("nav-is-visible");
					});
				});

				$(document).on("click", function (e) {
					if (!$(e.target).is(".cd-nav-trigger") && !$(e.target).is(".cd-nav-trigger span")) {
						nav.removeClass("nav-is-visible");
					}
				});
			}

			// SECTION SWITCHING
			$(".stretchy-nav li a").on("click", function (e) {
				e.preventDefault();

				var target = $(this).attr("href"); // #home, #about, etc.

				// Remove active class from all menu items and sections
				$(".stretchy-nav li").removeClass("active");
				$("section").removeClass("active");

				// Add active to clicked menu and target section
				$(this).parent().addClass("active");
				$(target).addClass("active");

				// Close the nav menu if open
				$(".cd-stretchy-nav").removeClass("nav-is-visible");
			});

		});

		/* ----------------------------------------------------------- */
		/*  LINK TO ABOUT SECTION
		/* ----------------------------------------------------------- */

		$(".link-portfolio-one").on("click", function (e) {
			var tabNum = $(this).index();
			var nthChild = tabNum + 3;
			$("#main > section.active").removeClass("active");
			$("#main > section:nth-child(" + nthChild + ")").addClass("active");
			$(".stretchy-nav li:first-child").removeClass("active");
			$(".stretchy-nav li:nth-child(2)").addClass("active");
			e.preventDefault();
		});

		/* ----------------------------------------------------------- */
		/*  LINK TO PORTFOLIO SECTION
		/* ----------------------------------------------------------- */

		$(".link-portfolio-two").on("click", function (e) {
			var tabNum = $(this).index();
			var nthChild = tabNum + 3;
			$("#main > section.active").removeClass("active");
			$("#main > section:nth-child(" + nthChild + ")").addClass("active");
			$(".stretchy-nav li:nth-child(1)").removeClass("active");
			$(".stretchy-nav li:nth-child(3)").addClass("active");
			e.preventDefault();
		});

		/* ----------------------------------------------------------- */
		/*  AJAX CONTACT FORM
		/* ----------------------------------------------------------- */

		$(".contactform").on("submit", function () {
			$(".output_message").text("Loading...");

			var form = $(this);
			$.ajax({
				url: form.attr("action"),
				method: form.attr("method"),
				data: form.serialize(),
				success: function (result) {
					if (result == "success") {
						$(".form-inputs").css("display", "none");
						$(".box p").css("display", "none");
						$(".contactform").find(".output_message").addClass("success");
						$(".output_message").text("Message Sent!");
					} else {
						$(".tabs-container").css("height", "440px");

						$(".contactform").find(".output_message").addClass("error");
						$(".output_message").text("Error Sending!");
					}
				}
			});

			return false;
		});

		/* ----------------------------------------------------------- */
		/*  PAGE ANIMATION
		/* ----------------------------------------------------------- */

		checkScreenSize();

		function checkScreenSize() {
			var newWindowWidth = $(window).width();
			if (newWindowWidth < 1025) {
				$('#nav > li').on('click', function (e) {
					e.preventDefault();
					$('#main').addClass('open');
				});
			} else { }
		}
		var resizeTimer;
		$(window).on('resize', function (e) {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function () {
				checkScreenSize();
			}, 250);
		});

		/* ----------------------------------------------------------- */
		/*  STOP VIDEOS WHEN CLICK DETECTED ON MENU LINKS
		/* ----------------------------------------------------------- */

		function stop_videos() {
			var video = document.getElementById("video");
			if (video && video.paused !== true && video.ended !== true) {
				video.pause();
			}
			// pause youtube iframe if exists (guarded)
			if ($('.youtube-video').length > 0 && $('.youtube-video')[0] && $('.youtube-video')[0].contentWindow) {
				$('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
			}
		}

		/* ----------------------------------------------------------- */
		/*  SHOW/HIDE SECTIONS
		/* ----------------------------------------------------------- */

		if (window.location.hash && $('#link-' + window.location.hash.replace(/^#/, '')).length) {
			$('#link-' + window.location.hash.replace(/^#/, '')).trigger('click');
		}
		window.userInteractionTimeout = null;
		window.userInteractionInHTMLArea = false;
		window.onBrowserHistoryButtonClicked = null;
		$(document).ready(function () {
			$(document).mousedown(function () {
				clearTimeout(window.userInteractionTimeout);
				window.userInteractionInHTMLArea = true;
				window.userInteractionTimeout = setTimeout(function () {
					window.userInteractionInHTMLArea = false;
				}, 500);
			});
			$(document).keydown(function () {
				clearTimeout(window.userInteractionTimeout);
				window.userInteractionInHTMLArea = true;
				window.userInteractionTimeout = setTimeout(function () {
					window.userInteractionInHTMLArea = false;
				}, 500);
			});
			if (window.history && window.history.pushState) {
				$(window).on('popstate', function () {
					if (!window.userInteractionInHTMLArea) {
						if (window.location.hash && $('#link-' + window.location.hash.replace(/^#/, '')).length) {
							$('#link-' + window.location.hash.replace(/^#/, '')).trigger('click');
						}
						if (!window.location.hash) {
							$('#link-home').trigger('click');
						}
					}
					if (window.onBrowserHistoryButtonClicked) {
						window.onBrowserHistoryButtonClicked();
					}
				});
			}
		});

		/* ----------------------------------------------------------- */
		/*  BACK TO MAIN SECTION IN MOBILE
		/* ----------------------------------------------------------- */

		$('#back-mobile').on('click', function (e) {
			$('#main').removeClass('open');
			stop_videos();
		});


		/* ----------------------------------------------------------- */
		/*  PORTFOLIO SHOW SLIDE
		/* ----------------------------------------------------------- */

		var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;

		$('.portfolio-section').find('ul a').on('click', function (event) {
			event.preventDefault();
			var selected_member = $(this).data('type');
			$('.project-info-container.' + selected_member + '').addClass('slide-in');
			$('.close-project').addClass('is-visible');

			// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
			if (is_firefox) {
				$('.portfolio-container').addClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
					$('.portfolio-container').addClass('overflow-hidden');
				});
			} else {
				$('.portfolio-container').addClass('slide-out');
				$('.portfolio-container').addClass('overflow-hidden');
			}

			if ($(window).width() < 1025) {
				$('#back-mobile').css('pointer-events', 'none');
			}


		});
		/* ----------------------------------------------------------- */
		/*  SLIDER IN PORTFOLIO
		/* ----------------------------------------------------------- */
		$('.portfolio-slider').carousel({
			pause: true,
			interval: false
		});

	});

	/* ----------------------------------------------------------- */

})(jQuery);

// Animation des expériences : afficher tous les éléments visibles + forcer au chargement
function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	return rect.top <= (window.innerHeight || document.documentElement.clientHeight);
}

const timelineItems = document.querySelectorAll('.timeline-item');

function showAllTimelineItems() {
	timelineItems.forEach(item => {
		item.classList.add('in-view');
		item.style.opacity = "1";
		item.style.transform = "translateY(0)";
	});
}

window.addEventListener('load', showAllTimelineItems);
window.addEventListener('scroll', showAllTimelineItems);

// Animate skill bars when in view
document.addEventListener("DOMContentLoaded", () => {
	const cards = document.querySelectorAll(".skill-card");
	window.addEventListener("scroll", () => {
		const triggerBottom = window.innerHeight * 0.9;
		cards.forEach(card => {
			const cardTop = card.getBoundingClientRect().top;
			if (cardTop < triggerBottom) {
				card.classList.add("show");
			}
		});
	});
});


// Animation au scroll pour Education Timeline
function showAllEducationItems() {
	const items = document.querySelectorAll('.timeline-edu-item');
	items.forEach(item => {
		item.classList.add('in-view');
		item.style.opacity = "1";
		item.style.transform = "translateY(0)";
	});
}

window.addEventListener('load', showAllEducationItems);

// Filtrage dynamique des projets
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
	button.addEventListener("click", () => {
		const filter = button.getAttribute("data-filter");

		filterButtons.forEach(btn => btn.classList.remove("active"));
		button.classList.add("active");

		projects.forEach(project => {
			if (filter === "all" || project.classList.contains(filter)) {
				project.style.display = "block";
				project.style.animation = "fadeIn 0.5s ease";
			} else {
				project.style.display = "none";
			}
		});
	});
});
//// Gestion du formulaire de contact

// document.querySelector("#contact-form").addEventListener("submit", function (e) {
// 	e.preventDefault();
// 	const status = document.querySelector("#form-status");
// 	status.textContent = "Sending...";
// 	status.style.color = "#00ffd5";

// 	setTimeout(() => {
// 		status.textContent = "✅ Message sent successfully!";
// 	}, 1500);

// 	this.reset();
// });
const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add("show");
		}
	});
});

document.querySelectorAll(".contact-section, .info-item, .contact-form")
	.forEach(el => observer.observe(el));

//about

const aboutObserver = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add("show");
		}
	});
});

document.querySelectorAll(".about-section, .about-img, .about-text")
	.forEach(el => aboutObserver.observe(el));

//home

const typingText = document.querySelector(".typing-text");
const phrases = [
	"Full Stack Developer",
	"Geomatician",
];

let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;

function loop() {
	typingText.innerHTML = currentPhrase.join("");

	if (i < phrases.length) {
		if (!isDeleting && j <= phrases[i].length) {
			currentPhrase.push(phrases[i][j]);
			j++;
			typingText.innerHTML = currentPhrase.join("");
		}

		if (isDeleting && j > 0) {
			currentPhrase.pop();
			j--;
			typingText.innerHTML = currentPhrase.join("");
		}

		if (j === phrases[i].length) {
			isDeleting = true;
			setTimeout(loop, 1500);
		} else if (isDeleting && j === 0) {
			isDeleting = false;
			i++;
			if (i === phrases.length) i = 0;
		}
	}

	const speed = isDeleting ? 50 : 100;
	setTimeout(loop, speed);
}

loop();
