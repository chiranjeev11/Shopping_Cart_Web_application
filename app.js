$(document).ready(function(){

			class shopping_site{

				constructor() {

					var subtotal = 0;
					this.subtotal = subtotal;
					var delivery = 2;
					this.delivery = delivery;
					var total = 0;
					this.total = total;
					var win_height = $(window).outerHeight()-57;
					$('#cart').css('height',win_height)
					$('#cartitem').css('height',win_height-300);

					var t = '₹' + this.delivery;
					$('#delivery_').text(t)

					$('#total_price').hide();

					// Show items on the page
					var items_info_arr = [ ['Nike', 'Flex Experience Run 9 Running Shoes', '₹200'], ['Addidas', 'Addidas is all In', '₹500'] ];
					var c = 20;
					var i = 0;
					while (c) {
						$(items_info_arr).each(function(index,element){
							
							var txt = `<div class="card item p-3" data-product_id="${(i+1)}" style="width: 20rem;border:none;">
										<img src="product images/product_image_${(i%7+1)}.jpg" style="height: 14rem;">
										<pre class="d-none">1</pre>
											<div class="card-body pb-1">
												<h5 class="text-center mt-n3" style="font-family: "Josefin Slab", serif;"> ${element[0]}</h5>
												<h6 class="text-center" style="font-family: "Playfair Display", serif;font-size: 12px;">${element[1]}</h6>
												<p class="text-center m-0">${element[2]}</p>
											</div>
											<a href="javascript:void(0);" style="background-color: #56D3FF; color: white;" class="btn add">Add to Cart</a>
											<div class="border text-center cardcount">
												<button class="btn card_">-</button>
												<span class="px-4 count card_">1</span>
												<button class="btn card_">+</button>
											</div>
										</div>`
							$('#items').append( $(txt) )
							i++;
							c--;
						})
						
					}

					// Hide Add to cart Button
					$('.add').hide();
					$('.cardcount').hide();

					
;
					// Add to cart button animation
					$('.item').on('mouseover', function() {
						if ($(this).children('.cardcount').is(':hidden')) {
							$(this).children('img').animate({height:'11rem'},100);
							$(this).children('a').show(400);
								
						}
						
							
						})
					$('.item').on('mouseleave', function(){
						if ($(this).children('.cardcount').is(':hidden')) {
							$(this).children('a').hide(100);
							$(this).children('img').animate({height:'14rem'},400);
							
						}
						
					});
					
					var cart_items_count = 0;

					// Click on add to cart button
					$('.add').on('click', function(){
						var card_count = $(this).siblings('.cardcount');
						$(this).hide();
						$(card_count).show();
						cart_items_count += 1;
						if (cart_items_count==1) {
							$('#empty').hide();
							shopping_site_obj.sum_()
							$('#total_price').show();
						}
						$('#cartitems').children('span').text(cart_items_count);
						var brand_name = $(this).siblings('.card-body').children('h5').text();
						var item_name = $(this).siblings('.card-body').children('h6').text();
						var item_price = parseInt($(this).siblings('.card-body').children('p').text().slice(1));
						var img_src = $(this).siblings('img').attr('src');
						var product_id = $(this).parent().attr('data-product_id');
						$('#cartitem').prepend('<div class="row py-2" data-product_id="'+ product_id +'">\
													<pre class="d-none">1</pre>\
													<div class="col-4">\
														<img src="'+ img_src +'" style="height: 120px;width: 120px;">\
													</div>\
													<div class="col-8">\
														<p class="m-0 text-center">'+ brand_name +'</p>\
														<p class="m-0 text-center" style="font-size: 14px;">'+ item_name +'</p>\
														<p class="m-0 text-center pric">₹'+ item_price +'</p>\
														<div class="row ml-2">\
															<div class="border col-5 p-0 text-center cartcount">\
																<button class="btn cart_">-</button>\
																<span>1</span>\
																<button class="btn cart_">+</button>\
															</div>\
															<div class="col-6">\
																<button class="btn re" data-toggle="modal" data-target="#removeclick">Remove</button>\
															</div>\
														</div>\
													</div>\
												</div>');

						shopping_site_obj.subtotal += item_price;
						shopping_site_obj.sum_();
					})

					

					// Click on + or - button on card
					$('.card_').on('click', function() {
						var ct = parseInt($(this).parent().siblings('pre').text());
						var price = parseInt($(this).parent().siblings('.card-body').children('p').text().slice(1));
						if ($(this).text()=="+") {
							ct += 1;
						}
						else {
							ct -= 1;
						}

						
						var p_id = $(this).parent().parent().attr('data-product_id');
						var ele;
						$('#cartitem').children().each(function(index, element) {
							if ($(element).attr('data-product_id')==p_id) {
								ele = element;
								return false;
							}
						})
						if (ct==0) {
							$(ele).children('.col-8').children('.row').children('.col-6').children('button').click();
						}
						else{
							$(ele).children('.col-8').children('.row').children('.cartcount').children('span').text(ct);
							$(this).siblings('span').text(ct);
							$(this).parent().siblings('pre').text(ct);
							$(ele).children('pre').text(ct);
							if ($(this).text()=="+") {
							shopping_site_obj.subtotal += price;
							}
							else {
								shopping_site_obj.subtotal -= price;
							}
						}
						shopping_site_obj.sum_();
					})

					// Click on + or - button on cart
					$(document).on('click',".cart_", function() {
						var ct = parseInt($(this).parent().parent().parent().siblings('pre').text());
						var price = parseInt($(this).parent().parent().siblings('.pric').text().slice(1));
						if ($(this).text()=="+") {
							ct += 1;
						}
						else {
							ct -= 1;
						}
						if (ct==0) {
							$(this).parent().siblings('.col-6').children('button').click();
						}
						else{
							if ($(this).text()=="+") {
								shopping_site_obj.subtotal += price;
							}
							else {
								shopping_site_obj.subtotal -= price;
							}
							$(this).siblings('span').text(ct);
							$(this).parent().parent().parent().siblings('pre').text(ct);
							var p_id = $(this).parent().parent().parent().parent().attr('data-product_id');

							$('#items').children().each(function(index, element) {
								if ($(element).attr('data-product_id')==p_id) {
									$(element).children('pre').text(ct);
									$(element).children('.cardcount').children('span').text(ct);
									return false;
								}
							})
						}
						
						shopping_site_obj.sum_();
					})	

					// cart animation
					$('.clos').click(function() {
						if ($('#cart').css('width')!='0px'){
							$('#cart').animate({
							width: '0px'
							});
							shopping_site_obj.off_();
						}
						else {
							$('#cart').animate({
							width: '420px'
							});
							shopping_site_obj.on_();
						}

					});

					// Click remove button
					var r;
					$(document).on('click', '.re', function() {
						r = $(this);
					})

					$(document).on('click', '.remov', function(){
						var p_id = $(r).parent().parent().parent().parent().attr('data-product_id');
						var price = parseInt($(r).parent().parent().siblings('.pric').text().slice(1));
						shopping_site_obj.subtotal -= parseInt($(r).parent().parent().parent().siblings('pre').text())*price;
						console.log(shopping_site_obj.subtotal);
						$(r).parent().parent().parent().siblings('pre').text(1);
						$('#items').children().each(function(index, element) {
							if ($(element).attr('data-product_id')==p_id) {
								$(element).children('.cardcount').hide();
								$(element).children('pre').text(1);
								$(r).parent().parent().parent().parent().remove();
								return false;
							}
						})
						cart_items_count -= 1;
						$('#cartitems').children('span').text(cart_items_count);

						if (cart_items_count==0) {
							$('#total_price').hide();
							$('#empty').show();
						}

						shopping_site_obj.sum_()

					})

					$('#overlay_').on('click', function(){
						$('#cart').animate({
							width: '0px'
							});
							shopping_site_obj.off_();
					})


				}

				cart_height(){
					var win_height = $(window).outerHeight()-57;
					var win_width = $(window).outerWidth();
					$('#cart').css('height',win_height)
					$('#cartitem').css('height',win_height-300);
					// console.log(win_width);
					if (win_width<420) {
						$('#cart').css('width', win_width);
					}
					else {
						$('#cart').css('width',420);
					}
					
				}

				sum_() {
					this.total = this.subtotal + this.delivery;
					$('#subtotal_').text("₹"+this.subtotal);
					$('#total_').text("₹"+this.total);
				}

				on_(){
					$('#overlay_').css({'display':'block'});
				}
				off_(){
					$('#overlay_').css({'display':'none'});
				}
	
			}

		var shopping_site_obj = new shopping_site();
		window.onresize = shopping_site_obj.cart_height;
		})