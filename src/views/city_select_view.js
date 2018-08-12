const PubSub = require('../helpers/pub_sub.js');
const Cities = require('../models/cities.js');

const CitySelectView = function (selection) {
  this.selection = selection;
  this.cities = ["Thun", "Sion", "Winterthur", "Bern", "Bâle", "Genève", "Lausanne", "Lugano", "Vernier", "Bienne", "Zürich", "Lucerne", "Fribourg", "St Gallen", "Neuchâtel", "La Chaux-de-Fonds"];
  this.city = new Cities();
}


CitySelectView.prototype.bindEvents = function () {

  PubSub.subscribe('Station:stations', (evt) => {
    console.log(evt);
    const allStations = evt.detail;
    console.log(allStations);
    this.populateStations();
  });

  this.selection.addEventListener('change', (evt) => {
    const chosenCity = evt.target.value;
    this.city.getFilteredData(chosenCity);
  });
};

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
