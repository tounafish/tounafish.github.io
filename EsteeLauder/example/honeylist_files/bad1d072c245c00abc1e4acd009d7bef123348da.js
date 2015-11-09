 /* Homepage page_name fix - For urls like www.esteelauder.com/index.php where page_name keys are being set to "Estee Lauder Official Site" instead of "Home"*/
if ((tms_page_data.tms_page_info.page_name.pageID == "Estée Lauder Official Site") && (tms_page_data.tms_page_info.page_name.categoryID == "Home") && (tms_page_data.tms_page_info.page_name.categoryName == "Home") && (tms_page_data.tms_page_info.page_name.pageType == "Home")) { 
    tms_page_data.tms_page_info.page_name.pageID = "Home";
    tms_page_data.tms_page_info.page_name.categoryID = "home";
    tms_page_data.tms_page_info.page_name.categoryName = "home";
    tms_page_data.tms_page_info.page_name.pageType = "home";
    //console.log(tms_page_data.tms_page_info.page_name); 
}

if (typeof page_data.data != 'undefined'){
  if (typeof page_data.data.form != 'undefined'){  
    if ( typeof page_data.data.form.checkout_signin != 'undefined'){    
      tms_page_data.tms_page_info.page_name.pageID = 'checkout | signin';
    }
  } 
}

function sanitize_page_name () {
    var str = tms_page_data.tms_page_info.page_name.pageID;

    if ( typeof(str) == "string") {
        str = str.replace(/<\/?[^>]+>/gi," "); /* Strip html */
    }

    tms_page_data.tms_page_info.page_name.pageID = str;
}

sanitize_page_name();

    var cartContents = "";
    var newCartContentsCount = 0;
    var oldCartContentsCount = 0;
    
/* double check lang id with domain */

if (typeof tms_page_data.tms_page_info.site_info.LANGUAGE_ID != 'undefined'){    
    var prefixHost = document.location.hostname.split(".")[0];    
    if (prefixHost =='espanol'){
       tms_page_data.tms_page_info.site_info.LANGUAGE_ID = 'es';  
    }else{
       tms_page_data.tms_page_info.site_info.LANGUAGE_ID = 'en';   
    }
}


jQuery(window).bind("MPP:productQV",function( e,sdata ){
    console.log("qv",sdata);
});


console.log("search lib loaded");
jQuery(window).bind("OMNISEARCH",function( e,sdata ){
    
 console.log("SEARCH ",e,sdata);   
 jQuery(window).trigger("INTSEARCH",[sdata]);
 console.log("search INTSEARCH fired w ",sdata);
    
});


jQuery(window).bind("SEARCHALLCLK",function( e,sdata ){
    console.log("SEARCH ALL CLICK");
}); 

jQuery(window).bind("SEARCHPRODUCTCLK",function( e,sdata ){
    
    console.log("SEARCH PRODUCT CLICK",sdata);
}); 

jQuery(window).bind("FILTERSEARCH",function( e,sdata ){
    console.log("FILTER SEARCH CLICK",sdata);
});


$( "#email-signup__form" ).submit(function( event ) {

 jQuery(window).trigger("EMAIL:FOOTER",[]);
 
}); 

$("#sms-signup__form").submit(function( event ) {

 jQuery(window).trigger("SMS:FOOTER",[]);
 
}); 

/* Email opt after logging in from Account page */
$('form[name="registration"]').submit(function( event ) {
 if(($("#form--registration--field--PC_EMAIL_PROMOTIONS").prop("checked"))) {
    s.c_w('v28', "Account Page – Sign In");  
    //console.log("checked");
}
});

/* Email opt - checkout new user */
$('form[name="checkout_shipping_panel"]').submit(function( event ) {
 if(($("#sign-in-component__PC_EMAIL_PROMOTIONS").prop("checked"))) {
    s.c_w('v28', "Checkout - New User");  
    //console.log("checked");
}
});

