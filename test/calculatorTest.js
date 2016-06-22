'use strict';

// Test environment setup
let chai, assert, expect, should;
chai = require('chai');
assert = chai.assert;
expect = chai.expect;
should = chai.should(); // Note that should has to be executed

// Tests

let calculator = require('../src/calculator.js');

describe('add', function () {
  it('should return 0 for an empty string', function () {
    let input = "";
    calculator.add(input).should.equal(0);
  });
  it('should return 1 for a string containing only 1', function () {
    let input = "1";
    calculator.add(input).should.equal(1);
  });
  it('should return 2 for a string containing only 2', function () {
    let input = "2";
    calculator.add(input).should.equal(2);
  });
  it('should return 3 for a string containing 1 and 2', function () {
    let input = "1,2";
    calculator.add(input).should.equal(3);
  });
  it('should return 6 for a string containing 1, 2 and 3', function () {
    let input = "1,2,3";
    calculator.add(input).should.equal(6);
  });
  it('should return 6 for a string containing 1, 2 and 3 with different separators', function () {
    let input = "1\n2,3";
    calculator.add(input).should.equal(6);
  });
  it('should return 5 for a string containing 2 and 3 with different specified separators', function () {
    let input = "//;\n2;3";
    calculator.add(input).should.equal(5);
  });
  it('should return 20 for a string containing 15 and 5 with different specified separators', function () {
    let input = "//F\n15F5";
    calculator.add(input).should.equal(20);
  });
  it('should return an error if there is a negative number', function () {
    let input = "//F\n15F-5";
    calculator.add(input).should.equal("negatives not allowed: -5");
  });
  it('should ignore numbers bigger than 1000', function () {
    let input = "//e\n20e2000,40";
    calculator.add(input).should.equal(60);
  });
  it('should accept delimiters with multiple characters', function () {
    let input = "//****\n20****300****40";
    calculator.add(input).should.equal(360);
  });
  it('should accept different delimiters with multiple characters', function () {
    let input = "//???\n20???300???40";
    calculator.add(input).should.equal(360);
  });
});
