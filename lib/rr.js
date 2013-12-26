
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
  if (!Array.isArray(arr)) throw new Error("Input is not an array.")
  if (arr.length === 0) return null

  if (arr._rr == null) {
    arr._rr = 0
    return arr[0]
  }

  if (arr.length === 1) 
    return arr[0]

  if (typeof lastIndex == 'number')
    arr._rr = lastIndex

  //is outside of range?
  if (arr._rr >= arr.length - 1 || arr._rr < 0) {
    arr._rr = 0
    return arr[0]
  } else {
    arr._rr += 1
    return arr[arr._rr]
  }
}

rr.splice = function(arr, idx, len) {
  if (!Array.isArray(arr)) throw new Error("Input is not an array.")
  if (arr.length === 0) return

  arr.splice(idx, len);

  if (arr._rr == null) {
    arr._rr = 0
    return;
  }

  if (arr._rr >= idx)
    arr._rr -= 1
}

rr.spliceCurrent = function(arr, len) {
  rr.splice(arr, arr._rr, len)
}

})(this);
