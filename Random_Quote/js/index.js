$(document).ready(function(){
	//调用api
  
	var content="";
	var author="";
	var getQuote = function(){
   $.ajax({
    headers: {
      "X-Mashape-Key": "7UcdSfdNvemshC3Jvtbd711RRC4cp1HZ8Jejsnyg1e4TJRTabX",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies&count=1',
    type: 'GET',     // 请求类型，常用的有 GET 和 POST
    success: function(d) {       
      
      content = d.quote;
      author = d.author;
      $(".quote-content").html(content);
		    $(".quote-author").html("——"+author);
      $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=MovieQuote&related=freecodecamp&text=' + encodeURIComponent('"' + content + '" ' + author));

    }
});
    
  }
		
	getQuote();
	$(".btn_next").on("click",function(){ 
    
    $("body").css("background-color",`#${(Math.random()*0xFFFFFF<<0).toString(16)}`);
  
		getQuote();
	});

});