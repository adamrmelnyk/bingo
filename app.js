'use strict';
const uuidv4 = require('uuid/v4');

exports.range = (start, end = 15) => Array.apply(0, Array(end)).map((e, i) => (i + start));

exports.randomColumn = start => {
  const array = exports.range(start);
  return exports.shuffleArray(array).slice(0,5);
};

exports.shuffleArray = (array) => {
  let clone = array.slice(0);
  for (let i = clone.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = clone[i];
    clone[i] = clone[j];
    clone[j] = temp;
  };
  return clone
};

exports.standardBingoCard = () => {
  const nColumn = exports.randomColumn(31);
  nColumn[2] = "Free";
  return {
    b: exports.randomColumn(1),
    i: exports.randomColumn(16),
    n: nColumn,
    g: exports.randomColumn(46),
    o: exports.randomColumn(61),
  };
};

exports.newBall = (exclude = []) => {
  const possibleNumbers = exports.range(1,75).filter((e) => {
    return !exclude.map((e) => e.slice(1)).map(Number).includes(e);
  });
  if (possibleNumbers.length !== 0) {
    const number = exports.shuffleArray(possibleNumbers).slice(0,1)[0];
    return `${["b", "i", "n", "g", "o"][Math.ceil(number / 15) - 1]}${number}`
  }
  return [];
};

exports.logical = (event) => {
  // TODO: read event and execute the correct function
};

exports.handler = (event, context, callback) => {
  const obj = JSON.parse(event.body);
  logical(event)
    .then(data => callback(null, data))
    .catch(err => callback(err));
};
