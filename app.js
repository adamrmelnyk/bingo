'use strict';
const uuidv4 = require('uuid/v4');

const range = (start, end = 15) => Array.apply(0, Array(end)).map((e, i) => (i + start));

const randomColumn = start => {
  const array = range(start);
  return shuffleArray(array).slice(0,5);
};

const shuffleArray = (array) => {
  let clone = array.slice(0);
  for (let i = clone.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = clone[i];
    clone[i] = clone[j];
    clone[j] = temp;
  };
  return clone
};

const standardBingoCard = () => {
  const nColumn = randomColumn(31);
  nColumn[2] = "Free";
  return {
    b: randomColumn(1),
    i: randomColumn(16),
    n: nColumn,
    g: randomColumn(46),
    o: randomColumn(61),
  };
};

const newBall = (exclude = []) => {
  const possibleNumbers = range(1,75).filter((e) => {
    return !exclude.map((e) => e.slice(1)).map(Number).includes(e);
  });
  if (possibleNumbers.length !== 0) {
    const number = shuffleArray(possibleNumbers).slice(0,1)[0];
    return `${["b", "i", "n", "g", "o"][Math.ceil(number / 15) - 1]}${number}`
  }
  return [];
};

const buildResponse = (body, status = 200) => ({
  status: status,
  headers: {},
  body: body,
});

const logical = (event) => {
  switch(JSON.parse(event.path)) {
    case '/':
      let body = 'TODO: Fill out body'
      let response = buildResponse(body);
      break;
    case '/newball':
    // TODO: Need to check in the event for body
      body = newBall();
      response = buildResponse(body)
      break;
    case '/bingocard':
      body = standardBingoCard();
      response = buildResponse(body);
      break;
    default:
      body = 'Page not found';
      response = buildResponse(body, 404);
  }
  return new Promise(resolve => {
    if (response) {
      resolve(response);
    }
  });
};

const handler = (event, context, callback) => {
  const obj = JSON.parse(event.body);
  logical(event)
    .then(data => callback(null, data))
    .catch(err => callback(err));
};

module.exports = {
  handler,
  logical,
  buildResponse,
  newBall,
  standardBingoCard,
  shuffleArray,
  randomColumn,
  range,
}