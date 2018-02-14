'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var stores = ['1st and Pike', 'SeaTac Airport', 'Seattle Center', 'Capitol Hill', 'Alki'];

var storeTable = document.getElementById('storeCookies');
// var footerTable = document.getElementById('storeCookies');

// function calcAllTotals () {
//   this.calcCookiesPerHour();
//   for(var i = 0; i < hours.length; i++) {
//     this.cookiesPerHour[0] += stores.length;
//   }
// }

// calcAllTotals();

function Store (storeName, minCustPerHour, maxCustPerHour, avgCookiesPerCust) {
  this.storeName = storeName;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookiesPerCust = avgCookiesPerCust;
  this.custEachHour = [];
  this.cookiesPerHour = [];
  this.totalCookiesPerDay = 0;
  allStores.push(this);
  this.calcCustEachHour();
  this.calcCookiesPerHour();
  this.calcTotalCookiesPerDay();
}

// function Footer () {
//   this.name = 'Hourly totals for all locations';
//   this.cookiesPerHourAllStores = [];
//   this.totalCookiesAllStores = 0;
//   allFooter.push(this);
//   this.calcCookiesPerHourAllStores();
//   this.calcCookiesAllStores();
// }

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

// Footer.prototype.calcCookiesPerHourAllStores = function() {
//   Store.this.calcCookiesPerHour();
//   for(var i = 0; i < stores.length; i++) {
//     this.cookiesPerHourAllStores.push(Store.this.cookiesPerHour += stores[i]);
//   }
// };

// Footer.prototype.calcCookiesAllStores = function() {
//   Store.prototype.calcTotalCookiesPerDay;
//   for(var i = 0; i < hours.length; i++) {
//     this.calcCookiesAllStores += Store.prototype.totalCookiesPerDay[i];
//   }
// };

Store.prototype.render = function() {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.storeName;
  trEl.appendChild(tdEl);

  for(var i = 0; i < hours.length; i++) {
    tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesPerHour[i];
    trEl.appendChild(tdEl);
  }

  tdEl = document.createElement('td');
  tdEl.className = 'totalsCell';
  tdEl.textContent = this.totalCookiesPerDay;
  trEl.appendChild(tdEl);

  storeTable.appendChild(trEl);
};

// Footer.prototype.render = function() {
//   var trEl = document.createElement('tr');
//   var tdEl = document.createElement('td');
//   tdEl.textContent = this.name;
//   trEl.appendChild(tdEl);

//   for(var i = 0; i < hours.length; i++) {
//     tdEl = document.createElement('td');
//     tdEl.textContent = this.cookiesPerHourAllStores[i];
//     trEl.appendChild(tdEl);
//   }

//   tdEl = document.createElement('td');
//   tdEl.className = 'totalsCell';
//   tdEl.textContent = this.cookiesAllStores;
//   trEl.appendChild(tdEl);

//   footerTable.appendChild(trEl);
// };

var allStores = [];

new Store(stores[0], 23, 65, 6.3);
new Store(stores[1], 3, 24, 1.2);
new Store(stores[2], 11, 38, 3.7);
new Store(stores[3], 20, 38, 2.3);
new Store(stores[4], 2, 16, 4.6);

console.table(allStores);

// var allFooter = [];

// new Footer();

// console.table(allFooter);

function makeHeaderRow() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Locations';
  trEl.appendChild(thEl);

  for (var i = 0; i < hours.length; i++) {
    thEl = document.createElement('th');
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
  }

  thEl = document.createElement('th');
  thEl.textContent = 'Location Totals';
  trEl.appendChild(thEl);

  storeTable.appendChild(trEl);
}

function makeStoreRows() {
  for (var i = 0; i < allStores.length; i++) {
    allStores[i].render();
  }
}

// function makeFooterRow() {
//   for (var i = 0; i < allFooter.length; i++) {
//     allFooter[i].render();
//   }
// }
makeHeaderRow();
makeStoreRows();
// makeFooterRow();