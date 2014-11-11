;(function ($){

	$.fn.waffly = function( options ){

		// let's establish our default options
		var $dots, obj, animation, rvalue, gvalue, def_bg, opacity_style, dot_styles, dot_width, settings = $.extend({
			class_name: 'waffly',
			style_override: false,
			default_color: '',
			false_neg: 3,
			true_pos: 8,
			false_pos: 99,
			graph_font: 'arial, sans-serif',
			graph_title_color: '#666',
			graph_color1: '#a1aCFF',
			graph_color2: '#0033cc',
			graph_color3: '#a0a0a0',
			graph_color4: '#d0d0d0',
			graph_margin: '30px',
			graph_class:'color1',
			total_dots: 1000,
			graph_width: 250,
			dot_row:10,
			dot_gap:3,
			dot_radius:'20%',
			dot_opacity:0,
			graph_reverse: false,
			graph_animate: true
		}, options);


		this.each(function() {

			/**
			 * Dot is used as decimal mark
			 
			if ( $(this).data('waffly-value') ){

				settings.graph_1 = $(this).data('waffly-value')[0].replace(',','.');
				settings.graph_2 = $(this).data('waffly-value')[1].replace(',','.');
				settings.graph_3 = $(this).data('waffly-value')[2].replace(',','.');

			} else {
				settings.graph_1 = settings.graph_1.replace(',','.');
				settings.graph_2 = settings.graph_2.replace(',','.');
				settings.graph_3 = settings.graph_3.replace(',','.');

			}
	*/
			settings.graph_1 = settings.false_neg;
			settings.graph_2 = settings.false_neg + settings.true_pos;
			settings.graph_3 = settings.false_neg + settings.true_pos + settings.false_pos;

			/**
			 * The percent value is rounded if necessary to keep the number of digits to appear after the decimal point lower than 3 digits
			 */
			/* 
			if ( settings.graph_1.indexOf('.') > -1 ){
				gvalue = settings.graph_1.split('.');

				if ( gvalue[1].length > 3 ){
					settings.graph_1 = parseFloat(settings.graph_1).toFixed(2) + '%';
				}
			}
			
			if ( settings.graph_2.indexOf('.') > -1 ){
				gvalue = settings.graph_2.split('.');

				if ( gvalue[1].length > 3 ){
					settings.graph_2 = parseFloat(settings.graph_2).toFixed(2) + '%';
				}
			}
			
			if ( settings.graph_3.indexOf('.') > -1 ){
				gvalue = settings.graph_3.split('.');

				if ( gvalue[1].length > 3 ){
					settings.graph_3 = parseFloat(settings.graph_3).toFixed(2) + '%';
				}
			} */
/*

			if ( settings.style_override ){

				obj = '<div class="' + settings.class_name + '">';


				obj += '<div class="waffly_value" >' + settings.graph_4 + '</div>';

				obj += '<ul class="waffly_dots">';


				for (var i = 0; i < settings.total_dots; i++) {
								
					
					if (i + 1 < parseInt(settings.graph_4) ) {
							obj += '<li class="waffly_dot d' + (i+1) + ' ' + 'waffly_color1' + '"></li>';

					} else {
						obj += '<li class="waffly_dot d' + (i+1) +'"></li>';
					}

				};
				
				obj += '</ul>';

				if ( $(this).data('waffly-title') ){

					obj += '<div class="waffly_title">' + $(this).data('waffly-title') + '</div>';

				}

				obj += '</div>';

			} else {
*/
				obj = '<div class="' + settings.class_name + '" style="-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;font-family:' + settings.graph_font + ';padding:' + settings.graph_margin + ';width:' + settings.graph_width + 'px;" title="' + $(this).text() + '">';


				obj += '<div class="waffly_value" style="color:' + settings.graph_color2 + ';font-size:2.5em;font-weight:bold;margin:.5em 0 .25em;text-align:center">Results</div>';


				dot_width = Math.floor( ( (settings.graph_width - ( ( parseInt(settings.graph_margin) )*2 )  ) - ( (settings.dot_row-1) * settings.dot_gap) ) / settings.dot_row );

				obj += '<ul class="waffly_dots" style="font-size:0;list-style:none;margin:0;padding:0;">';

				dot_styles = 'border-radius:' + settings.dot_radius + ';display:inline-block;height:' + dot_width + 'px;margin:0 ' + settings.dot_gap + 'px ' + settings.dot_gap + 'px 0;width:' + dot_width + 'px;';

				opacity_styles ='';
				if ( settings.default_color === '' ){

					def_bg = '#222';

					opacity_styles += "-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=" + ( settings.dot_opacity * 100 ) + ")';" + 'filter: alpha(opacity=' + ( settings.dot_opacity * 100 ) + ');-moz-opacity: ' + settings.dot_opacity + ';-khtml-opacity: ' + settings.dot_opacity + ';opacity:' + settings.dot_opacity + ';';

				} else{

					def_bg = settings.default_color;

				}


				for (var i = 0; i < settings.total_dots; i++) {

					if ( i < parseInt(settings.graph_1 ) ) {
					
						if (settings.graph_animate){
							obj += '<li class="waffly_dot d' + (i+1) + ' ' + 'color1' + '" title="False negatives (have disease)" style="background:' + settings.graph_color1 + ';' + dot_styles + opacity_styles + '"></li>';
						} else {
							obj += '<li class="waffly_dot d' + (i+1) + ' ' + 'color1' + '" title="False negatives (have disease)" style="background:' + settings.graph_color1 + ';' + dot_styles + '"></li>';
						}

					} 
					else if ( i < parseInt(settings.graph_2) ) {
					
						if (settings.graph_animate){
							obj += '<li class="waffly_dot d' + (i+1) + ' ' + 'color2' + '" title="True positives (have disease)"  style="background:' + settings.graph_color2 + ';' + dot_styles + opacity_styles + '"></li>';
						} else {
							obj += '<li class="waffly_dot d' + (i+1) + ' ' + 'color2' + '" title="True positives (have disease)" style="background:' + settings.graph_color2 + ';' + dot_styles + '"></li>';
							}
						}
						
					else if ( i < parseInt(settings.graph_3) ) {
					
						if (settings.graph_animate){
							obj += '<li class="waffly_dot d' + (i+1) + ' ' + 'color3' + '" title="False positives (don\'t have disease)" style="background:' +  settings.graph_color3 + ';' + dot_styles + opacity_styles + '"></li>';
						} else {
							obj += '<li class="waffly_dot d' + (i+1) + ' ' + 'color3' + '" title="False positives (don\'t have disease)" style="background:' + settings.graph_color3 + ';' + dot_styles + '"></li>';
						}

					}
					
					
					else if (settings.graph_animate){
							obj += '<li class="waffly_dot d' + (i+1) + ' ' + 'color4' + '" title="True negatives (don\'t have disease)" style="background:' +  settings.graph_color4 + ';' + dot_styles + opacity_styles + '"></li>';
						} else {
						obj += '<li class="waffly_dot d' + (i+1) +'" title="True negatives (don\'t have disease)" style="background:' + settings.graph_color4 + ';' + dot_styles + '"></li>';
					}

				};

				obj += '</ul>';

				if ( $(this).data('waffly-title') ){

					obj += '<div class="waffly_title" style="color:' + settings.graph_title_color + ';margin-top:.75em;text-align:center"></div>';

				}

				obj += '</div>';

			/*}*/

			$(this).html( obj );

			if (settings.graph_reverse){

					$(this).find('.waffly_dots').append( $(this).find('.waffly_dot').get().reverse() );

			}

			/**
			 * Animation
			 */

			if (settings.graph_animate){

				if ( settings.style_override ){
					$dots = $(this).find('.waffly_dot');
					if (settings.graph_reverse){

						$dots.each(function(index,el) {

							setTimeout(function(){
								$dots.eq( Math.abs(index - $dots.length + 1 ) ).addClass('color3');
							},500 + (index*20));

						});

					} else {

						$dots.each(function(index,el) {

							setTimeout(function(){
								$(el).addClass('color3');
							},500 + (index*20));

						});

					}

				} else {

					$dots = $(this).find('.waffly_dot');

					if (settings.graph_reverse){


						$dots.each(function(index,el) {
							var $dot = $dots.eq( Math.abs(index - $dots.length + 1 ) );

							setTimeout(function(){
								$dot.animate({'opacity': 1}, 10);
							},500 + (index*20));

						});

					} else {

						$dots.each(function(index,el) {

							setTimeout(function(){
								$(el).animate({'opacity': 1}, 10);
							},500 + (index*20));

						});

					}

				}

			}



		});

		return this;

	};

}(jQuery));