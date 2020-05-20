var assert = require('assert');
var caracol = require('./index.js').caracol

const array_test1  = [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ];
const array_test1_result  = [ 1, 2, 3, 6, 9, 8, 7, 4, 5 ];

const array_test2  = [ [ 1, 2, 3 ], [ 8 ,9, 4 ], [ 7, 6, 5 ] ];
const array_test2_result  = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

const array_test3  = [ [ 1, 2, 3, 4, 5 ], [ 6, 7, 8, 9, 10 ], [ 11, 12, 13, 14, 15 ] ];
const array_test3_result  = [ 1, 2, 3, 4, 5, 10, 15, 14, 13, 12, 11, 6, 7, 8, 9 ];

const array_test4  = [ [1, 2, 3, 4, 5] ];
const array_test4_result  = [ 1, 2, 3, 4, 5];

const array_test5  = [ 1, 2, 3, 4, 5 ];
const array_test5_result  = [ 1, 2, 3, 4, 5];

const array_test6  = [ [1, 2, 3, 4, 5], [ 10, 9, 8, 7 ,6] ];
const array_test6_result  = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('Testing caracol algorithm', function() {
  describe('Caracol route 1', function() {
    it('should return the array in the specific order', function() {
        
      assert.deepEqual(caracol(array_test1), array_test1_result);
    });
  });
  describe('Caracol route 2', function() {
    it('should return the array in the specific order', function() {
      assert.deepEqual(caracol(array_test2), array_test2_result);
    });
  });
  describe('Caracol route 3', function() {
    it('should return the array in the specific order', function() {
      assert.deepEqual(caracol(array_test3), array_test3_result);
    });
  });
  describe('Caracol route 4', function() {
    it('should return the array in the specific order', function() {
      assert.deepEqual(caracol(array_test4), array_test4_result);
    });
  });
  describe('Caracol route 5', function() {
    it('should return the array in the specific order', function() {
      assert.deepEqual(caracol(array_test5), array_test5_result);
    });
  });
  describe('Caracol route 6', function() {
    it('should return the array in the specific order', function() {
      assert.deepEqual(caracol(array_test6), array_test6_result);
    });
  });
  describe('Caracol empty array', function() {
    it('should return empty array', function() {
      assert.deepEqual(caracol([]), []);
    });
  });
});