/* Email opt - checkout new user shipping page*/
$('form[name="checkout_shipping_panel"]').submit(function( event ) {
 if(($("#form--email_promotions--field--PC_EMAIL_PROMOTIONS").prop("checked"))) {
    s.c_w('v28', "Checkout - New User - Shipping");  
    console.log("checked");
}
});

//Topnav popup register
$('form[class="sign-in-component__form sign-in-component__form--registration"]').live('submit',function( event ) {
    if($("#sign-in-component__PC_EMAIL_PROMOTIONS").prop("checked")) {
        s.c_w('v28', "Topnav");  
        console.log("topnav popup checked");
    }
});

$('.email_input .form-submit').live('click',function(event) {
    var title1 = $('#popover_email_form >:input').val();
    var title2 = "Popup - ";
    var title = title2 + title1; console.log(title);
    s.c_w('v28', title);  
    console.log("Page popup checked");
   
});


/* Store Locator */
jQuery(window).bind("STORELOCATOR",function( e,sdata ){
    //console.log("STORE LOC CLICK",sdata);
}); 

/* JM :: FR Jquery NO BRIDGE */

function setCartCookie() {
  myhost=window.location.host;
  document.cookie = 'btcartcookie=; expires=Thu, 2 Aug 2031 20:47:11 UTC; path=/;domain=' + myhost; 

}

//from Jquery
function read_cookie(key)
{
    var result;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? (result[1]) : null;
}



 
 
 
//JQUERY
$(document).bind( 'RPC:RESULT', function(evt, responseObj, requestArgs, requestId) {
                var bagDetailOut= new Array();
                var fireBTEvent=false
                var localPath=document.location.pathname;                                                                                                                               
                                                                   
                
                //console.log('Analytics: Got RPC:RESULT ', responseObj, requestArgs, requestId);

                var requestMethod = requestArgs.method;
                //console.log(requestArgs.method);
                if ( !responseObj || !responseObj.responseText ) {
                    return false;
                }

                var myRpcResponse;
                var rpcResponseArray = $.parseJSON(responseObj.responseText);
                if ($.isArray(rpcResponseArray)) {
                    for (var j=0, jlen=rpcResponseArray.length; j<jlen; j++) {
                        if (rpcResponseArray[j].id == requestId) {
                            myRpcResponse = rpcResponseArray[j];
                            break;
                        }
                    }
//console.log("json response",rpcResponseArray, rpcResponseArray[0].result.value.transaction.order.items[0].prod);

                    if (myRpcResponse && myRpcResponse.result != null) {
                        //console.log("requestmethod ", requestMethod,requestArgs,myRpcResponse);
                        
                        
                        //insert
                        if (typeof requestArgs.params !== 'undefined'){
                                        if (typeof requestArgs.params[0] != 'undefined'){
                                              if (requestArgs.params[0]['_SUBMIT']=='email_signup'){                                                  
                                                  fireEmailSignup = true;                                                                                              
                                        	  } 
                                        	
                                        	
                                            if ((requestArgs.params[0]['_SUBMIT']=='cart' || requestArgs.params[0]['_SUBMIT']=='alter_replenishment') && requestArgs.method != "logic.checkout--viewcart"){
                                                resultObj = myRpcResponse.result.data.ac_results[0].result.CARTITEM;
                                                
                                                //console.log("BT was a cart RPC: ",requestArgs.params[0]); 
                                                //console.log("Result object", resultObj);
                                                
                                                bagDetailOut['cartInc'] = requestArgs.params[0]['INCREMENT'];
                                                bagDetailOut['cartIncQty'] = requestArgs.params[0]['QTY']; //to in by, not total
                                                bagDetailOut['cartQty'] = resultObj['ITEM_QUANTITY'];
                                                bagDetailOut['itemName'] = resultObj['prod.PROD_RGN_NAME'] +' '+resultObj['prod.PROD_RGN_SUBHEADING'];
                                                
                                                product_key = resultObj['prod.PRODUCT_KEY'].replace('"','');
                                                catprod = product_key.split("~");                                                
                                                bagDetailOut['itemCat']=catprod[0];
                                                bagDetailOut['itemProd']= catprod[1];
                                                
                                                //console.log ("BT RESULT detail ",resultObj);
                                                
                                                fireBTEvent=true;    
                                            }
                                            
                                            
                                        }
                                    }
                         if (requestArgs.method == "logic.checkout--viewcart"){
                             
                              if (typeof rpcResponseArray[0].result.value.transaction.order.items[0] != 'undefined'){
                                 var prodObj = rpcResponseArray[0].result.value.transaction.order.items[0].prod;
                                 //console.log("Prod obj",prodObj,typeof prodObj);
                                 bagDetailOut['cartInc'] = requestArgs.params[0].QTY;
                                 bagDetailOut['itemProd'] = prodObj.PRODUCT_ID;
                                 bagDetailOut['itemName'] = prodObj.PROD_RGN_NAME;
                                 fireBTEvent=true;
                                 
                              }     
                                                             
                             
                         }
                        //insert
                        
                        
                        
                    }
                }
                
           if (fireBTEvent==true){
              setCartCookie('btcartcookie');  //if this exists it is now out of date. 
              jQuery(window).trigger("BTCARTALTER", [bagDetailOut]);
              //console.log("BT, sent to ARGS ",bagDetailOut);
          }

});
 
 
/* MPP/SPP Data */

