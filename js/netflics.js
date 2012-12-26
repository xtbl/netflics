
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
		getMoviesByGenre: function(/*genre */ callback){
			var api_key = '459887bb41a3478ab3139b788b2033e4';
			var moviesByGenre;
			$.ajax({
			  url: 'http://api.themoviedb.org//3/genre/'+ 10749 +'/movies?api_key='+ api_key,
			  dataType: 'jsonp',
			  success: function(data) {
			    moviesByGenre = data.results;
			    callback(moviesByGenre);
			  }
			});
		}
	};

	//defining package
	NetFlics.dom = NetFlics.dom || {};

	NetFlics.dom.utils = {
		//receives movie list, cycle and adds 
		addMoviePosters: function(movieList){
			var movieLimit = 10;
			var base_url = 'http://cf2.imgobject.com/t/p/w185';
			//fadein for images 
			$('#romance img').bind("load", function() {
            	$('#romance').fadeIn();  
          	});
			if(movieList !== 'undefined'){
				//add images and ids to each poster
				for (var i = 0; i < movieLimit; i++) {
					console.log('title in callback:' + movieList[i].title);
					$('div#action ul li:eq('+ i +') img').attr('src', base_url + movieList[i].poster_path);
					$('div#action ul li:eq('+ i +') a').attr('href', movieList[i].id);
				};
				console.log('title in callback in addMoviePosters:' + movieList[0].title);
			}
		}
	};

	$('#getmovie').click(function(e){
		e.preventDefault();
		//using a callback to get movie data
		NetFlics.getData.utils.getMoviesByGenre(
			//add the movie posters after the ajax request has ended
			NetFlics.dom.utils.addMoviePosters
		);
		$('#romance').elastislide();
	});


  		
}