'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var stores = ['1st and Pike', 'SeaTac Airport', 'Seattle Center', 'Capitol Hill', 'Alki'];
Store.allStores = [];

var storeTable = document.getElementById('storeCookies');

function Store (storeName, minCustPerHour, maxCustPerHour, avgCookiesPerCust) {
  this.storeName = storeName;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookiesPerCust = avgCookiesPerCust;
  this.custEachHour = [];
  this.cookiesPerHour = [];
  this.totalCookiesPerDay = 0;
  Store.allStores.push(this);
  this.calcCustEachHour();
  this.calcCookiesPerHour();
  this.calcTotalCookiesPerDay();
}

Store.prototype.calcCustEachHour = function() {
  for(var i = 0; i < hours.length; i++) {
    this.custEachHour.push(Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1)) + this.minCustPerHour);
  }
};

Store.prototype.calcCookiesPerHour = function() {
  this.calcCustEachHour();
  for(var i = 0; i < hours.length; i++) {
    this.cookiesPerHour.push(Math.ceil(this.avgCookiesPerCust * this.custEachHour[i]));
  }
};

Store.prototype.calcTotalCookiesPerDay = function() {
  this.calcCookiesPerHour();
  for(var i = 0; i < this.cookiesPerHour.length; i++) {
    this.totalCookiesPerDay += this.cookiesPerHour[i];
  }
};

Store.prototype.render = function() {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.className = 'salesCells';
  tdEl.textContent = this.storeName;
  trEl.appendChild(tdEl);

  for(var i = 0; i < hours.length; i++) {
    tdEl = document.createElement('td');
    tdEl.className = 'salesCells';
    tdEl.textContent = this.cookiesPerHour[i];
    trEl.appendChild(tdEl);
  }

  tdEl = document.createElement('td');
  tdEl.id = 'totalsCell';
  tdEl.textContent = this.totalCookiesPerDay;
  trEl.appendChild(tdEl);

  storeTable.appendChild(trEl);
};

new Store(stores[0], 23, 65, 6.3);
new Store(stores[1], 3, 24, 1.2);
new Store(stores[2], 11, 38, 3.7);
new Store(stores[3], 20, 38, 2.3);
new Store(stores[4], 2, 16, 4.6);
console.table(Store.allStores);


function makeHeaderRow() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.className = 'salesHeadRow';
  thEl.textContent = 'Locations';
  trEl.appendChild(thEl);

  for (var i = 0; i < hours.length; i++) {
    thEl = document.createElement('th');
    thEl.className = 'salesHeadRow';
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
  }

  thEl = document.createElement('th');
  thEl.className = 'salesHeadRow';
  thEl.textContent = 'Location Totals';
  trEl.appendChild(thEl);

  storeTable.appendChild(trEl);
}

function makeStoreRows() {
  for (var i = 0; i < Store.allStores.length; i++) {
    Store.allStores[i].render();
  }
}

function makeFooterRow() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.className = 'salesHeadRow';
  thEl.textContent = 'Hourly Totals for all Locations';
  trEl.appendChild(thEl);

  for (var i = 0; i < hours.length; i++) {
    thEl = document.createElement('th');
    thEl.className = 'salesHeadRow';
    var allCookiesPerHour = 0;
    var totalCookiesAllStores = 0;

    for (var j = 0; j < Store.allStores.length; j++) {
      allCookiesPerHour += Store.allStores[j].cookiesPerHour[i];
      totalCookiesAllStores += Store.allStores[j].totalCookiesPerDay;
      thEl.textContent = allCookiesPerHour;
      trEl.appendChild(thEl);
    }
    
  }
  thEl = document.createElement('th');
  thEl.className = 'salesHeadRow';
  thEl.textContent = totalCookiesAllStores;
  trEl.appendChild(thEl);
  
  storeTable.appendChild(trEl);
}

makeHeaderRow();
makeStoreRows();
makeFooterRow();

var entryForm = document.getElementById('entry');

function handleEntrySubmit(event) {
  event.preventDefault();

  var where = event.target.where.value;
  var minCustPH = parseInt(event.target.minCustPH.value);
  var maxCustPH = parseInt(event.target.maxCustPH.value);
  var avgCookiePC = parseFloat(event.target.avgCookiePC.value);

  if (!avgCookiePC || !maxCustPH || !minCustPH ||!where) {
    return alert('Fields cannot be empty!');
  }

  new Store(where, minCustPH, maxCustPH, avgCookiePC);
  storeTable.innerHTML = '';

  event.target.reset();

  makeHeaderRow();
  makeStoreRows();
  makeFooterRow();

  console.table(Store.allStores);
}

entryForm.addEventListener('submit', handleEntrySubmit);
// console.table(Store.allStores);