var btRemoveLinks = jQuery("a[id^=remove_]");
btRemoveLinks = btRemoveLinks.get();
if ( typeof btRemoveLinks !== 'undefined'){
    jQuery.each(btRemoveLinks,function(ids,thisid){      
	    //console.log("bound ",thisid);
	    jQuery(thisid).bind("click",function(obj){		
		    //console.log("clicked delete");
            jQuery(window).trigger("VIEWCART:DELETELINK", [obj.memo]);
	    });	
    });
}



/*
NOTE do this with cookies on one page EF
jQuery('#offer_code').bind("submit", function(e){
     var btOfferInput = jQuery("input[id=form--offer_code--field--OFFER_CODE]")[0].value;
     jQuery(window).trigger("VIEWCART:OFFER", [btOfferInput]); 
     console.log("btoffer ",btOfferInput);
     e.preventDefault();     
     var myform = this;
     setTimeout(function(){myform.submit();}, 500);     
});
*/


function btProductNameFromIDCustomMPP(prodid){
    //console.log("prodid",prodid);
    var finalId = "";
    
    if ( page_data['custom-mpp'] ) {
        jQuery.each(page_data['custom-mpp'].products, function(idx, oneproduct){
            //console.log("product input/current ",prodid,oneproduct);
         
            if (oneproduct.PRODUCT_ID==prodid){
                finalId = oneproduct.PROD_RGN_NAME + ' ' +oneproduct.PROD_RGN_SUBHEADING;
                return;
            }
        });
    }

    return finalId;
}

function btProductNameFromID(prodid){
    //console.log("prodid",prodid);
    var finalId = "";
  jQuery.each(page_data['catalog-mpp'].categories,function(ids,prod){
    
    if (typeof prod == 'object'){
    
      jQuery.each(prod.products,function(idx,oneproduct){
         //console.log("product input/current ",prodid,oneproduct);
         
        if (oneproduct.PRODUCT_ID==prodid){
           finalId = oneproduct.PROD_RGN_NAME + ' ' +oneproduct.PROD_RGN_SUBHEADING;
           return;
        }
    
      });
      
    }
    
    
    
  });
    return finalId;
}


function btProductNameFromSPPID(prodid){
    var finalId = "";
    
  jQuery.each(page_data.catalog.spp.recommendedProducts.rpcdata.products,function(ids,prod){
    
    if (typeof prod == 'object'){
    
      //prod.products.each(function(oneproduct){
         //console.log("product input/current ",prodid,oneproduct);
         
        if (prod.PRODUCT_ID==prodid){
           finalId = prod.PROD_RGN_NAME;
           return;
        }
    
      //});
      
    }
    
    
    
  });
    return finalId;
}


