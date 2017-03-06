const Constants = {
	GAPI_KEY: 'AIzaSyC92I7iEK7wntF_kxDL01VzTluCmaGy5ps',
	GEOLOCATE_USER: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=',

	// API CALLS 
	FIND_STOPS: 'http://localhost:8000/find-stops',
	// FIND_STOPS: 'http://mojazastavka.jozefcipa.com/find-stops',
	GEOLOCATION_PROPERTIES: {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
	STOPS_COUNT: 5,

	GEO: {
		EDGE_PADDING: { top: 40, right: 40, bottom: 40, left: 40 },
		
		// Coords of the westernmost and easternmost point of Slovakia
		DEFAULT_COORDS: [
			{latitude: 48.3779435, longitude: 16.8486673}, // West - Zahorska Ves
			{latitude: 49.0478019, longitude: 22.5151043} // East - Nova Sedlica
		]
	},

	//loader types 
	LOADING_FULL: 'LOADING_FULL', // loading view and network activity indicator
	LOADING_INDICATOR: 'LOADING_INDICATOR', //network activity indicator
	LOADING_VIEW: 'LOADING_VIEW' //loading view
};

export default Constants;