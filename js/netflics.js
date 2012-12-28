
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
		},
		getGenreById: function(genre){
		//var genres = { property1: value1,...};
		"genres":[
			{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":105,"name":"Disaster"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":82,"name":"Eastern"},{"id":2916,"name":"Erotic"},{"id":10751,"name":"Family"},{"id":10750,"name":"FanFilm"},{"id":14,"name":"Fantasy"},{"id":10753,"name":"FilmNoir"},{"id":10769,"name":"Foreign"},{"id":36,"name":"History"},{"id":10595,"name":"Holiday"},{"id":27,"name":"Horror"},{"id":10756,"name":"Indie"},{"id":10402,"name":"Music"},{"id":22,"name":"Musical"},{"id":9648,"name":"Mystery"},{"id":10754,"name":"Neo-noir"},{"id":1115,"name":"RoadMovie"},{"id":10749,"name":"Romance"},{"id":878,"name":"ScienceFiction"},{"id":10755,"name":"Short"},{"id":9805,"name":"Sport"},{"id":10758,"name":"SportingEvent"},{"id":10757,"name":"SportsFilm"},{"id":10748,"name":"Suspense"},{"id":10770,"name":"TVmovie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}
		]
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