function getNestedObj(path) {
  var parts = path.split('.');
  var obj = window;
  
  for (var i = 0; i < parts.length; i++) {
    if (! Object.prototype.hasOwnProperty.call(obj,parts[i]) ) {
      return false;
    }
    obj = obj[parts[i]];
  }
  return obj;
}

function btProductNameFromCartID (prodid) {
    var prodname = '';

    /* viewcart - multipage checkout */
    var prods = getNestedObj('page_data.checkout.viewcart.recommendedProducts.rpcdata.products');
    
    if (prods === false) {
        /* viewcart - one page checkout */
        prods = getNestedObj('page_data.data.recommendedProducts.products');
    }
    
    if (prods !== false) {
        for (var i=0; i < prods.length; i++) {
            if (prods[i].PRODUCT_ID == prodid) {
                prodname = prods[i].PROD_RGN_NAME;
                return prodname;
            }
        }
    }

    return prodname;
}

function btProductNameFromCartID_old(prodid){
    var finalId = "";

  //page_data.catalog.spp.recommendedProducts.rpcdata.products.each(function(prod){
  if ( typeof page_data.checkout != 'undefined') {
    jQuery.each(page_data.checkout.viewcart.recommendedProducts.rpcdata.products,function(ids,prod){     
    
      if (typeof prod == 'object'){
    
         //prod.products.each(function(oneproduct){
         //console.log("product name ",prod.PROD_RGN_NAME);
         
         if (prod.PRODUCT_ID==prodid){
           finalId = prod.PROD_RGN_NAME;
           return;
         }
    
      //});
      
      }
    
    });
  }
    return finalId;
}


/* Adobe ViewCart Events */ 

// if (bt_cookie("mode")=="debug") {
//   to enable, enter this in the console:   document.cookie = "mode=debug";
  
 $( document ).ready(function() {
    
      if ( !window.document.location.pathname.match("checkout/viewcart.tmpl") && !window.document.location.pathname.match("/checkout/review.tmpl")) {
      return 0;
      }    
      
    viewCartCheck();
    setCartCookie();
});



