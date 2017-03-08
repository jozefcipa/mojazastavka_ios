import Constants from './Constants';

export function searchStops({start = {name, latitude, longitude}, destination = {name, latitude, longitude}, city} = {}){

	const startUri = `start[name]=${encodeURIComponent(start.name)}&start[lat]=${start.latitude}&start[lng]=${start.longitude}`;
	const destinationUri = `destination[name]=${encodeURIComponent(destination.name)}&destination[lat]=${destination.latitude}&destination[lng]=${destination.longitude}`;
	
	const URL = `${Constants.FIND_STOPS_URL}?${startUri}&${destinationUri}&city=${encodeURIComponent(city)}&count=${Constants.STOPS_COUNT}`;
	return new Promise((resolve, reject) => {
            fetch(URL)
	            .then( res => res.json()) //parse response to JSON
	            .then( data => {
	            	if(data.status == "OK"){
	            		resolve(data);
	            	}
	            	else{
	            		reject(data.error);
	            	}
	            })
	            .catch(err => reject(err));
        }
    );
}

export function geolocateUser({latitude, longitude} = {}){

	const URL = `${Constants.GEOLOCATE_USER_URL}${latitude},${longitude}&key=${Constants.GAPI_KEY}`;
	
	return new Promise((resolve, reject) => {
            fetch(URL)
	            .then( res => res.json()) //parse response to JSON
	            .then( data => {
	            	if(data.status == "OK"){
	            		resolve(data);
	            	}
	            	else{
	            		reject('Nepodarilo sa nájsť Vašu polohu');
	            	}
	            })
	            .catch(err => reject(err));
        }
    );
}

//TODO
export function findRoute({start = {latitude, longitude}, destination = {latitude, longitude}} = {}){

	const URL = `${Constants.DIRECTIONS_API_URL}&key=${Constants.GAPI_KEY}`;
	
	return new Promise((resolve, reject) => {
            fetch(URL)
	            .then( res => res.json()) //parse response to JSON
	            .then( data => {
	            	if(data.status == "OK"){
	            		//
	            	}
	            	else{
	            		//
	            	}
	            })
	            .catch(err => reject(err));
        }
    );
}

export function loadCities(){

	return new Promise((resolve, reject) => {
            fetch(Constants.LOAD_CITIES_URL)
	            .then( res => res.json()) //parse response to JSON
	            .then( data => {
	            	if(data.status == "OK"){
	            		resolve(data);
	            	}
	            	else{
	            		reject(data.error);
	            	}
	            })
	            .catch(err => reject(err));
        }
    );
}

const API = {
	searchStops,
	geolocateUser,
	findRoute,
	loadCities
};

export default API;