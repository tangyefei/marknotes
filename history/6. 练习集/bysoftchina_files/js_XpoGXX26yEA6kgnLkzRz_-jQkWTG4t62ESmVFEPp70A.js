;var FORMALIZE=(function(f,e,b,g){var d="placeholder" in b.createElement("input");var c="autofocus" in b.createElement("input");var a=!!(f.browser.msie&&parseInt(f.browser.version,10)===6);var h=!!(f.browser.msie&&parseInt(f.browser.version,10)===7);return{go:function(){for(var j in FORMALIZE.init){FORMALIZE.init[j]()}},init:{ie6_skin_inputs:function(){if(!a||!f("input, select, textarea").length){return}var i=/button|submit|reset/;var j=/date|datetime|datetime-local|email|month|number|password|range|search|tel|text|time|url|week/;f("input").each(function(){var k=f(this);if(this.getAttribute("type").match(i)){k.addClass("ie6-button");if(this.disabled){k.addClass("ie6-button-disabled")}}else{if(this.getAttribute("type").match(j)){k.addClass("ie6-input");if(this.disabled){k.addClass("ie6-input-disabled")}}}});f("textarea, select").each(function(){if(this.disabled){f(this).addClass("ie6-input-disabled")}})},autofocus:function(){if(c||!f(":input[autofocus]").length){return}f(":input[autofocus]:visible:first").focus()},placeholder:function(){if(d||!f(":input[placeholder]").length){return}FORMALIZE.misc.add_placeholder();f(":input[placeholder]").each(function(){var i=f(this);var j=i.attr("placeholder");i.focus(function(){if(i.val()===j){i.val("").removeClass("placeholder-text")}}).blur(function(){FORMALIZE.misc.add_placeholder()});i.closest("form").submit(function(){if(i.val()===j){i.val("").removeClass("placeholder-text")}}).bind("reset",function(){setTimeout(FORMALIZE.misc.add_placeholder,50)})})}},misc:{add_placeholder:function(){if(d||!f(":input[placeholder]").length){return}f(":input[placeholder]").each(function(){var i=f(this);var j=i.attr("placeholder");if(!i.val()||i.val()===j){i.val(j).addClass("placeholder-text")}})}}}})(jQuery,this,this.document);jQuery(document).ready(function(){FORMALIZE.go()});;
/**
 * @todo
 */

Drupal.omega = Drupal.omega || {};

(function($) {
  /**
   * @todo
   */
  var current;
  var previous;
  
  /**
   * @todo
   */
  var setCurrentLayout = function (index) {
    index = parseInt(index);
    previous = current;
    current = Drupal.settings.omega.layouts.order.hasOwnProperty(index) ? Drupal.settings.omega.layouts.order[index] : 'mobile';

    if (previous != current) {      
      $('body').removeClass('responsive-layout-' + previous).addClass('responsive-layout-' + current);      
      $.event.trigger('responsivelayout', {from: previous, to: current});
    }
  };
  
  /**
   * @todo
   */
  Drupal.omega.getCurrentLayout = function () {
    return current;
  };
  
  /**
   * @todo
   */
  Drupal.omega.getPreviousLayout = function () {
    return previous;
  };
  
  /**
   * @todo
   */
  Drupal.omega.crappyBrowser = function () {
    return $.browser.msie && parseInt($.browser.version, 10) < 9;
  };
  
  /**
   * @todo
   */
  Drupal.omega.checkLayout = function (layout) {
    if (Drupal.settings.omega.layouts.queries.hasOwnProperty(layout) && Drupal.settings.omega.layouts.queries[layout]) {
      var output = Drupal.omega.checkQuery(Drupal.settings.omega.layouts.queries[layout]);
      
      if (!output && layout == Drupal.settings.omega.layouts.primary) {
        var dummy = $('<div id="omega-check-query"></div>').prependTo('body');       

        dummy.append('<style media="all">#omega-check-query { position: relative; z-index: -1; }</style>');
        dummy.append('<!--[if (lt IE 9)&(!IEMobile)]><style media="all">#omega-check-query { z-index: 100; }</style><![endif]-->');
        
        output = parseInt(dummy.css('z-index')) == 100;

        dummy.remove();
      }
      
      return output;
    }

    return false;
  };
  
  /**
   * @todo
   */
  Drupal.omega.checkQuery = function (query) {
    var dummy = $('<div id="omega-check-query"></div>').prependTo('body');       
    
    dummy.append('<style media="all">#omega-check-query { position: relative; z-index: -1; }</style>');
    dummy.append('<style media="' + query + '">#omega-check-query { z-index: 100; }</style>');

    var output = parseInt(dummy.css('z-index')) == 100;
    
    dummy.remove();

    return output;
  };
  
  /**
   * @todo
   */
  Drupal.behaviors.omegaMediaQueries = {
    attach: function (context) {
      $('body', context).once('omega-mediaqueries', function () {
        var primary = $.inArray(Drupal.settings.omega.layouts.primary, Drupal.settings.omega.layouts.order);
        var dummy = $('<div id="omega-media-query-dummy"></div>').prependTo('body');

        dummy.append('<style media="all">#omega-media-query-dummy { position: relative; z-index: -1; }</style>');
        dummy.append('<!--[if (lt IE 9)&(!IEMobile)]><style media="all">#omega-media-query-dummy { z-index: ' + primary + '; }</style><![endif]-->');

        for (var i in Drupal.settings.omega.layouts.order) {
          dummy.append('<style media="' + Drupal.settings.omega.layouts.queries[Drupal.settings.omega.layouts.order[i]] + '">#omega-media-query-dummy { z-index: ' + i + '; }</style>');
        }

        $(window).bind('resize.omegamediaqueries', function () {
          setCurrentLayout(dummy.css('z-index'));
        }).load(function () {
          $(this).trigger('resize.omegamediaqueries');
        });
      });
    }
  };
})(jQuery);;