function viewCartCheck(){
    
    
  if (typeof tms_page_data.tms_product_lists == 'undefined'){
          return;
      }
      
      tms_page_data.tms_page_info['btwrite'] = new Array();
      var oldCart = read_cookie('btcartcookie');
      
      
      if(oldCart != 0 && oldCart) {
        oldCartList = oldCart.split("q");
        oldSkuString = oldCartList[0];
        oldQtyString = oldCartList[1]; 
        oldQtyList = oldQtyString.split("z");
        oldSkuList = oldSkuString.split("z");
        ////console.log("old qty ", oldQtyList, " oldSku ", oldSkuList);
        var oldCartContents = new Object();
        for(var i=0;i< oldSkuList.length;i++){       
           oldCartContents[oldSkuList[i]]=oldQtyList[i];
           oldCartContentsCount++;
        }
        var newCartContents = new Object();
        if (typeof tms_page_data.tms_product_lists.SkuIdList != "undefined"){
          for (i=0; i <= Object.keys(tms_page_data.tms_product_lists.SkuIdList).length; i++){
             cartItem = tms_page_data.tms_cart_items[i];
             if (cartItem){
                newCartContents[tms_page_data.tms_product_lists.SkuIdList[i]]=cartItem;
                newCartContentsCount++;     
             }
          }
        
      }
    }
      
    cartContents = makeCartCookie();
    //console.log("old Cart ",oldCart, "New ",cartContents);
    //now we have both old and new, compare
    if(oldCart) {
      if(oldCart != cartContents) {
        bagDetailOut = new Array();  
        bagDetailOut['scAdd']= new Array();
        bagDetailOut['scRemove']= new Array();
        
        if (s.c_r('bagDel') != 'noremove'){           
           var delProdInfo = s.cvr(s.c_r('bagDel'));
           
           s.c_w('bagDel','noremove');
           console.log("TRIGGER DEL",delProdInfo);          
           
          
           
           
           if (typeof delProdInfo == 'Object'){
              if (typeof delProdInfo.productID != 'undefined'){                  
                  bagDetailOut['scRemove'].push(delProdInfo);
                  tms_page_data.tms_page_info.btwrite = bagDetailOut;
                  console.log("BAG RM detail", bagDetailOut);
                  jQuery(window).trigger("VIEWCART:DELETELINK",[]);
                  console.log("fire DEL");                  
              }            
           }
           
           /* jQuery(window).trigger("VIEWCART:DELETELINK",[]); */
       }  
        
        // final check for differences
        // which one has more skus??? 
        var cartSkuList = new Array();
        //console.log(" old/new ",oldCartContentsCount,newCartContentsCount );
        
        if ( oldCartContentsCount > newCartContentsCount){
             cartSkuList =  Object.keys(oldCartContents);   
           //console.log("old list, item removed or qty change");
        }else if (oldCartContentsCount <= newCartContentsCount  ){ 
            if (typeof newCartContens == 'Object'){
        	 cartSkuList = Object.keys(newCartContents);
            } 
             //console.log("new list, item added");
        }else{
             // shouldn't ever get here
             //console.log("no change - should not be here"); 
        }
        
        //console.log("CART SKU LIST",typeof cartSkuList);
        for (var i = 0; i < cartSkuList.length; i++) { 
            var sku = cartSkuList[i];
          if(sku) {
                
                // check for remove
                if (oldCartContents[sku] && !newCartContents[sku] && typeof newCartContents[sku] != 'undefined'){ 
                	 ////console.log("REMOVE ",sku);
                     newCartContents[sku]['del'] = oldCartContents[sku] - newCartContents[sku]['productQuantity']; 
                     bagDetailOut['scRemove'].push(oldCartContents[sku]);
                     //return true; //skip qty check
                // check for add	
                }else if (newCartContents[sku] && !oldCartContents[sku]){
                	 ////console.log("ADD ", sku);
                     // no way to add a qty of more than one, at the same time as adding an new product on any site
                     newCartContents[sku]['add'] = 1;
                     bagDetailOut['scAdd'].push(newCartContents[sku]);
                     //return true; // skip
                	
                }        
          	     // check for qty change        
                 //console.log("QTYs Old ",oldCartContents[sku],"New ", newCartContents[sku]['productQuantity']);  
                 
            if (typeof  oldCartContents[sku] != 'undefined' &&  typeof newCartContents[sku] != 'undefined'){
                
                if ( oldCartContents[sku] == newCartContents[sku]['productQuantity']){
                     // nothing same as before
                }else if (oldCartContents[sku] > newCartContents[sku]['productQuantity']){
                  	  //console.log("QTY diff ", oldCartContents[sku], newCartContents[sku]['productQuantity'], sku);
                      newCartContents[sku]['del'] = oldCartContents[sku] - newCartContents[sku]['productQuantity'];           
                      bagDetailOut['scRemove'].push(newCartContents[sku]);    
                          
                }else if (oldCartContents[sku] < newCartContents[sku]['productQuantity']){
                	  //console.log("QTY diff ", oldCartContents[sku], newCartContents[sku]['productQuantity'], sku); 
                      newCartContents[sku]['add'] = newCartContents[sku]['productQuantity'] - oldCartContents[sku];
                      bagDetailOut['scAdd'].push(newCartContents[sku]);
                }else{            	    	
                	//console.log("no qty change");
                }
            }    
                
          }     	
                  
        }
        
        window.BTCARTVIEWALTER = true;
        tms_page_data.tms_page_info.btwrite = bagDetailOut; // our output for this whole thing
        //console.log("BT ",bagDetailOut);
        del_cookie('btcartcookie');
      }
    }   
    
}

