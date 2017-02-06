const Constants = {
	GAPI_KEY: 'AIzaSyC92I7iEK7wntF_kxDL01VzTluCmaGy5ps',
	GEOLOCATE_USER: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=',

	// API CALLS 
	FIND_STOPS: 'http://localhost:8000/find-stops',
	GEOLOCATION_PROPERTIES: {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
};	

export default Constants;