$(document).ready(function(){



	var app = {

			initialize : function () {
				this.setUpListeners();
				this.slider;
			},
			slider: $('#bxslider'),
			addCart: $('#header__price'),
			headerMunu: $('#header__menu').find('li'),

			// setUpListeners
			setUpListeners: function () {
				this.slider.bxSlider({
				  	'pager' : false,
				  	'controls' : true,
				  	'auto' : true,
				  	'pause' : 6500,
				  	'adaptiveHeight' : true,
				  	'responsive': true
				  });
				this.addCart.on('click', this.buy); // appear blco with buy
				this.headerMunu.on('click', this.menuActive);

			},

			/* functions */
			buy: function(){
				var showBlock = $('#header__buy');
				if (showBlock.hasClass('hide')) {
					showBlock.removeClass('hide');
				} else
				showBlock.addClass('hide');
			},
			menuActive: function() {
				var $this = $(this)
				$this.addClass('header__menu-item_active').siblings().removeClass('header__menu-item_active');
			},
	}
	app.initialize();
});