const PubSub = require('../helpers/pub_sub.js');
const CitySelectView = require('./city_select_view.js');

const StationSelectView = function (departuresList, citySelectView) {

    const selection = document.querySelector('select#cities-selection');
    const stationArea = document.querySelector('div#stations-list');
    this.departuresList = departuresList;
    this.stations = null;
    this.citySelectView = new CitySelectView(selection, stationArea);
    this.departures = null;
}


StationSelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Station:stations', (evt) => {
  this.stations = evt.detail;
  this.populateStations();
  this.departuresList.addEventListener('change', (evt) => {
    const chosenStation = evt.target.value;
    this.station.getDepartures(chosenStation);
      PubSub.publish("Station:departures", this.stations);
  })})};

StationSelectView.prototype.populateStations = function(){
  console.log(this.stations);
  this.citySelectView.createStationSelector();
  console.log(this.citySelectView.stationSelector);
  const listToJoin = this.citySelectView.stationSelector;
  console.log(listToJoin);
  for (station of this.stations.stations){
    const option = document.createElement('option');
    option.textContent = station.name;
    option.value = station.name;
    option.style.backgroundColor = "white";
    listToJoin.appendChild(option);

  }
}



module.exports = StationSelectView;
