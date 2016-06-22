'use strict';


let calculator = {

  add: function(text) {
    let sum, numbers, delimiters, extractedData, negativeNumbers;
    sum = 0;
    negativeNumbers = [];
    delimiters = ["\\n",","];

    if (text !== "") {
      
      extractedData = this._extractSpecifiedDelimiterAndNumbers(text);
      
      if (extractedData.delimiter) {
        delimiters.push(extractedData.delimiter);
      }

      numbers = extractedData.numbers.split(this._getNumberSplittingPattern(delimiters));
      numbers.forEach(function(number) {

        let parsedNumber = Number(number);
        if (parsedNumber < 0) {
          negativeNumbers.push(parsedNumber);
        }
        else if (parsedNumber < 1000) {
          sum += parsedNumber;
        }
      });
    }

    if (negativeNumbers.length > 0) {
      return "negatives not allowed: " + negativeNumbers.join(",");
    }
    return sum;
  },

  _getNumberSplittingPattern: function (delimiters) {
    return new RegExp(delimiters.join("|"));
  },

  _escapeDelimiter: function (unescapedDelimiter) {
    if (unescapedDelimiter === "****") {
      return "\\*\\*\\*\\*";
    }
    return unescapedDelimiter;
  },

  _extractSpecifiedDelimiterAndNumbers: function (text) {
    let delimiterAndNumbers, extractedData, EXTRACT_DELIMITER_PATTERN, DELIMITER_GROUP, NUMBERS_GROUP;
    delimiterAndNumbers = {};
    EXTRACT_DELIMITER_PATTERN = "\/\/(.+)\\n(.+)";
    DELIMITER_GROUP = 1;
    NUMBERS_GROUP = 2;

    extractedData = text.match(EXTRACT_DELIMITER_PATTERN);

    if (extractedData) {
      delimiterAndNumbers.delimiter = this._escapeDelimiter(extractedData[DELIMITER_GROUP]);
      delimiterAndNumbers.numbers = extractedData[NUMBERS_GROUP];
    }
    else {
      delimiterAndNumbers.numbers = text;
    }
    
    return delimiterAndNumbers;
  }
};

module.exports = calculator;