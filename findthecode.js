$( document ).ready(function() {
	String.prototype.hashCode = function() {
	  var hash = 0, i, chr;
	  if (this.length === 0) return hash;
	  for (i = 0; i < this.length; i++) {
		chr   = this.charCodeAt(i);
		hash  = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	  }
	  return hash;
	};
	
	
    $("#test-the-code").click(function(){
		var mycode = $("#my-code").val();
		var solution = $("#solution").val();
		
			console.log(solution);
			console.log(mycode.toLowerCase().hashCode());
			
		if(solution==mycode.toLowerCase().hashCode()){
			$(".success").show();
			$(".failure").hide();
		} else {
			$(".success").hide();
			$(".failure").show();
		}
		
		$('#verification-popup').modal();
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

		console.log("change language")
		$("#selected-language").attr("src",$(this).attr("id")+".png");
	});
	
	jQuery.i18n.properties({
		path:'bundle/',
		mode:'both',
  		name: 'Messages',
		async: true,
		callback: function() { 
			$(".i18n").each(function(){
				
				window.alert($(this).attr("i18n"));
				$(this).text($.i18n.prop($(this).attr("i18n"))); 
			}) 
			}
	});
});