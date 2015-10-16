/*global $, Fluidvids*/
$(function () {
	"use strict";

	var body = $('body');
	/* Determine viewport width matching with media queries */
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
		};
	}

	/* Toggle "mobile" class */
	function mobileClass() {
		var vpWidth = viewport().width; // This should match media queries
		if ((vpWidth <= 768) && (!body.hasClass('mobile'))) {
			body.addClass('mobile');
		} else if ((vpWidth > 768) && (body.hasClass('mobile'))) {
			body.removeClass('mobile');
		}
	}

	mobileClass();
	$(window).resize(mobileClass);

	/* Smooth scroll */
	function smoothScroll() {
		$('a[href*=#]:not([href=#])').click(function () {
			if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') || location.hostname === this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {

					$('html,body').animate({
						scrollTop: target.offset().top
					}, 500);
					return false;
				}
			}
		});
	}

	smoothScroll();
	
	/* Fixed header if there's no Big slider */
	if (!$('#intro-wrap').length) {
        $('header').addClass('fixed-header');
    }

	/* Submenus */
	var menuToggle = $('#menu-toggle');
	var headerNav = $('nav');
	var headerNavUl = headerNav.children('ul');
	var liWithSub = headerNavUl.children('li:has(ul.sub-menu)');
	var ulSub = $('ul.sub-menu');
	var parent = ulSub.children('li:has(ul.sub-menu)').children('a');
	var menuArrow = '<span class="sub-arrow"><i class="fa fa-chevron-down"></i></span>';

	liWithSub.addClass('parent').children('a').append(menuArrow);
	parent.addClass('parent');

	menuToggle.click(function () {
		headerNavUl.slideToggle(200);
		$(this).children('i').toggleClass('active');
		return false;
	});

	$(window).resize(function () {
		if (!body.hasClass('mobile')) {
			headerNavUl.removeAttr('style');
			menuToggle.children('i').removeClass('active');
		}
	});

	/* Make page's odd sections darker */
	var page = $('.page');
	var pageSections = page.find('.section');
	var oddSections = pageSections.filter(':odd');

	if (body.hasClass('page') && pageSections.length > 1) {
		oddSections.addClass('greyish');
	}
	
	/* Add some "last" classes */
    headerNav.find('.menu-item').last('li').addClass('last');
    $('#top-footer').find('.column').last('.column').addClass('last');
    $('.blog.list-style').find('article').last('article').addClass('last');
    $('.search.list-style').find('article').last('article').addClass('last');
	
	/* Clear columns */
    var lastColumn = $('.column.last');
    if (lastColumn.length) {
        lastColumn.after('<div class="clear"></div>');
    }
	
	/* Initialize FluidVids.js */
    Fluidvids.init({
        selector: 'iframe',
        players: ['www.youtube.com', 'player.vimeo.com']
    });


});