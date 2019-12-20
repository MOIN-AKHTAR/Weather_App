const request = require("request");
// const forecast = require("./forecast");
const geocode = (City, callback) => {
  request(
    {
      url:
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        City +
        ".json?access_token=pk.eyJ1IjoibW9pbi1ha2h0ZXIiLCJhIjoiY2swaDRsMWpxMDBlNTNicDlrcjJqcDdkcCJ9.4TgoNBhEeUtUdwd41HPi5A&limit=1",
      json: true
    },
    (err, res) => {
      if (err) {
        callback(
          "Can not connect to Server please check your connection",
          undefined
        );
      } else if (res.body.features.length === 0) {
        callback(
          "Can not find " + City + " please provide correct name and try again",
          undefined
        );
      } else {
        callback(undefined, {
          latitude: res.body.features[0].center[1],
          longitude: res.body.features[0].center[0]
        });
      }
    }
  );
};
module.exports = geocode;
// geocode("12what", (err, { latitude, longitude } = {}) => {
//   if (err) {
//     console.log(err);
//   } else {
//     forecast(err, { latitude, longitude });
//   }
// });
