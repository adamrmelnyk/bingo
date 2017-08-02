# bingo API

A simple API built on AWS Lambda and API Gateway that can be used for playing a game of standard 5 x 5 bingo.

## Using the API

### Bingocard

Returns a randomly generated 5 x 5 bingo card

#### Sample useage

```sh
$ curl https://zrfwkyzgg1.execute-api.us-east-2.amazonaws.com/prod/bingocard

{
  "b":[6,7,5,9,10],
  "i":[27,17,20,25,23],
  "n":[34,44,"Free",40,31],
  "g":[46,47,49,50,51],
  "o":[65,66,61,71,63]
}
```

### Newball

Returns a randomly drawn bingo number. May be passed optional parameters for balls to exclude that may have already be drawn

#### Sample useage

```sh
$ curl https://zrfwkyzgg1.execute-api.us-east-2.amazonaws.com/prod/newball

"b2"
```

#### With exclusions

```sh
$ curl -i https://zrfwkyzgg1.execute-api.us-east-2.amazonaws.com/prod/newball -d '{"exclusions": ["b1","b2","b3","b4","b5","b6","b7","b8","b9","b10","b11","b12","b13","b14","b15","i16","i17","i18","i19","i20","i21","i22","i23","i24","i25","i26","i27","i28","i29","i30","n31","n32","n33","n34","n35","n36","n37","n38","n39","n40","n41","n42","n43","n44","n45","g46","g47","g48","g49","g50","g51","g52","g53","g54","g55","g56","g57","g58","g59","g60","o61","o62","o63","o64","o65","o66","o67","o68","o69","o70","o71","o72","o73","o74"]}'

"o75"
```

## Development

Make sure you are on node 6.10.x

```sh
$ npm install
$ npm test
```
