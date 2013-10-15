
;(function(globals){

//UMD
if (typeof define !== 'undefined' && define.amd) { //require.js / AMD
  define([], function() {
    return rr
  })
} else if (typeof module !== 'undefined' && module.exports) { //CommonJS
  module.exports = rr
} else { //script / browser
  globals.rr = rr
}

function rr (arr, lastIndex) {
  
}



})(this);







