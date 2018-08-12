const Munros = require('./models/munros.js');
const MunrosListView = require('./views/munro_list_view.js');
const SelectView = require('./views/select_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const munros = new Munros();

  const display = document.querySelector('div#munros-list')
  const munroListView = new MunrosListView(display);
  munroListView.bindEvents();
  const selection = document.querySelector('select#munros');
  const selectView = new SelectView(selection);
  selectView.bindEvents();

  munros.bindEvents();


})