function setCartCookie() {
  myhost = window.location.host;
  document.cookie = 'btcartcookie=' + cartContents + '; expires=Thu, 2 Aug 2031 20:47:11 UTC; path=/;domain=' + myhost
}

function del_cookie(name) {
  domain = window.location.host;
  var expiration = "Thu, 01-Jan-1970 00:00:01 GMT";
  document.cookie = name + "=/" + domain + ";expires=" + expiration;
}
//from Jquery
function read_cookie(key) {
  var result;
  return(result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)')
    .exec(document.cookie)) ? (result[1]) : null;
}

function makeCartCookie(){
    if (typeof tms_page_data.tms_product_lists.SkuIdList != "undefined"){
      for (i=0; i <= Object.keys(tms_page_data.tms_product_lists.SkuIdList).length; i++){          
      var sku = tms_page_data.tms_product_lists.SkuIdList[i];      
        if(sku) {
          cartContents = cartContents + sku + 'z';        	
          }      
      }
    }else{
      return 0;   
    }
    //console.log("cart contents ",cartContents);
    //cartContents.slice(0, -1);
    cartContents = cartContents.substring(0, cartContents.length - 1);
    //console.log("cart contents ",cartContents);
    //console.log("old sku list",oldSkuList);
    
    cartContents = cartContents + 'q';
    for (i=0; i <= Object.keys(tms_page_data.tms_product_lists.productPriceQty).length; i++){ 
      var qty = tms_page_data.tms_product_lists.productPriceQty[i]
      if(qty) {
        cartContents = cartContents + qty + 'z';
      }
    }
    //cartContents.slice(0, -1);
    cartContents = cartContents.substring(0, cartContents.length - 1);
    return cartContents;
}





/* Util Update */ 


function deliminateListNew(_arraything, _deliminator) {
    if (typeof _arraything != 'Array'){
        _arraything = Array.prototype.slice.call(_arraything);   
    }
    return _arraything.join(_deliminator)
}

function completedCartListNew(){
  var orderline='';
  oc = tms_page_data.tms_order_items;
  jQuery.each(oc,function(ids,ci){
    /* leave out collection fake product ids */ 
    if ( typeof ci.productID == 'string' ){ 
      orderline = orderline+ ',;' + ci.productID +';'+ ci.productQuantity + ';' + ci.productPrice * ci.productQuantity;
     }
    return orderline;
  });
  orderline = orderline + getCollectionProducts();
  orderline = orderline + getGiftCards();
  
  orderline = decodeURIComponent(orderline);    
 
  return orderline;    
}

function currentCartListNew(){
    
  var productline='';
  if (typeof tms_page_data.tms_cart_items =="undefined"){
     return;   
  }
  var oc = tms_page_data.tms_cart_items;
  jQuery.each(oc,function(ids,ci){
     /* leave out collection fake product ids */ 
     if ( typeof ci.productID == 'string' ){ 
       productline = productline+ ',;' + ci.productID +';'+ ci.productQuantity + ';' + (ci.productPrice * ci.productQuantity);
     }
    
    return productline;
  }); 
  productline = productline + getCollectionProducts();
  productline = productline + getGiftCards();
  
  productline = decodeURIComponent(productline);    
 
  return productline;    
    
}

