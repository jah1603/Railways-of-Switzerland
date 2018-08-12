const PubSub = require('../helpers/pub_sub.js');
const CitySelectView = require('./city_select_view.js');

const StationSelectView = function (stationList, citySelectView) {

    const selection = document.querySelector('select#cities-selection');
    const stationArea = document.querySelector('div#stations-list');
    this.stationList = stationList;
    this.citySelectView = new CitySelectView(selection, stationArea);
    this.departures = null;
}


StationSelectView.prototype.bindEvents = function () {
  this.populateStations();
  this.selection.addEventListener('change', (evt) => {
    const chosenStation = evt.target.value;
    this.station.getDepartures(chosenStation);
      PubSub.publish("Station:departures", this.stations);
  });
};

StationSelectView.prototype.populateStations = function(){
  this.citySelectView.stations.forEach((station, index) => {
    const option = document.createElement('option');
    option.textContent = station;
    option.value = station;
    option.style.backgroundColor = "white";
    this.selection.appendChild(option);
    this.selection.style.backgroundColor = "white";
  })
}

module.exports = StationSelectView;
