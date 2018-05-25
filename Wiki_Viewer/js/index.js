$(document).ready(function(){
  
  
  $("#searchButton").click(wikiSearch);//click
  $("body").keypress(function (e){//press enter
			  var code = event.keyCode;
			     if (13 == code) {
			    		wikiSearch();
			     }
		});
  
  
  
  function wikiSearch() {
    $("#resultList").html('');
    var searchTerm = $("#searchText").val();
    var url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm}&format=json&callback=?`;
    $.ajax({
      type: 'GET',
      url: url,
      async: false,
      dataType: 'json',
      success: function(data){
        if (data[1]=='') {
          $("#resultList").append('<li class="text-center"><p id="noResult">No result! Please try again!</p></li>');
        } else {
          for (i=0; i<data[1].length; i++){
          $("#resultList").append(`<li><a href=${data[3][i]} target='_blank'>${data[1][i]}</a><p>${data[2][i]}</p></li>`);
           }
       }
      },
      error: function(errorMessage){
        alert('Error');
      }
      
        });
  }
  
  
});