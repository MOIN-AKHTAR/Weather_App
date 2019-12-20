const request = require("request");
const forecast = ({ latitude, longitude }, callback) => {
  //   if (error) {
  //     callback(error, undefined);
  //   } else {
  request(
    {
      url: `https://api.darksky.net/forecast/b3766edc4bf248aa041cdfff7d8da73e/${latitude},${longitude}?units=si`,
      json: true
    },
    (err, res) => {
      if (err) {
        callback(error, undefined);
      } else if (res.body.err) {
        callback(res.body.err, undefined);
      } else {
        callback(
          undefined,
          "It is " +
            res.body.currently.summary +
            " outside-It is currently " +
            res.body.currently.temperature +
            " degrees out-There is " +
            res.body.currently.precipProbability +
            "% chance of rain"
        );
      }
    }
  );
};
// forecast(24.870862, 67.114544);
module.exports = forecast;
