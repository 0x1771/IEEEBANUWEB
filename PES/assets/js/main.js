!function(e){"use strict";if(e(".count-bar").length&&e(".count-bar").appear(function(){var t=e(this),n=t.data("percent");e(t).css("width",n).addClass("counted")},{accY:-50}),e(".progress-levels .progress-box .bar-fill").length&&e(".progress-box .bar-fill").each(function(){e(".progress-box .bar-fill").appear(function(){var t=e(this).attr("data-percent");e(this).css("width",t+"%")})},{accY:0}),e(".count-box").length&&e(".count-box").appear(function(){var t=e(this),n=t.find(".count-text").attr("data-stop"),a=parseInt(t.find(".count-text").attr("data-speed"),10);t.hasClass("counted")||(t.addClass("counted"),e({countNum:t.find(".count-text").text()}).animate({countNum:n},{duration:a,easing:"linear",step:function(){t.find(".count-text").text(Math.floor(this.countNum))},complete:function(){t.find(".count-text").text(this.countNum)}}))},{accY:0}),e(".accrodion-grp").length&&e(".accrodion-grp").each(function(){var t=e(this).data("grp-name"),n=e(this),a=n.find(".accrodion");n.addClass(t),n.find(".accrodion .accrodion-content").hide(),n.find(".accrodion.active").find(".accrodion-content").show(),a.each(function(){e(this).find(".accrodion-title").on("click",function(){!1===e(this).parent().hasClass("active")&&(e(".accrodion-grp."+t).find(".accrodion").removeClass("active"),e(".accrodion-grp."+t).find(".accrodion").find(".accrodion-content").slideUp(),e(this).parent().addClass("active"),e(this).parent().find(".accrodion-content").slideDown())})})}),e(".scroll-to-target").length&&e(".scroll-to-target").on("click",function(){var t=e(this).attr("data-target");return e("html, body").animate({scrollTop:e(t).offset().top},1e3),!1}),e(".contact-form-validated").length&&e(".contact-form-validated").each(function(){e(this).validate({rules:{name:{required:!0},email:{required:!0,email:!0},message:{required:!0},subject:{required:!0}},submitHandler:function(t){return e.post(e(t).attr("action"),e(t).serialize(),function(n){e(t).parent().find(".result").append(n),e(t).find('input[type="text"]').val(""),e(t).find('input[type="email"]').val(""),e(t).find("textarea").val("")}),!1}})}),e(".mc-form").length&&e(".mc-form").each(function(){var t=e(this),n=t.data("url"),a=t.parent().find(".mc-form__response");t.ajaxChimp({url:n,callback:function(e){a.append(function(){return'<p class="mc-message">'+e.msg+"</p>"}),"success"===e.result&&(t.removeClass("errored").addClass("successed"),a.removeClass("errored").addClass("successed"),t.find("input").val(""),a.find("p").fadeOut(1e4)),"error"===e.result&&(t.removeClass("successed").addClass("errored"),a.removeClass("successed").addClass("errored"),t.find("input").val(""),a.find("p").fadeOut(1e4))}})}),e(".video-popup").length&&e(".video-popup").magnificPopup({type:"iframe",mainClass:"mfp-fade",removalDelay:160,preloader:!0,fixedContentPos:!1}),e(".img-popup").length){var t,n,a={};e(".img-popup").each(function(){var t=parseInt(e(this).attr("data-group"),10);a[t]||(a[t]=[]),a[t].push(this)}),e.each(a,function(){e(this).magnificPopup({type:"image",closeOnContentClick:!0,closeBtnInside:!1,gallery:{enabled:!0}})})}if(e(".time-countdown-one").length&&e(".time-countdown-one").each(function(){var t=e(this),n=t.data("countdown-time");t.countdown(n,function(t){e(this).html('<li> <div class="box"> <span class="days">'+t.strftime("%D")+'</span> <span class="timeRef">Days</span> </div> </li> <li> <div class="box"> <span class="hours">'+t.strftime("%H")+'</span> <span class="timeRef clr-1">Hours</span> </div> </li> <li> <div class="box"> <span class="minutes">'+t.strftime("%M")+'</span> <span class="timeRef clr-2">Minutes</span> </div> </li> <li> <div class="box"> <span class="seconds">'+t.strftime("%S")+'</span> <span class="timeRef clr-3">Seconds</span> </div> </li>')})}),e(".time-countdown-two").length&&e(".time-countdown-two").each(function(){var t=e(this),n=t.data("countdown-time");t.countdown(n,function(t){e(this).html('<li> <div class="box"> <span class="days">'+t.strftime("%D")+'</span> <span class="timeRef">Days</span> </div> </li> <li> <div class="box"> <span class="hours">'+t.strftime("%H")+'</span> <span class="timeRef clr-1">Hours</span> </div> </li> <li> <div class="box"> <span class="minutes">'+t.strftime("%M")+'</span> <span class="timeRef clr-2">Min</span> </div> </li> <li> <div class="box"> <span class="seconds">'+t.strftime("%S")+'</span> <span class="timeRef clr-3">Sec</span> </div> </li>')})}),e(".coming-soon-countdown").length&&e(".coming-soon-countdown").each(function(){var t=e(this),n=t.data("countdown-time");t.countdown(n,function(t){e(this).html('<li> <div class="box"> <span class="days">'+t.strftime("%D")+'</span> <span class="timeRef">days</span> </div> </li> <li> <div class="box"> <span class="hours">'+t.strftime("%H")+'</span> <span class="timeRef clr-1">hrs</span> </div> </li> <li> <div class="box"> <span class="minutes">'+t.strftime("%M")+'</span> <span class="timeRef clr-2">mins</span> </div> </li> <li> <div class="box"> <span class="seconds">'+t.strftime("%S")+'</span> <span class="timeRef clr-3">secs</span> </div> </li>')})}),e(".main-menu__list").length){let i;t=e(".main-menu__list"),i=window.location.href.split("/").reverse()[0],t.find("li").each(function(){let t=e(this).find("a");e(t).attr("href")==i&&e(this).addClass("current")}),t.children("li").each(function(){e(this).find(".current").length&&e(this).addClass("current")}),""==i&&t.find("li").eq(0).addClass("current")}if(e(".main-menu__list").length&&e(".mobile-nav__container").length){let s=document.querySelector(".main-menu__list").outerHTML;document.querySelector(".mobile-nav__container").innerHTML=s}if(e(".sticky-header__content").length){let o=document.querySelector(".main-menu").innerHTML;document.querySelector(".sticky-header__content").innerHTML=o}if(e(".mobile-nav__container .main-menu__list").length&&e(".mobile-nav__container .main-menu__list .dropdown > a").each(function(){let t=e(this),n=document.createElement("BUTTON");n.setAttribute("aria-label","dropdown toggler"),n.innerHTML="<i class='fa fa-angle-down'></i>",t.append(function(){return n}),t.find("button").on("click",function(t){t.preventDefault();let n=e(this);n.toggleClass("expanded"),n.parent().toggleClass("expanded"),n.parent().parent().children("ul").slideToggle()})}),e(".mobile-nav__toggler").length&&e(".mobile-nav__toggler").on("click",function(t){t.preventDefault(),e(".mobile-nav__wrapper").toggleClass("expanded"),e("body").toggleClass("locked")}),e(".search-toggler").length&&e(".search-toggler").on("click",function(t){t.preventDefault(),e(".search-popup").toggleClass("active"),e(".mobile-nav__wrapper").removeClass("expanded"),e("body").toggleClass("locked")}),e(".odometer").length&&e(".odometer").each(function(){e(this).appear(function(){var t=e(this).attr("data-count");e(this).html(t)})}),e(".dynamic-year").length){let l=new Date;e(".dynamic-year").html(l.getFullYear())}e(".wow").length&&new WOW({boxClass:"wow",animateClass:"animated",mobile:!0,live:!0}).init(),e(".thm-accordion").length&&e(".thm-accordion").each(function(){let t=e(this),n=t.attr("id"),a=t.find(".thm-accordion__title");t.addClass(n);let i=t.find(".thm-accordion__content").hide();t.find(".active-item .thm-accordion__content").show(),a.on("click",function(t){t.preventDefault(),e(this);let a=e(this).parent();!1===a.hasClass("active-item")&&(e("#"+n).find(".thm-accordion__item").removeClass("active-item"),a.addClass("active-item"),i.slideUp(),a.find(".thm-accordion__content").slideDown())})}),e(".tabs-box").length&&e(".tabs-box .tab-buttons .tab-btn").on("click",function(t){t.preventDefault();var n=e(e(this).attr("data-tab"));if(e(n).is(":visible"))return!1;n.parents(".tabs-box").find(".tab-buttons").find(".tab-btn").removeClass("active-btn"),e(this).addClass("active-btn"),n.parents(".tabs-box").find(".tabs-content").find(".tab").fadeOut(0),n.parents(".tabs-box").find(".tabs-content").find(".tab").removeClass("active-tab"),e(n).fadeIn(300),e(n).addClass("active-tab")}),(n=e(".scrollToLink")).length&&n.children("a").bind("click",function(t){if(e(window).scrollTop()>10)var a="90";else var a="90";var i=e(this);e("html, body").stop().animate({scrollTop:e(i.attr("href")).offset().top-a+"px"},1200,"easeInOutExpo"),n.removeClass("current"),n.removeClass("current-menu-ancestor"),n.removeClass("current_page_item"),n.removeClass("current-menu-parent"),i.parent().addClass("current"),t.preventDefault()}),e(window).on("load",function(){if(e(".preloader").length&&e(".preloader").fadeOut(),e(".thm-swiper__slider").length&&e(".thm-swiper__slider").each(function(){let t=e(this),n=t.data("swiper-options");new Swiper(t,n)}),e(".thm-owl__carousel").length&&e(".thm-owl__carousel").each(function(){let t=e(this),n=t.data("owl-options");t.owlCarousel(n)}),e(".thm-owl__carousel--custom-nav").length&&e(".thm-owl__carousel--custom-nav").each(function(){let t=e(this),n=t.data("owl-nav-prev"),a=t.data("owl-nav-next");e(n).on("click",function(e){t.trigger("prev.owl.carousel"),e.preventDefault()}),e(a).on("click",function(e){t.trigger("next.owl.carousel"),e.preventDefault()})}),e(".masonary-layout").length&&e(".masonary-layout").isotope({layoutMode:"masonry"}),e(".post-filter").length&&e(".post-filter li").children(".filter-text").on("click",function(){var t=e(this),n=t.parent().attr("data-filter");return e(".post-filter li").removeClass("active"),t.parent().addClass("active"),e(".filter-layout").isotope({filter:n,animationOptions:{duration:500,easing:"linear",queue:!1}}),!1}),e(".post-filter.has-dynamic-filters-counter").length&&e(".post-filter.has-dynamic-filters-counter").find("li").each(function(){var t=e(this).data("filter"),n=e(".filter-layout").find(t).length;e(this).children(".filter-text").append('<span class="count">'+n+"</span>")}),e(".full-height").css("height",e(window).height()),e(".post-filter").length){var t=e(".post-filter li");e(".filter-layout").isotope({filter:".filter-item",animationOptions:{duration:500,easing:"linear",queue:!1}}),t.on("click",function(){var n=e(this),a=n.attr("data-filter");return t.removeClass("active"),n.addClass("active"),e(".filter-layout").isotope({filter:a,animationOptions:{duration:500,easing:"linear",queue:!1}}),!1})}if(e(".post-filter.has-dynamic-filter-counter").length&&e(".post-filter.has-dynamic-filter-counter").find("li").each(function(){var t=e(this).data("filter"),n=e(".filter-layout").find(t).length;e(this).append("<sup>["+n+"]</sup>")}),e("#testimonial-three__thumb").length){let n=new Swiper("#testimonial-three__thumb",{slidesPerView:3,spaceBetween:20,speed:1400,watchSlidesVisibility:!0,watchSlidesProgress:!0,loop:!0,autoplay:{delay:5e3}});new Swiper("#testimonial-three__carousel",{observer:!0,observeParents:!0,speed:1400,mousewheel:!0,slidesPerView:1,autoplay:{delay:5e3},thumbs:{swiper:n},pagination:{el:"#testimonial-three__carousel-pagination",type:"bullets",clickable:!0}})}e(".marquee_mode").length&&e(".marquee_mode").marquee({speed:40,gap:0,delayBeforeStart:0,direction:"left",duplicated:!0,pauseOnHover:!0,startVisible:!0})}),e(window).on("scroll",function(){if(e(".stricked-menu").length){var t,n=e(".stricked-menu");e(window).scrollTop()>130?n.addClass("stricky-fixed"):130>=e(this).scrollTop()&&n.removeClass("stricky-fixed")}e(".scroll-to-top").length&&(e(window).scrollTop()>100?e(".scroll-to-top").fadeIn(500):100>=e(this).scrollTop()&&e(".scroll-to-top").fadeOut(500)),t=e(window).scrollTop(),t>=117?e(".one-page-scroll-menu .scrollToLink").children("a").each(function(){var n=e(this).attr("href");e(n).each(function(){if(e(this).offset().top<=t+100){var a=e(n).attr("id");e(".one-page-scroll-menu").find("li").removeClass("current"),e(".one-page-scroll-menu").find("li").removeClass("current-menu-ancestor"),e(".one-page-scroll-menu").find("li").removeClass("current_page_item"),e(".one-page-scroll-menu").find("li").removeClass("current-menu-parent"),e(".one-page-scroll-menu").find("a[href*=\\#"+a+"]").parent().addClass("current")}})}):(e(".one-page-scroll-menu li.current").removeClass("current"),e(".one-page-scroll-menu li:first").addClass("current"))}),e("select:not(.ignore)").niceSelect()}(jQuery);