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

      const departureTimeHeader = document.querySelector('th#heure-de-départ');
      const departureTypeHeader = document.querySelector('th#type');
      const departureDestinationHeader = document.querySelector('th#destination');
      const departureArrivalTimeHeader = document.querySelector("th#heure-darrivée");
      this.departureArea.innerHTML = "";
      console.log(departureTimeHeader);
      departureTimeHeader.textContent = "Departure time";
      departureTypeHeader.textContent = "Type";
      departureDestinationHeader.textContent = "Destination";
      departureArrivalTimeHeader.textContent = "Platform";
      departureTimeHeader.style.backgroundColor = "white";
      departureTypeHeader.style.backgroundColor = "white";
      departureDestinationHeader.style.backgroundColor = "white";
      departureArrivalTimeHeader.style.backgroundColor = "white";
      departureTimeHeader.style.color = "crimson";
      departureTypeHeader.style.color = "crimson";
      departureDestinationHeader.style.color = "crimson";
      departureArrivalTimeHeader.style.color = "crimson";
      this.departureArea.appendChild(departureTimeHeader);
      this.departureArea.appendChild(departureTypeHeader);
      this.departureArea.appendChild(departureDestinationHeader);
      this.departureArea.appendChild(departureArrivalTimeHeader);
      this.departures.stationboard.forEach((departure, index) => {

      const departureContent = document.createElement('tr');
        departureContent.style.backgroundColor = "white";
            departureContent.setAttribute('id', 'dep-row');
      const depTime = document.createElement('td');
      depTime.setAttribute('id', "time");
        depTime.setAttribute('align', "center");
      const depType = document.createElement('td');
      depType.setAttribute('id', "type");
      const depDestination = document.createElement('td');
      depType.setAttribute('align', 'center');
      depDestination.setAttribute('id', "destination");
      depDestination.setAttribute('align', "center");
      const depArrivalTime = document.createElement('td');
      depArrivalTime.setAttribute('id', "arrivaltime");
      console.log(departureTimeHeader);
      depTime.textContent = departure.stop.departure.substr(((departure.stop.departure.length) - 13), ((departure.stop.departure.length) - 19));
      depType.textContent = departure.category;
      depDestination.textContent = departure.to;
      depArrivalTime.textContent = departure.stop["platform"];
      if (depArrivalTime.textContent.length = 0){
       depArrivalTime.textContent = "TBC";
    }

      console.log(departure.stop);
      depArrivalTime.setAttribute("align", "center");
      depTime.style.color = "crimson";
      depType.style.color = "crimson";
      depDestination.style.color = "crimson";
      depArrivalTime.style.color = "crimson";
      console.log(departure.to);
      departureContent.appendChild(depTime);
      departureContent.appendChild(depType);
      departureContent.appendChild(depDestination);
      departureContent.appendChild(depArrivalTime);
      this.departureArea.appendChild(departureContent);
      console.log(this.departureArea);
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
    stationSelector.value = "Please choose a station";
    stationSelector.style.backgroundColor = "white";
    stationSelector.style.color = "crimson";
    stationSelector.style.fontWeight = "bold";
    stationSelector.setAttribute("align", "center");
    stationSelector.style.align = "center";
    stationSelector.setAttribute('position', 'relative');
    stationSelector.setAttribute('left', '-200px');
    const label = document.createElement('label');
    label.textContent = "Railway station:                       ";
    label.style.color = "crimson";
    label.setAttribute('position', 'relative');
    label.setAttribute('left', '20px');
    label.setAttribute('align', 'center');
    label.style.align = "center";
    const defaultOption = document.createElement('option');
    defaultOption.style.color = "crimson";
    defaultOption.style.backgroundColor = "white";
    defaultOption.textContent = "Please choose a station";
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
    option.setAttribute('align', 'center');
    option.style.backgroundColor = "white";
    this.selection.appendChild(option);
    this.selection.style.backgroundColor = "white";
  })
}

module.exports = CitySelectView;
