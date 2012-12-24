
window.onload = function () {
	
	//top level package
	var NetFlics = NetFlics || {};

	//defining package
	NetFlics.getData = NetFlics.getData || {};

	NetFlics.getData.utils = {
		getMoviesByGenre: function(/*genre, quantity, orderBy*/ callback){
			var api_key = '459887bb41a3478ab3139b788b2033e4';
			var moviesByGenre;
			$.ajax({
			  //url: 'http://api.themoviedb.org/3/movie/550?api_key=459887bb41a3478ab3139b788b2033e4',
			  url: 'http://api.themoviedb.org//3/genre/'+ 10749 +'/movies?api_key='+ api_key,
			  success: function(data) {
			    moviesByGenre = JSON.parse(data);
			    alert('Load was performed.');
			    alert('title: ' + moviesByGenre.results[0].title);
			    //if(typeof callback === 'function'){ 
			    	callback(moviesByGenre);
			    	//alert('in callback');
			    //}
			  }
			});
			//return moviesByGenre;
		}
	};

	$('#getmovie').click(function(e){
		//var movieList;
		e.preventDefault();
		//using a callback to return data
		NetFlics.getData.utils.getMoviesByGenre(
			function(movieList){
				if(movieList !== 'undefined'){
				alert('title in callback:' + movieList.results[0].title);
				}
			}
		);
		//alert(movieList.results[0].title);
		//$('#test-ajax').html(movieList);
	});
		
}