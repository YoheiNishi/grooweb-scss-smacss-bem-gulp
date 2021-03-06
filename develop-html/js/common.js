!function(){	// limit scope
	$(function(){
		var $window = $(window),
		breakPoint = 667,
		wid = $window.width(),
		resizeTimer = false,
		$body = $('body'),
		CLICK_EVENT = 'click';


//////////////////////////////////////////////
//
//   User Agent
//
//////////////////////////////////////////////
		var _ua = (function(u){
		  return {
		    Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1)
		      || u.indexOf("ipad") != -1
		      || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
		      || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
		      || u.indexOf("kindle") != -1
		      || u.indexOf("silk") != -1
		      || u.indexOf("playbook") != -1,
		    Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
		      || u.indexOf("iphone") != -1
		      || u.indexOf("ipod") != -1
		      || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
		      || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
		      || u.indexOf("blackberry") != -1
		  }
		})(window.navigator.userAgent.toLowerCase());
		if(_ua.Mobile || _ua.Tablet){
			// mobile & tablet only
		} else {
			// PC only
		}


//////////////////////////////////////////////
//
//   click or touch
//
//////////////////////////////////////////////
function tapEvent(){
	if ('ontouchstart' in window ? true : false){
		CLICK_EVENT = 'touchstart';
	}else{
		CLICK_EVENT = 'click';
	}
}
tapEvent();
//////////////////////////////////////////////
//
//   change Img
//
//////////////////////////////////////////////
		function changeImgSp(){
			$('.change-img').each(function(){
				$(this).attr("src",$(this).attr("src").replace(/_pc\./, '_sp.'));
			});
		}
		function changeImgPc(){
			$('.change-img').each(function(){
				$(this).attr("src",$(this).attr("src").replace(/_sp\./, '_pc.'));
			});
		}

//////////////////////////////////////////////
//
//   ページ内リンク
//
//////////////////////////////////////////////
var pageLink = {
	init: function () {
		this.setParam();
		this.bindEvent();
	},
	setParam: function(){
		this.$link = $('.anc');
		this.target = [];
		if(this.$link.length > 0){
			this.setPosition();
		}
	},
	bindEvent: function(){
		var self = this;
		this.$link.on(CLICK_EVENT,function(){
			self.scrollAnime(self.$link.index(this));
			return false;
		});
		$window.resize(function(){
			if(self.$link.length > 0){
				self.setPosition();
			}
		});
	},
	scrollAnime: function(index){
		var self = this;
		$('html,body').animate({'scrollTop':self.target[index]},450,'swing');
	},
	setPosition: function(){
		// for (var i = 0; i < this.$link.length; i++) {
		// 	this.target[i] = $(this.$link.eq(i).attr('href')).offset().top;
		// }
		$.each(this.$link,function(index){
			this.target[index] = $($(this).attr('href')).offset().top;
		});
	}
};

//////////////////////////////////////////////
//
//   slick
//		下記は例であらかじめエレメントやオプションを記入しています。
//		エレメントとオプションの順番は関係あります。
//
//////////////////////////////////////////////
var slide = {
	init: function(){
		this.setParam();
		this.bindEvent();
	},
	setParam: function(){
		this.$slides = [$('.footer__business__banner'),$('.class-detail__slide'),$('.pick-up__slide-sp')];
		this.options = [
			{
				autoplay: true,
				autoplaySpeed: 6000,
				slidesToShow: 6,
				responsive:[{
					breakpoint: 640,
					settings: {
						slidesToShow: 2
					}
				}]
			},
			{
				autoplay: true,
				dots: true,
				slidesToShow: 1,
				lazyLoad: 'ondemand'
			},
			{
				autoplay: false,
				infinite: true
			}
		];
		this.$window = $(window);
	},
	bindEvent: function(){
		var self = this;
		this.$window.load(function(){
			self.slide();
		});
	},
	slide: function(){
		for(var i=0;i<this.options.length;i++){
			this.$slides[i].slick(this.options[i]);
		}
	}
};
//////////////////////////////////////////////
//
//   Google Map
//
//////////////////////////////////////////////
function initialize() {
	//目的地
	var latlng = new google.maps.LatLng(32.828632, 130.770792);
	var myOptions = {
		zoom: 15,
		center: latlng,
		scrollwheel: false
	};
	var map = new google.maps.Map(document.getElementById('map'), myOptions);

	//map アイコン
	var icon = {
		url: 'アイコン画像のパス',
		size: new google.maps.Size(画像の幅,画像の高さ)
	};
	var markerOptions = {
		position: latlng,
		map: map,
		icon: icon,
		title: 'アイコンのタイトル',
	};
	var marker = new google.maps.Marker(markerOptions);
	marker.setMap(map);
}

//////////////////////////////////////////////
//
//   Break Point Discriminate
//
//////////////////////////////////////////////
		function descriminateBp(){
			wid = $window.width();
			if(wid <= breakPoint){
//////////////////// sp Only /////////////////
                spSizeOnly();

			}else if(wid > breakPoint){
//////////////////// pc Only /////////////////
                pcSizeOnly();
			}
		}




//////////////////////////////////////////////
//
//   Only Pc Size Processing
//   Please describe processing of pc below
//
//////////////////////////////////////////////
        function pcSizeOnly(){
            changeImgPc();
        }






//////////////////////////////////////////////
//
//   Only Sp Size Processing
//   Please describe processing of sp below
//
//////////////////////////////////////////////
        function spSizeOnly(){
            changeImgSp();
        }



//////////////////////////////////////////////
//
//   All device
//
//////////////////////////////////////////////
		//// fade ////
		$(".fade").hover(function(){
			$(this).fadeTo(100, 0.6);
		},function(){
			$(this).fadeTo(300, 1.0);
		});

		descriminateBp();

//////////////////////////////////////////////
//
//   Window Resize
//
//////////////////////////////////////////////
		$window.resize(function() {
			if (resizeTimer !== false) {
				clearTimeout(resizeTimer);
			}
			resizeTimer = setTimeout(descriminateBp, 200);
		});
	});



}();