function getCollectionProducts(){
    console.log("called collectin products");
    if ( typeof tms_page_data.tms_collections !== 'undefined' || jQuery.isEmptyObject(tms_page_data.tms_collections) !== 'true'){
        var productline = '';
        var counter = 0;
        jQuery.each(tms_page_data.tms_collections,function(ids,kit){
        	if (typeof kit.COLLECTION_NAME !== 'undefined'){        		
                console.log(counter++);
            	var collection_TypeSubType = kit.COLLECTION_TYPE + ' : '+kit.COLLECTION_SUBTYPE;   	
            	kit.COLLECTION_PRODUCTS.each(function(prod){
            		  if (typeof prod['PRODUCT_ID'] !== 'undefined'){
        	          console.log(prod.QTY, prod.PRICE, prod['PRODUCT_ID']);	 
        	          productline = productline+ ',;' + prod['PRODUCT_ID'] +';'+ prod.QTY + ';' + prod.PRICE * prod.QTY + ';;evar13=' +kit.COLLECTION_NAME+ '|evar14='+collection_TypeSubType
        	        }        	    
        	    })	        	    
          }
      });    
    }
    return productline;
}

function getGiftCards(){
	var productline = '';
    if ( typeof tms_page_data.tms_giftcards !== 'undefined' || jQuery.isEmptyObject(tms_page_data.tms_giftcards) !== 'true'){
    	
        jQuery.each(tms_page_data.tms_giftcards,function(ids,card){        	
        	productline = productline+ ',;' + card.product_id +';'+ card.qty + ';' + card.price * card.qty
        	console.log("gift line", productline)
        });    
    }
    return productline;
}

/* New functions to bring DBE that fill/relate to s.products into one place, this lib. */

function adobeProductsViewCartAdd() {

    retval="";
  if (typeof tms_page_data.tms_page_info.btwrite['scAdd'] != 'undefined'){
    localData = tms_page_data.tms_page_info.btwrite['scAdd'];
    for(var i=0;i< localData.length;i++){  
      retval = retval + ';'+localData[i]['productID']+';'+localData[i]['add']+','    
    };
    return retval;     
  }else{
    return false;
  }

}

function adobeProductsViewCartRemove() {
    retval="";
  if (typeof tms_page_data.tms_page_info.btwrite['scRemove'] != 'undefined'){
    localData = tms_page_data.tms_page_info.btwrite['scRemove'];
    for(var i=0;i< localData.length;i++){  
      retval = retval + ';'+localData[i]['productID']+';'+localData[i]['del']+','    
    };
    return retval;     
  }else{
    return false;
  }
 
}


function getCollectionProductsDebug(){
    console.log("called collectin products");
    if ( typeof tms_page_data.tms_collections !== 'undefined'){
        var productline = 0;
        var counter = 0;
        jQuery.forEach(tms_page_data.tms_collections,function(idx,kit){
            if (typeof kit.COLLECTION_NAME !== 'undefined'){        		                
            	var collection_TypeSubType = kit.COLLECTION_TYPE + ' : '+kit.COLLECTION_SUBTYPE;   	
            	kit.COLLECTION_PRODUCTS.forEach(function(prod){
            		  if (typeof prod['PRODUCT_ID'] !== 'undefined'){        	          	 
        	          productline = parseFloat(productline) + parseFloat(prod.PRICE * prod.QTY);
        	        }        	    
        	    })	        	    
          }
      });    
    }
    return productline;
}

function getGiftCardsDebug(){
	var productline = 0;
    if ( typeof tms_page_data.tms_giftcards !== 'undefined'){
    	
        jQuery.forEach(tms_page_data.tms_giftcards,function(ids,card){        	
        	productline = productline+ ',;' + card.product_id +';'+ card.qty + ';' + card.price * card.qty
        	productline = parseFloat(productline) + parseFloat(card.price * card.qty);        	
        });    
    }
    return productline;
}

function completedCartListDebug(){
  var orderline=0;
  
  tms_page_data.tms_order_items.forEach(function(ci){
    /* leave out collection fake product ids */ 
    if ( typeof ci.productID == 'string' ){ 
      orderline = parseFloat(orderline) + parseFloat(ci.productPrice * ci.productQuantity);      
     }
    return orderline;
  });
  orderline = orderline + getCollectionProductsDebug();
  orderline = orderline + getGiftCardsDebug();
  
  orderline = decodeURIComponent(orderline);    
  return orderline;    
}
