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
		this.$link.click(function(){
			self.scrollAnime(self.$link.index(this));
			return false;
		});
		$window.resize(function(){
			if(this.$link.length > 0){
				this.setPosition();
			}
		});
	},
	scrollAnime: function(index){
		var self = this;
		$('document,body').animate({'scrollTop':self.target[index]},450,'swing');
	},
	setPosition: function(){
		for (var i = 0; i < this.$link.length; i++) {
			this.target[i] = $(this.$link.attr('href')).offset().top;
		}
	}
};
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
