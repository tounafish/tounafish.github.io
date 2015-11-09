
(function ($) {

  Drupal.behaviors.mpp = {
    attach: function (context, settings) {
      var productsArray = page_data['custom-mpp'].products;

      $(".js-product-brief").each( function() {
        var productId = $(this).attr('data-product-id');
        var productData = _.find(productsArray, function(p){ return p.PRODUCT_ID == productId; });
        site.product.view.brief({
          containerNode: this,
          productData: productData
        });
      });

      site.product.view.miscFlagAlign($('.mpp__product'));
      site.product.view.equalRowHeight($('.mpp__product'));

      //quickshop test
      function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++) {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
        }
        return vars;
      }
      var qs = getUrlVars()['qs'];
      if(qs){
        $('.qs_test').removeClass('hidden');
        $('.qs_test').click(function(event) {
          var pid = $(this).attr('data-product-id');
          var quickshopData = _.find(productsArray, function(p){ return p.PRODUCT_ID == pid; });
          site.quickshop(quickshopData);
        });
      //$('.qs_test').eq(1).trigger('click');
      }

      // Procuct Sort
      site.productSort.init(productsArray);
      // Product compare nav
      site.mppCompareInit(productsArray);
    }
  };

})(jQuery);
;
var __phone_order__ = function($) {
  $('#csr_header').draggable({handle: '#csr_dragger'});
}(jQuery);
;
