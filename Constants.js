const Constants = {
	GAPI_KEY: 'AIzaSyC92I7iEK7wntF_kxDL01VzTluCmaGy5ps',

	// GOOGLE API CALLS
	GEOLOCATE_USER_URL: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=',
	// DIRECTIONS_API_URL: `https://maps.googleapis.com/maps/api/directions/json?mode=walking&origin=${origin}&destination=${destination}`,

	// API CALLS - local
	FIND_STOPS_URL: 'http://localhost:8000/find-stops',
	LOAD_CITIES_URL: 'http://localhost:8000/cities',

	// API CALLS - live
	// FIND_STOPS_URL: 'http://mojazastavka.jozefcipa.com/api/v2/find-stops',
	// LOAD_CITIES_URL: 'http://mojazastavka.jozefcipa.com/api/v2/cities',

	GEOLOCATION_PROPERTIES: {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
	STOPS_COUNT: 5,

	GEO: {
		EDGE_PADDING: { top: 40, right: 40, bottom: 40, left: 40 },
		
		// Coords of the westernmost and easternmost point of Slovakia
		DEFAULT_COORDS: [
			{latitude: 48.3779435, longitude: 16.8486673}, // West - Zahorska Ves
			{latitude: 49.0478019, longitude: 22.5151043} // East - Nova Sedlica
		],

		// used to zoom out map when the only point on map is user's location
		// zooms out map in radius 100 meters from user's location
		RADIUS_KM: 0.1
	},

	//loader types 
	LOADING_FULL: 'LOADING_FULL', // loading view and network activity indicator
	LOADING_INDICATOR: 'LOADING_INDICATOR', //network activity indicator
	LOADING_VIEW: 'LOADING_VIEW' //loading view
};

export default Constants;