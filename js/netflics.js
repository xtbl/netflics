
$(function(){





	//top level package
	var NetFlics = NetFlics || {};

	//defining package
	NetFlics.getData = NetFlics.getData || {};

	NetFlics.getData.utils = (function(){
		var api_key = '459887bb41a3478ab3139b788b2033e4'; //private
		return  {	//exposed to public
			getMoviesByGenre: function(callback, genre){
				var moviesByGenre;
				var genreId = NetFlics.getData.utils.getGenreById(genre);
				$.ajax({
				  url: 'http://api.themoviedb.org//3/genre/'+ genreId +'/movies?api_key='+ api_key,
				  dataType: 'jsonp',
				  success: function(data) {
				    moviesByGenre = data.results;
				    callback(moviesByGenre,genre);
				  }
				});
			},
			getGenreById: function(genderName){
				var genderId = 0;
				var genresList = [ {"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":105,"name":"Disaster"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":82,"name":"Eastern"},{"id":2916,"name":"Erotic"},{"id":10751,"name":"Family"},{"id":10750,"name":"FanFilm"},{"id":14,"name":"Fantasy"},{"id":10753,"name":"FilmNoir"},{"id":10769,"name":"Foreign"},{"id":36,"name":"History"},{"id":10595,"name":"Holiday"},{"id":27,"name":"Horror"},{"id":10756,"name":"Indie"},{"id":10402,"name":"Music"},{"id":22,"name":"Musical"},{"id":9648,"name":"Mystery"},{"id":10754,"name":"Neo-noir"},{"id":1115,"name":"RoadMovie"},{"id":10749,"name":"Romance"},{"id":878,"name":"ScienceFiction"},{"id":10755,"name":"Short"},{"id":9805,"name":"Sport"},{"id":10758,"name":"SportingEvent"},{"id":10757,"name":"SportsFilm"},{"id":10748,"name":"Suspense"},{"id":10770,"name":"TVmovie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"} ];
			    genderName = genderName.charAt(0).toUpperCase() + genderName.slice(1);
			    for (var i = genresList.length - 1; i >= 0; i--) {
			    	if( genresList[i].name == genderName ){
			    		genderId = genresList[i].id;
			    	}
			    };
			    return genderId;
			}
		}
	}());

	//defining package
	NetFlics.dom = NetFlics.dom || {};

	NetFlics.dom.utils = {
		setMovieLimit: function(limit){
			this.movieLimit = limit;
		},
		// receives an array with movie genres and create the markup for them
		addPosterSlider: function(genreList, container){	
			//traversing genreList array and creating a poster slider for each genre in it
			//using for and not $.each due to performance reasons http://jsperf.com/jquery-each-vs-for-loop/125
			var movieLimit = 10;
			for (var i = 0; i < genreList.length; i++) {
				
				var genreName = genreList[i];
				
				// create h2
				var genreH2 = $(document.createElement('h2')).append(genreName);
				// create ul with id = genre and class=elastislide
				var genreUl = $(document.createElement('ul'));
				genreUl.attr({id: genreName, class:'elastislide-list'});
				// create poster li 
				for (var j = movieLimit; j > 0; j--) {
					var genreLi = $(document.createElement('li'));
					var genreAnchor = $(document.createElement('a'));
					genreAnchor.attr('href','#');
					var genreImg = $(document.createElement('img'));
					genreImg.attr({src:'img/dummy_1.jpg', alt:'poster image'});
					genreAnchor.append(genreImg);
					genreLi.append(genreAnchor);
					genreUl.append(genreLi);
				};
				// attach element structure into container
				$(container).append(genreH2);
				$(container).append(genreUl);
				//start slider
				$('#'+genreName).elastislide();
			};
		},
		//receives movie list, cycle and adds 
		addMoviePosters: function(movieList, genre){	
			var movieLimit = 10;		
			var base_url = 'http://cf2.imgobject.com/t/p/w185';
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
	//creating posters
	$('#getmovie').click(function(e){
		e.preventDefault();
		var movieGenresArray = ['romance','adventure','action','eastern','horror'];
		//using a callback to get movie data
		NetFlics.dom.utils.addPosterSlider(movieGenresArray,'#movie-container');
		for (var i = 0; i < movieGenresArray.length; i++) {
			NetFlics.getData.utils.getMoviesByGenre(NetFlics.dom.utils.addMoviePosters,movieGenresArray[i]);
		};
	});

	// WHAT IF...
	//how about using the facade pattern in slide 59 https://speakerdeck.com/addyosmani/large-scale-javascript-application-architecture
  	//single module event listener, slide 90
  	//NetFlics.events
  	//Netflics.events:bind, unbind, Netflics.utils: , Netflics.dom: dom manipulation, css styling. slide 113
  	//ajax common method: slide 117
  	//further reading slide 126
});