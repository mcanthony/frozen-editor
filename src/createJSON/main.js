define([
  './poly',
  './circle',
  './rect'
], function(poly, circle, rect){

  'use strict';

  return {
    polygon: poly,
    circle: circle,
    rectangle: rect
  };

});