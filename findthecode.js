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
		ga('send', 'pageview', "secrets/"+secret+".html");
		$('#secret-popup').modal({backdrop:"static"});
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
		} else{
			console.log($(this).val());
			myKeyboard.setInput($(this).val());
		}
	});
		
	$('#my-code').keyup(function(event){

			console.log($(this).val());
			myKeyboard.setInput($(this).val());
		
	});

	var k = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
	n = 0;
	
	var keydown = function(keyCode){
		if (keyCode === k[n++]) {
			if (n === k.length) {
				website_secret("konami");
				n = 0;
				return false;
			}
		}
		else {
			n = 0;
		}
	}
	
	$(document).keydown(function (e) {
		keydown(e.keyCode);
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
				$("[i18n-attr]").each(function(){
					var attr_name=$(this).attr("i18n-attr");
					$(this).attr(attr_name,$.i18n.prop($(this).attr("i18n-key")));

				}) 
			}
	});
	}
	
	initLanguage();
	
	let Keyboard = window.SimpleKeyboard.default;

	let commonKeyboardOptions = {
	  onChange: input => onChange(input),
	  onKeyPress: button => onKeyPress(button),
	    layout: {
    default: [
      "1 2 3 4 5 6 7 8 9 0 {arrowup}",
      "q w e r t y u i o p {arrowleft}",
      "a s d f g h j k l {arrowdown}",
      "z x c v b n m  {arrowright}" 
      
		]}
	};



	let myKeyboard = new Keyboard({...commonKeyboardOptions});



	function onChange(input) {
	  document.querySelector("#my-code").value = input;
	  console.log("Input changed", input);
	}

	function onKeyPress(button) {
	  console.log("Button pressed", button);
	  if(button=="{arrowup}"){
		keydown(38);
	  } else if(button=="{arrowdown}"){
		  keydown(40);
	  } else if(button=="{arrowleft}") {
		keydown(37);  
	  }else if(button=="{arrowright}") {
		keydown(39);  
	  }else if(button=="b") {
		keydown(66);  
	  }else if(button=="a") {
		keydown(65);  
	  } else {
		  keydown(0);  
	  }
	}

	$("#toggle-keyboard").click(function(){
		$("#virtual-keyboard").toggle();
	});
	

	
	
});