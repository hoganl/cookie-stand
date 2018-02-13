'use strict';

var times = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var stores = ['1st and Pike', 'SeaTac Airport', 'Seattle Center', 'Capitol Hill', 'Alki'];

var firstAndPike = {
  minCustPerHour: 23,
  maxCustPerHour: 65,
  avgCookiesPerCust: 6.3,
  custEachHour: [],
  calcCustEachHour: function() {
    for(var i = 0; i < times.length; i++) {
      this.custEachHour.push(Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1)) + this.minCustPerHour);
    }
  }}
};

firstAndPike.calcCustEachHour();