const PubSub = require('../helpers/pub_sub.js');
const Cities = require('../models/cities.js');

const CitySelectView = function (selection, stationList, departureArea) {
  this.selection = selection;
  this.stationList = stationList;
  this.cities = ["Thun", "Sion", "Winterthur", "Bern", "Bâle", "Genève", "Lausanne", "Lugano", "Vernier", "Bienne", "Zürich", "Lucerne", "Fribourg", "St Gallen", "Neuchâtel", "La Chaux-de-Fonds"];
  this.city = new Cities();
  this.stations = null;
  this.stationSelector = null;
  this.departures = null;
  this.departureArea = departureArea;
}


CitySelectView.prototype.bindEvents = function () {
  this.populateCities();
  this.createStationSelector();
  this.createDepartureBoard();
  this.stationList.style.align ="center";
};

CitySelectView.prototype.createDepartureBoard = function () {
  this.stationList.addEventListener('change', (evt) => {
    const chosenStation = evt.target.value;
    this.city.getDepartures(chosenStation);
    PubSub.subscribe('Station:departures', (evt) => {
      this.departures = evt.detail;
      console.log(this.departures);
      const destinationHeader = document.querySelector('th#heure-de-départ');
      this.departures.forEach((departure, index) => {
      this.departureArea.innerHTML = "";
      })
    })
})};

CitySelectView.prototype.createStationSelector = function(){
  this.selection.addEventListener('change', (evt) => {
    const chosenCity = evt.target.value;
    this.city.getStations(chosenCity);
    PubSub.subscribe('Station:stations', (evt) => {
    evt.detail = this.stations;
    this.stations = this.city.data;
    console.log(this.stations);
      this.stationList.innerHTML = "";
    const stationSelector = document.createElement('select');
    stationSelector.setAttribute("id", "station-list");
    console.log(stationSelector);
    stationSelector.value = "Veuillez sélectionner une gare";
    stationSelector.style.backgroundColor = "white";
    stationSelector.style.color = "crimson";
    stationSelector.style.fontWeight = "bold";
    stationSelector.setAttribute("align", "center");
    stationSelector.style.align = "center";
    const label = document.createElement('label');
    label.textContent = "Gare :  ";
    label.style.color = "crimson";
    label.style.align = "center";
    const defaultOption = document.createElement('option');
    defaultOption.style.color = "crimson";
    defaultOption.style.backgroundColor = "white";
    defaultOption.textContent = "Veuillez sélectionner une gare";
    defaultOption.style.textSize = "20";
    stationSelector.appendChild(defaultOption);
      label.appendChild(stationSelector);
    this.stationList.appendChild(label);
    this.stationSelector = stationSelector;
    console.log(this.stationSelector);
    for (station of this.stations.stations){
      const option = document.createElement('option');
      option.textContent = station.name;
      option.value = station.name;
      option.style.backgroundColor = "white";
      stationSelector.appendChild(option);
}})})}

CitySelectView.prototype.populateCities = function(){
  this.cities.forEach((city, index) => {
    this.stationList.innerHTML = "";
    const option = document.createElement('option');
    option.textContent = city;
    option.value = city;
    option.style.backgroundColor = "white";
    this.selection.appendChild(option);
    this.selection.style.backgroundColor = "white";
  })
}

module.exports = CitySelectView;
