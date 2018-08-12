const PubSub = require('../helpers/pub_sub.js');
const Cities = require('../models/cities.js');

const CitySelectView = function (selection) {
  this.selection = selection;
  this.cities = [Basel, Genève, Lausanne, Zürich, Lucerne, Fribourg, Gallen]
  this.city = new Cities();
}


CitySelectView.prototype.bindEvents = function () {

  PubSub.subscribe('City:cities', (evt) => {
    console.log(evt);
    const allCities = evt.detail;
    console.log(allCities);
    this.populate();

  });

  this.selection.addEventListener('change', (evt) => {
    const chosenCity = evt.target.value;
    this.cities.getFilteredData(chosenCity);
  });
};

CitySelectView.prototype.populate = function(){
  this.cities.forEach((city, index) => {
    const option = document.createElement('option');
    option.textContent = city;
    option.value = city;
    this.selection.appendChild(option);
  })
}
