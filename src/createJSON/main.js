define([
  './poly',
  './circle',
  './rect'
], function(poly, circle, rect){

  return {
    polygon: poly,
    circle: circle,
    rectangle: rect
  };

});