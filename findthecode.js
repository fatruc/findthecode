$( document ).ready(function() {
    $("#test-the-code").click(function(){
		var mycode = $("#my-code").val();
		var solution = $("#solution").val();
		
		if(solution===mycode){
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
			$("i18n").each(function(){
				$(this).text($.i18n.prop($(this).attr("i18n"))); 
			}) 
			}
	});
});