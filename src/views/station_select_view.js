const PubSub = require('../helpers/pub_sub.js');
const CitySelectView = require('./city_select_view.js');

const StationSelectView = function (departuresList, citySelectView) {

    const selection = document.querySelector('select#cities-selection');
    const stationArea = document.querySelector('div#stations-list');
    const departureArea = document.querySelector('table#departure-board');

    this.departuresList = departuresList;
    this.stations = null;
    this.citySelectView = new CitySelectView(selection, stationArea, departureArea);
    this.departures = null;
}


StationSelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Station:stations', (evt) => {
  this.stations = evt.detail;
  console.log(this.stations);
  this.departuresList.addEventListener('change', (evt) => {
    const chosenStation = evt.target.value;
    this.station.getDepartures(chosenStation);
      PubSub.publish("Station:departures", this.stations);
  })})};

StationSelectView.prototype.populateDepartures = function(){


  }



module.exports = StationSelectView;
