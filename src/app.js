const CitySelectView = require('./views/city_select_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const selection = document.querySelector('select#cities-selection');
  const citySelectView = new CitySelectView(selection);
  citySelectView.bindEvents();



})
