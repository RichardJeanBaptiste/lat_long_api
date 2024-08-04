function haversine(lat1, lon1, lat2, lon2) {
    const toRadians = (degrees) => degrees * Math.PI / 180;
    
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
}

function parseCoordinate(coordinate) {
  // Regex pattern to match coordinates with optional degree symbol and direction
  const regex = /^([+-]?\d+(\.\d+)?)(°\s*[NSWE])?$/;
  const match = coordinate.match(regex);

  if (!match) {
      return false; // Invalid format
  }

  let value = parseFloat(match[1]);
  const direction = match[3]; // Direction will be undefined if not present

  if (direction) {
      const dir = direction.trim(); // Remove any extra spaces
      if (dir.includes('S') || dir.includes('W')) {
          value = -value;
      }
  }

  return value;
}
// const distance = haversine(51.5074, -0.1278, 51.4000, -0.1273);
// console.log(`Distance: ${distance} km`);

module.exports = {haversine, parseCoordinate};