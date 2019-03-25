$( document ).ready(function() {
	var contextPath="/findthecode";
	
	String.prototype.hashCode = function() {
	  var hash = 0, i, chr;
	  if (this.length === 0) return hash;
	  for (i = 0; i < this.length; i++) {
		chr   = this.charCodeAt(i);
		hash  = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	  }
	  return hash>=0?hash:-hash;
	};
	
	
	var code_validation = function(code){
		code = $.trim(code.toLowerCase()).hashCode();
		console.log(code);
		$('#verification-popup').on('shown.bs.modal', function() {
			$(this).find('iframe').attr('src','./codes/'+code+".html");
		}) 
				
		
		$('#verification-popup').modal();
	}
	
	var website_secret = function(secret){
	
		var audio = new Audio(contextPath+'/secrets/zelda_secret_sound.mp3');
		audio.play();				
		gtag('set', { 'secret': secret });
		$('#secret-popup').modal();
	}
	
    $("#test-the-code").click(function(){
		code_validation($("#my-code").val());
	});
	
	$("#reveal-the-code").click(function(){
		var solution = $("#solution").val();
		$("#put-the-code-here").html(solution);
		$("#reveal-popup").modal();
	})
	
	$(".indication").click(function(){
		$(this).parent().parent().find("img").attr("src",$(this).attr("replacement"));
				$(this).hide();
	})
	
	$(".language").click(function(){
		var language = $(this).attr("id");
		console.log("click language : "+language);
		sessionStorage.setItem('language', language);
		changeLanguage(language);
	});
	
	$("#i").click(function(){
		website_secret("paris");
	});

	var defaultLanguage = function(){
		var language = navigator.language || navigator.userLanguage; 
		language=language.split('-')[0];
		return language;
	}
	
	var initLanguage = function(){
		var language = sessionStorage.getItem("language");
		console.log("session language: "+language);
		if(!language){
			language = defaultLanguage();
			console.log("browser language: "+language);
			sessionStorage.setItem('language', language);
		}
		changeLanguage(language);
		
	}
	
	$('#my-code').keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			code_validation($("#my-code").val());
			event.preventDefault();
		}
	});
		

	var k = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
	n = 0;
	$(document).keydown(function (e) {
		if (e.keyCode === k[n++]) {
			if (n === k.length) {
				website_secret("konami");
				n = 0;
				return false;
			}
		}
		else {
			n = 0;
		}
	});
	
	function AdjustIframeHeightOnLoad() { document.getElementById("form-iframe").style.height = document.getElementById("form-iframe").contentWindow.document.body.scrollHeight + "px"; }
	function AdjustIframeHeight(i) { document.getElementById("form-iframe").style.height = parseInt(i) + "px"; }

	
	var changeLanguage = function(language){
		
		console.log("change language to: "+language);
		
		$("#selected-language").attr("src",language+".png");
		
		jQuery.i18n.properties({
		path:contextPath+'/bundle/',
		mode:'both',
  		name: 'Messages',
		language: language, 
		async: true,
		callback: function() { 
			$("[i18n]").each(function(){
				$(this).text($.i18n.prop($(this).attr("i18n"))); 
			}) 
			}
	});
	}
	
	initLanguage();
	
	$('iframe').iFrameResize( [{options}] );

	
	
});