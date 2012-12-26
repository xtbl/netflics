
window.onload = function () {
		
	//slider
	/*$('.bxslider').bxSlider({
		minSlides: 3,
  		maxSlides: 4,
  		slideWidth: 170,
  		slideMargin: 10
  	});
	*/

	//top level package
	var NetFlics = NetFlics || {};

	//defining package
	NetFlics.getData = NetFlics.getData || {};

	NetFlics.getData.utils = {
		getMoviesByGenre: function(callback, genre, genreId){
			var api_key = '459887bb41a3478ab3139b788b2033e4';
			var moviesByGenre;
			$.ajax({
			  url: 'http://api.themoviedb.org//3/genre/'+ genreId +'/movies?api_key='+ api_key,
			  dataType: 'jsonp',
			  success: function(data) {
			    moviesByGenre = data.results;
			    callback(moviesByGenre,genre);
			  }
			});
		}
	};

	//defining package
	NetFlics.dom = NetFlics.dom || {};

	NetFlics.dom.utils = {
		//receives movie list, cycle and adds 
		addMoviePosters: function(movieList, genre){
			var movieLimit = 10;
			var base_url = 'http://cf2.imgobject.com/t/p/w185';
			//var genre = 'romance';
			//fadein for images 
			// $('#'+genre+' img').bind("load", function() {
   //          	$('#'+genre+'').fadeIn();  
   //        	});
			if(movieList !== 'undefined'){
				//add images and ids to each poster
				for (var i = 0; i < movieLimit; i++) {
					console.log('title in callback:' + movieList[i].title);
					$('ul#'+genre+' li:eq('+ i +') img').attr('src', base_url + movieList[i].poster_path);
					$('ul#'+genre+' li:eq('+ i +') a').attr('href', movieList[i].id);
				};
				console.log('title in callback in addMoviePosters:' + movieList[0].title);
			}
		}
	};

	$('#getmovie').click(function(e){
		e.preventDefault();
		//using a callback to get movie data
		NetFlics.getData.utils.getMoviesByGenre(NetFlics.dom.utils.addMoviePosters,'romance',10749);
		$('#romance').elastislide();
		NetFlics.getData.utils.getMoviesByGenre(NetFlics.dom.utils.addMoviePosters,'adventure',12);
		$('#adventure').elastislide();
	});


  		
}