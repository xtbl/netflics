
$(function(){

	//defining global namespace
	var NetFlics = NetFlics || {};

	//defining package
	NetFlics.ajax = NetFlics.ajax || {};

	NetFlics.ajax = ( function() {
		//private
		var api_key = '459887bb41a3478ab3139b788b2033e4'; 
		//exposed to public
		return  {
			getMoviesByGenre: function( callback, genre ){
				var moviesByGenre;
				var genreId = NetFlics.ajax.getGenreById( genre );
				$.ajax({
				  url: 'http://api.themoviedb.org//3/genre/'+ genreId +'/movies?api_key='+ api_key,
				  dataType: 'jsonp',
				  success: function( data ) {
				    moviesByGenre = data.results;
				    callback( moviesByGenre,genre );
				  }
				});
			},
			getGenreById: function( genderName ){
				var genderId = 0;
				var genresList = [ {"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":105,"name":"Disaster"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":82,"name":"Eastern"},{"id":2916,"name":"Erotic"},{"id":10751,"name":"Family"},{"id":10750,"name":"FanFilm"},{"id":14,"name":"Fantasy"},{"id":10753,"name":"FilmNoir"},{"id":10769,"name":"Foreign"},{"id":36,"name":"History"},{"id":10595,"name":"Holiday"},{"id":27,"name":"Horror"},{"id":10756,"name":"Indie"},{"id":10402,"name":"Music"},{"id":22,"name":"Musical"},{"id":9648,"name":"Mystery"},{"id":10754,"name":"Neo-noir"},{"id":1115,"name":"RoadMovie"},{"id":10749,"name":"Romance"},{"id":878,"name":"ScienceFiction"},{"id":10755,"name":"Short"},{"id":9805,"name":"Sport"},{"id":10758,"name":"SportingEvent"},{"id":10757,"name":"SportsFilm"},{"id":10748,"name":"Suspense"},{"id":10770,"name":"TVmovie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"} ];
			    genderName = genderName.charAt(0).toUpperCase() + genderName.slice(1);
			    for (var i = genresList.length - 1; i >= 0; i--) {
			    	if( genresList[i].name == genderName ){
			    		genderId = genresList[i].id;
			    	}
			    };
			    return genderId;
			},
			getMovieInfo: function( movieData, elem ){
				// console.log('in getMovieInfo');
				// console.log(movieData);
				// console.log(elem);
				$('#' + elem + ' a img').qtip({
					content:{
					title:{
						text: 'title'
					},
						text:'movie id'
					}
				});		
				//return movieData;
			},
			getMovieInfoById: function( callback, movieId, elem ) {
				$.ajax({
				  url: 'http://api.themoviedb.org//3/movie/'+ movieId +'?api_key='+ api_key,
				  dataType: 'jsonp',
				  success: function( data ) {
				    movieData = data;//here is!!!
				    callback( movieData, elem );
				  }
				});				
			}
		}
	}());

	//defining package
	NetFlics.dom = NetFlics.dom || {};

	NetFlics.dom = ( function() {
		//private
		var movieLimit = 10; //default movie number
		//public
		return {
			setMovieLimit: function( limit ){
				movieLimit = limit;
			},
			// receives an array with movie genres and create the markup for them
			addPosterSlider: function( genreList, container ) {	
				//traversing genreList array and creating a poster slider for each genre in it
				//using for and not $.each due to performance reasons http://jsperf.com/jquery-each-vs-for-loop/125
				
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
			addMoviePosters: function( movieList, genre ){
				//var movieLimit = 10;		
				var base_url = 'http://cf2.imgobject.com/t/p/w185';
				if(typeof movieList !== 'undefined'){
					//add images and ids to each poster
					var tempMovieImg;
					for (var i = 0; i < movieLimit; i++) {
						console.log('title in callback:' + movieList[i].title);
						tempMovieImg = $('ul#'+genre+' li:eq('+ i +') img');
						tempMovieImg.attr('src', base_url + movieList[i].poster_path);
						$('ul#'+genre+' li:eq('+ i +') a').attr('href', movieList[i].id);
						tempMovieLi = $('ul#'+genre+' li:eq('+ i +')');
						tempMovieLi.attr( 'id', movieList[i].id);
						//tempMovieLi.data('movieId', movieList[i].id);
						//adding tooltip to each movie poster
						tempMovieImg.on('mouseover', NetFlics.dom.addTooltip/*( movieList[i].id )*/);
					};
					console.log('title in callback in addMoviePosters:' + movieList[0].title);
				}
			},
			addTooltip: function( ) {
				//console.log('movieid in addTooltip:'+ movieId)
				//data get this movie id
				//add movie id identifier for 
				//console.log('in addTooltip: ' + $(this).parent().parent().attr('id'));
				NetFlics.ajax.getMovieInfoById( NetFlics.ajax.getMovieInfo, 18, $(this).parent().parent().attr('id') );

				// $(this).parent().qtip({
				// 	content:{
				// 	title:{
				// 		text:'movie title'
				// 	},
				// 		text:'movie id'
				// 	}
				// });		
				
			}
		};
	}());

	NetFlics.events = NetFlics.events || {};
	NetFlics.events = ( function(){

	}());

	NetFlics.init = function(){


		var populateMovies = function( evt ){
				evt.preventDefault();
				var movieGenresArray = ['romance','adventure','action','eastern','horror'];
				//using a callback to get movie data
				NetFlics.dom.addPosterSlider(movieGenresArray,'#movie-container');
				for (var i = 0; i < movieGenresArray.length; i++) {
					NetFlics.ajax.getMoviesByGenre( NetFlics.dom.addMoviePosters, movieGenresArray[i] );
				};
			};


			//attaching listener
			$('#getmovie').on('click', populateMovies);

			//$('#tooltip-test a img').on('mouseover', NetFlics.dom.addTooltip);
				$('#tooltip-test a img').qtip({
					content:{
					title:{
						text: 'title'
					},
						text:'movie id'
					}
				});	
	};

	//main script
	(function ($,app) {

		app.init();

	}(jQuery,NetFlics));


	// WHAT IF...
	//how about using the facade pattern in slide 59 https://speakerdeck.com/addyosmani/large-scale-javascript-application-architecture
  	//single module event listener, slide 90
  	//NetFlics.events
  	//Netflics.events:bind, unbind, Netflics.utils: , Netflics.dom: dom manipulation, css styling. slide 113
  	//ajax common method: slide 117
  	//further reading slide 126
  	//module pattern book p.97
  	//TODO
  	// *reestructure event,utils,dom,ajax
  	// *change to module pattern
  	// *add main script into an immediate function
  	// add tooltip (title, year, director, actors, brief description)
  	// create new detail page: 
  		//http://jschr.github.com/bootstrap-modal/
  		//http://stackoverflow.com/questions/298503/how-can-you-check-for-a-hash-in-a-url-using-javascript?lq=1
});