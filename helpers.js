export function mergePoints(current, nearby_stops, destination_stops){
  
  //merge points if exist
  let mergedPoints = nearby_stops.concat(destination_stops);

  let points = [];

  // add current position
  points.push({
    latitude: current.lat,
    longitude: current.lng
  });

  if(mergedPoints.length > 0){
      points = mergedPoints.map(point => {
        return {
          latitude: point.lat,
          longitude: point.lng
        }
      }
    );
  }

  return points;
}