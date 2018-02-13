'use strict';

var times = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
var stores = ['1st and Pike', 'SeaTac Airport', 'Seattle Center', 'Capitol Hill', 'Alki'];

var firstAndPike = {
  name: stores[0],
  minCustPerHour: 23,
  maxCustPerHour: 65,
  avgCookiesPerCust: 6.3,
  custEachHour: [],
  calcCustEachHour: function() {
    for(var i = 0; i < times.length; i++) {
      this.custEachHour.push(Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1)) + this.minCustPerHour);
      console.log(this.custEachHour);
    }
  },
  cookiePerHour: [],
  calcCookiePerHour: function() {
    this.calcCustEachHour();
    for(var i = 0; i < this.custEachHour.length; i++) {
      this.cookiePerHour.push(this.avgCookiesPerCust * this.custEachHour[i]);
      console.log(this.cookiePerHour);
    }
  },
  totalCookiesPerDay: 0,
  calcTotalCookiePerDay: function() {
    this.calcCookiePerHour();
    for (var i = 0; i < this.cookiePerHour.length; i++) {
      this.totalCookiesPerDay += this.cookiePerHour[i];
      console.log(this.totalCookiesPerDay);
    }
  },
  render: function() {
    this.calcTotalCookiePerDay();
    var ulEl = document.getElementById('firstAndPike');
    for (var i = 0; i < times.length; i++) {
      var liEl = document.createElement('li');
      liEl.textContent = times[i] + ': ' + Math.round(this.cookiePerHour[i]) + ' cookies';
      ulEl.appendChild(liEl);
    }
    var liEl = document.createElement('li');
    liEl.textContent = 'Total: ' + Math.round(this.totalCookiesPerDay) + 'cookies';
    ulEl.appendChild(liEl);
  }
};

firstAndPike.render();