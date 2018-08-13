const Request = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Cities = function () {
  this.data = null;
  this.departureData = null;
}

Cities.prototype.getStations = function (city) {
  const url = `http://transport.opendata.ch/v1/locations?query=${ city }`;
  const request = new Request(url);
  console.log(url);
  request.getFilteredData()
    .then((data) => {
    //  console.log(data);
      this.data = data;
      PubSub.publish('Station:stations', this.data);
  })
    .catch((err) =>{
      console.error(err);
    })}

    Cities.prototype.getDepartures = function (station) {
      const url = `http://transport.opendata.ch/v1/stationboard?station=${ station }&limit=15`;
      const request = new Request(url);
      console.log(url);
      request.getFilteredData()
        .then((data) => {
        //  console.log(data);
          this.departureData = data;
          PubSub.publish('Station:departures', this.departureData);
      })
        .catch((err) =>{
          console.error(err);
        })}

module.exports = Cities;
