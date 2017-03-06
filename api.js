import Constants from './Constants';

export function searchStops({start = {name, latitude, longitude}, destination = {name, latitude, longitude}} = {}){

	const startUri = `start[name]=${encodeURIComponent(start.name)}&start[lat]=${start.latitude}&start[lng]=${start.longitude}`;
	const destinationUri = `destination[name]=${encodeURIComponent(destination.name)}&destination[lat]=${destination.latitude}&destination[lng]=${destination.longitude}`;
	
	const URL = `${Constants.FIND_STOPS}?${startUri}&${destinationUri}&count=${Constants.STOPS_COUNT}`;
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

	const URL = `${Constants.GEOLOCATE_USER}${latitude},${longitude}&key=${Constants.GAPI_KEY}`;
	
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

	const URL = `${Constants.FIND_ROUTE}`;
	
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

const API = {
	searchStops,
	geolocateUser,
	findRoute
};

export default API;