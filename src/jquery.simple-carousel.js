/**
 * jQuery Simple Carousel v0.1.0
 *
 * Copyright (c) 2015 Levon Kirakosyan
 *
 * Licensed under MIT
 */

if (typeof Object.create !== "function") {
  Object.create = function (obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };
}

(function($) {

  var SimpleCarousel = {
    init: function(options, el) {
      this.$elem = $(el);
      this.$items = $(el).children();
      this.load();
    },

    load: function() {
      var base = this;
      var width = 0;

      this.$elem.children().each(function() {
        width += $(this).outerWidth(true);
      });

      var wrapperWidth = this.$elem.outerWidth(true);
      var wrapperHeight = this.$elem.outerHeight(true);

      var wrapper = $('<div></div>').addClass('simple-carousel-wrapper').css({
        width: wrapperWidth,
        height: wrapperHeight
      });

      this.$elem.addClass('simple-carousel-elements').css({
        width: width
      });

      var container = $('<div></div>').addClass('simple-carousel-container');

      this.$elem.wrap(wrapper);

      wrapper = this.$elem.parent('.simple-carousel-wrapper');
      wrapper.wrap(container);
      container = this.$elem.parents('.simple-carousel-container');

      if (wrapperWidth < width) {
        var leftButton = $('<a><</a>').addClass('simple-carousel-left').css({
          top: wrapperHeight / 2 - 8,
          left: -15
        });

        var rightButton = $('<a>></a>').addClass('simple-carousel-right').css({
          top: wrapperHeight / 2 - 8,
          right: -15
        });

        leftButton.on('click', function () {
          if (leftButton.hasClass('disabled')) return;
          base.prev();
        });

        rightButton.on('click', function () {
          if (rightButton.hasClass('disabled')) return;
          base.next();
        });

        container.prepend(leftButton);
        container.append(rightButton);
      }

      this.contentWidth = width;
      this.wrapperWidth = wrapperWidth;
    },

    prev: function() {
      var currentX = Math.abs(this.$elem.position().left);
      var toGo = null;

      $(this.$items.get().reverse()).each(function() {
        var posX = $(this).position().left;

        if (posX < currentX) {
          toGo = -posX;
          return false;
        }
      });

      this.$elem.animate({
        left: toGo
      }, function() {

      });
    },

    next: function() {
      var currentX = Math.abs(this.$elem.position().left);
      var toGo = null;

      this.$items.each(function() {
        var posX = $(this).position().left;

        if (posX > currentX) {
          toGo = -posX;
          return false;
        }
      });

      var maxLeft = this.wrapperWidth - this.contentWidth;

      toGo = Math.max(toGo, maxLeft);

      this.$elem.animate({
        left: toGo
      }, function() {

      });
    }
  };

  $.fn.simpleCarousel = function(options) {
    return this.each(function() {
      if ($(this).data("simpleCarouselInit") === true) {
        return false;
      }
      $(this).data("simpleCarouselInit", true);
      var simpleCarousel = Object.create(SimpleCarousel);
      simpleCarousel.init(options, this);
      $.data(this, "simpleCarousel", simpleCarousel);
      return simpleCarousel;
    });
  };

}(jQuery));