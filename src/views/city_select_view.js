const PubSub = require('../helpers/pub_sub.js');
const Cities = require('../models/cities.js');

const CitySelectView = function (selection, stationList) {
  this.selection = selection;
  this.stationList = stationList;
  this.cities = ["Thun", "Sion", "Winterthur", "Bern", "Bâle", "Genève", "Lausanne", "Lugano", "Vernier", "Bienne", "Zürich", "Lucerne", "Fribourg", "St Gallen", "Neuchâtel", "La Chaux-de-Fonds"];
  this.city = new Cities();
  this.stations = null;
}


CitySelectView.prototype.bindEvents = function () {
  this.populateCities();
  this.createStationSelector();
  this.stationList.innerHTML = "";
};

CitySelectView.prototype.createStationSelector = function(){
  this.selection.addEventListener('change', (evt) => {
    const chosenCity = evt.target.value;
    this.city.getStations(chosenCity);
    PubSub.subscribe('Station:stations', (evt) => {
    evt.detail = this.stations;
    this.stations = this.city.data;
    const stationSelector = document.createElement('select');
    stationSelector.value = "Veuillez sélectionner une gare";
    stationSelector.style.backgroundColor = "white";
    stationSelector.style.color = "crimson";
    stationSelector.style.fontWeight = "bold";
    stationSelector.setAttribute("align", "center");
    const label = document.createElement('label');
    label.textContent = "Gare :  ";
    label.style.color = "crimson";
    const defaultOption = document.createElement('option');
    defaultOption.style.color = "crimson";
    defaultOption.style.backgroundColor = "white";
    defaultOption.textContent = "Veuillez sélectionner une gare";
    defaultOption.style.textSize = "20";
    stationSelector.appendChild(defaultOption);
      label.appendChild(stationSelector);
    this.stationList.appendChild(label);
})})}

CitySelectView.prototype.populateCities = function(){
  this.cities.forEach((city, index) => {
    const option = document.createElement('option');
    option.textContent = city;
    option.value = city;
    option.style.backgroundColor = "white";
    this.selection.appendChild(option);
    this.selection.style.backgroundColor = "white";
  })
}

module.exports = CitySelectView;
