'use strict';
const uuidv4 = require('uuid/v4');

const range = (start, end = 15) => Array.apply(0, Array(end)).map((e, i) => (i + start));

const randomColumn = start => {
  array = range(start)
  return shuffleArray(array).slice(0,5);
};

const shuffleArray = array => {
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  };
  return array
};

const standardBingoCard = () => {
  nColumn = randomColumn(31);
  nColumn[2] = "Free";
  return {
    b: randomColumn(1),
    i: randomColumn(16),
    n: nColumn,
    g: randomColumn(46),
    o: randomColumn(61),
  };
};

const newBall = () => shuffleArray(range(1,75)).slice(0,1);

exports.logical = (event) => {
  // TODO: read event and execute the correct function
};

exports.handler = lambda((event, context, callback) => {
  logical(event)
    .then(data => callback(null, data))
    .catch(err => callback(err));
});
