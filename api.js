import Constants from './Constants';
import { decodeGoogleDirections } from './helpers';

/*
 MOJAZASTAVKA.JOZEFCIPA.COM API ENDPOINTS
*/
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
	            .catch(err => reject('Nastala neznáma chyba.\nZastávky sa nepodarilo nájsť.'));
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
	            .catch(err => reject('Nastala neznáma chyba.\nNepodarilo sa načítať zoznam miest.'));
        }
    );
}

export function searchDepartures({start, destination, city, time} = {}){
	
	const paramsUri = `start=${encodeURIComponent(start)}&destination=${encodeURIComponent(destination)}&city=${encodeURIComponent(city)}&time=${encodeURIComponent(time)}`;

	const URL = `${Constants.FIND_DEPARTURES}?${paramsUri}`;
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
	            .catch(err => reject('Nastala neznáma chyba.\nNepodarilo sa nájsť odchody spojov.'));
        }
    );
}

/*
 GOOGLE API ENDPOINTS
*/
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
	            		reject(err);
	            	}
	            })
	            .catch(err => reject('Nastala neznáma chyba.\nNepodarilo sa nájsť Vašu polohu.'));
        }
    );
}

const API = {
	searchStops,
	geolocateUser,
	loadCities
};

export default API;