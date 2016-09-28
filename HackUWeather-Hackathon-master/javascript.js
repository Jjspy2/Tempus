	  var trafficLayer, map, transitLayer, directionsService, directionsDisplay, position;
	  
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 43.647984, lng: -79.377775},
          zoom: 15,
		  disableDefaultUI: true, //Disabling Default UI
			 zoomControl: true,
			 mapTypeControl: false, //SATELLITE VIEW OR NORMAL VIEW
			 scaleControl: true,
			 streetViewControl: false,
			 rotateControl: true,
			 fullscreenControl: false, //FULL SCREEN
        });
		
		//NEW CODE STARTS
		// Create the search box and link it to the UI element.
        var input = document.getElementById('start');
		var input2 = document.getElementById('end');
        var searchBox = new google.maps.places.SearchBox(input);
		var searchBox2 = new google.maps.places.SearchBox(input2);
        

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
		  searchBox2.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();
		  var places2 = searchBox2.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
		
		//NEW CODE ENDS
		
		var infoWindow = new google.maps.InfoWindow({map: map});
		trafficLayer = new google.maps.TrafficLayer();
		transitLayer = new google.maps.TransitLayer();
		
		directionsService = new google.maps.DirectionsService;
		directionsDisplay = new google.maps.DirectionsRenderer;
		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById('directionsPanel'));
		
		// Try HTML5 geolocation.
        if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
             lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here');
            map.setCenter(pos);
         }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
          });
       } else {
         // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
		}
      }
	  
	  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: document.getElementById('start').value,
          destination: document.getElementById('end').value,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	  //BELOW CODE FOR BACKGROUND OF DIRECTIONS
	  function goResult(){
		  document.getElementById("directionsPanel").style.visibility = "visible";
		  var input = document.getElementById('start');
		var input2 = document.getElementById('end');
		calculateAndDisplayRoute(directionsService, directionsDisplay);
		document.getElementById('directionsPanel').style.background = "rgba(255,255,255,255)";
		var orig = document.getElementById("orig"),
       dest = document.getElementById("dest"),
       dist = document.getElementById("dist"),
	   time = document.getElementById("time");
		
		
		
		
		
		
		
		
		
		//google matrix API will get the longitude/latitude from the search box
		
		var response_accu_orig, response_accu_dest, response_accu_orig_cond, response_accu_dest_cond, response_accu_orig_minute, response_accu_dest_minute = "";
			var obj_accu;
			var json;
			console.log("Starting GO requets")
			
				$.ajax({
					
					url: "http://apidev.accuweather.com/locations/v1/search?q=toronto&apikey=HackuWeather2016",
					type: "GET",
					dataType: "json",
					json: "callback", jsonCallback: "callback",
					cache: false,
					success: function(result){
						response_accu_orig = result;
						console.log(response_accu_orig);			
						$("#div1").text(response_accu_orig[0].Key);
					}
				});
			
				$.ajax({
					url: "http://apidev.accuweather.com/locations/v1/search?q=mississauga&apikey=HackuWeather2016",
					type: "GET",
					dataType: "json",
					json: "callback", jsonCallback: "callback",
					cache: false,
					success: function(result){
						response_accu_dest = result;
						console.log(response_accu_dest);			
						$("#div1").text(response_accu_dest[0].Key);
					}
				});
				
				
				$.ajax({
					url: "http://apidev.accuweather.com/currentconditions/v1/55488.json?apikey=HackuWeather2016&details=true",
					type: "GET",
					dataType: "json",
					json: "callback", jsonCallback: "callback",
					cache: false,
					success: function(result){
						response_accu_orig_cond = result;
						console.log(response_accu_orig_cond);			
						$("#origin_accu_html").text(response_accu_orig_cond[0].Temperature.Metric.Value + " °C");
						$("#origin_accu_html2").text(response_accu_orig_cond[0].WeatherText);
						$("#origin_accu_html3").text(response_accu_orig_cond[0].RelativeHumidity + "% humidity");
					}
				});
				//49555
				//55073
				
				
				$.ajax({
					url: "http://apidev.accuweather.com/currentconditions/v1/55071.json?apikey=HackuWeather2016&details=true",
					type: "GET",
					dataType: "json",
					json: "callback", jsonCallback: "callback",
					cache: false,
					success: function(result){
						response_accu_dest_cond = result;
						console.log(response_accu_dest_cond);			
						$("#dest_accu_html").text(response_accu_dest_cond[0].Temperature.Metric.Value + " °C");
						$("#dest_accu_html2").text(response_accu_dest_cond[0].WeatherText);
						$("#dest_accu_html3").text(response_accu_dest_cond[0].RelativeHumidity + "% humidity");
					}
				});
				
				
				
			
			
				$.ajax({
					url: "http://apidev.accuweather.com/forecasts/v1/minute/1minute.json?q=43.64,-79.37&apikey=HackuWeather2016&details=true",
					type: "GET",
					dataType: "json",
					json: "callback", jsonCallback: "callback",
					cache: false,
					success: function(result){
						response_accu_orig_minute = result;
						console.log(response_accu_orig_minute);			
						$("#div1").text(response_accu_orig_minute.Intervals[0].ShortPhrase);
					}
				});
				//43.09,-79.08
				//43.46,-80.52
				
				$.ajax({
					url: "http://apidev.accuweather.com/forecasts/v1/minute/1minute.json?q=43.58,-79.64&apikey=HackuWeather2016&details=true",
					type: "GET",
					dataType: "json",
					json: "callback", jsonCallback: "callback",
					cache: false,
					success: function(result){
						response_accu_dest_minute = result;
						console.log(response_accu_dest_minute.Summary.LongPhrase);			
						$("#dest_accu_html4").text(response_accu_dest_minute.Summary.LongPhrase);
					}
				});
		
				
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  }
	  
	  /*function locationSuccess() {
		var lat = 43.6532;
		var lon = 79.3832;
		var geoAPI;
		
		for(var i = 0; i < 1; i++){
			//geoAPI = 'http://apidev.accuweather.com/forecasts/v1/minute.JSON?q='+lat+','+lon+'&apikey=HackuWeather2016';
			$.ajax({
				url: 'http://apidev.accuweather.com/forecasts/v1/minute.JSON?q='+lat+','+lon+'&apikey=HackuWeather2016',
				type: "POST",
				success: function(res){
				console.log(res.results[0].geometry.location.lat);
				console.log(res.results[0].geometry.location.lng);
				}
			});
		}
	  }*/
	  
	  function toggleSidebar(){
		  if(document.getElementById("directionsPanel").style.visibility == "hidden"){
			  document.getElementById("directionsPanel").style.visibility = "visible";
		  }
		  else{
			  document.getElementById("directionsPanel").style.visibility = "hidden";
		  }
		
	  }
	  
	  function toggleTraffic(){
		trafficLayer.setMap(trafficLayer.getMap() ? null : map);
	  }
	  
	  function toggleTransit(){
		transitLayer.setMap(transitLayer.getMap() ? null : map);
	  }
	  
	  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
      }