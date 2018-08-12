const PubSub = require('../helpers/pub_sub.js');
const Cities = require('../models/cities.js');

const StationSelectView = function (stationArea) {
  this.stationArea = stationArea;
    this.city = new Cities();
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
  this.stations.forEach((station, index) => {
    const option = document.createElement('option');
    option.textContent = station;
    option.value = station;
    option.style.backgroundColor = "white";
    this.selection.appendChild(option);
    this.selection.style.backgroundColor = "white";
  })
}

module.exports = StationSelectView;
