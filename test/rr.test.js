var testutil = require('testutil')
  , rr = require('../lib/rr')

describe('+ rr()', function() {
  describe('> when input array contains 0 elements', function() {
    it('should return null', function() {
      T (rr([]) == null)
    })
  })

  describe('> when input is not an array', function() {
    it('should throw an exception', function() {
      var e1 = false
      try { rr({}) } catch(e) { e1 = true }
      T (e1)

      var e2 = false
      try { rr(4) } catch(e) { e2 = true }
      T (e2)
    })
  })

  describe('> when input contains only one element', function() {
    it('should always return that element', function() {
      var arr = ['a']
      EQ (rr(arr), 'a')
      EQ (rr(arr), 'a')
    })
  })

  describe('> when the input array contains 3 elements', function() {
    it('should iterate through, round robin style', function() {
      var arr = ['a', 'b', 'c']
      EQ (rr(arr), 'a')
      EQ (rr(arr), 'b')
      EQ (rr(arr), 'c')
      EQ (rr(arr), 'a')
      EQ (rr(arr), 'b')
      EQ (rr(arr), 'c')
      EQ (rr(arr), 'a')
    })
  })

  describe('> when the input array contains 3 elements and a lastIndex is passed', function() {
    it('should iterate through, round robint style', function() {
      var arr = ['a', 'b', 'c']
      EQ (rr(arr, arr.length), 'a')
      EQ (rr(arr, 0), 'b')
      EQ (rr(arr, 1), 'c')
      
      EQ (rr(arr, 0), 'b')
      EQ (rr(arr, 0), 'b')
      EQ (rr(arr, 1), 'c')
      EQ (rr(arr, 0), 'b')
    })
  })

  describe('> when the input to lastIndex is negative', function() {
    it('should return the first element', function() {
      var arr = ['a', 'b', 'c']
      EQ (rr(arr, -1), 'a')
      EQ (rr(arr, -100), 'a')
    })
  })

  describe('> when the input to lastIndex is greater than or equal to the length', function() {
    it('should return the first element', function() {
      var arr = ['a', 'b', 'c']
      EQ (rr(arr, arr.length), 'a')
      EQ (rr(arr, 100), 'a')
    })
  })

  describe('> when the next two elements got removed from the array of length 3', function() {
    it('should return the last element', function() {
      var arr = ['a', 'b', 'c']
      rr(arr)
      rr.splice(arr, 0, 2)
      EQ (rr(arr), 'c')
    })
  })

  describe('> when the last two elements got removed from the array of length 3', function() {
    it('should return the first element', function() {
      var arr = ['a', 'b', 'c']
      rr(arr)
      rr.splice(arr, 1, 2)
      EQ (rr(arr), 'a')
    })
  })

  describe('> when the first and the last elements got removed from the array of length 3', function() {
    it('should return the second element', function() {
      var arr = ['a', 'b', 'c']
      rr(arr)
      rr.splice(arr, 0, 1)
      rr.splice(arr, 1, 1)
      EQ (rr(arr), 'b')
    })
  })

  describe('> when the current element (n) got removed from the array', function() {
    it('should still return the n+1th element', function() {
      var arr = ['a', 'b', 'c']
      rr(arr)
      rr.splice(arr, 0, 1)
      EQ (rr(arr), 'b')
    })
  })

  describe('> when the next element (n+1) got removed from the array', function() {
    it('should return element n+2', function() {
      var arr = ['a', 'b', 'c']
      rr(arr)
      rr.splice(arr, 1, 1)
      EQ (rr(arr), 'c')
    })
  })

  describe('> when the current element is removed from the array', function() {
    it('should return the next element', function() {
      var arr = ['a', 'b', 'c']
      rr(arr)
      rr.spliceCurrent(arr, 1)
      EQ (rr(arr), 'b')
    })
  })

  describe('> when toString() is called on the array after rr', function() {
    it('return the vanilla string representation', function() {
      var arr = ['a', 'b', 'c']
      rr(arr)

      EQ (arr.toString(), 'a,b,c')
    })
  })

  describe('> when JSON.stringify() is called on the array after rr', function() {
    it('return the vanilla JSON representation', function() {
      var arr = ['a', 'b', 'c']
      rr(arr)

      EQ (JSON.stringify(arr), '["a","b","c"]')
    })
  })
})

