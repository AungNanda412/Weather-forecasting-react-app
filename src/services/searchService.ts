export const geoApiUrl = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export const weatherApiUrl = `https://api.openweathermap.org/data/2.5`;

export const weatherApiKey = "51eecac8cdafc754c007cdb06c0be92f";

export const geoApiOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "617e1533d5mshbae1d2dfe5b2c56p18cddcjsn070522a20605",
    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    "Content-Type": "application/json",
  },
};



// export const getCurrentLocation = () => {
//   return new Promise<{ curLat: number; curLon: number }>((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         resolve({
//           curLat: position.coords.latitude,
//           curLon: position.coords.longitude,
//         });
//       },
//       (error) => reject(error)
//     );
//   });
// };
