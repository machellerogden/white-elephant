# White Elephant

> Generate random data.

## Synopsis

White Elephant is your friend random data provider. It exports both functions and generators which allow you to easily curate whatever the random data suits your needs.

## Why?

Random data is useful for testing. But you already know this or you wouldn't be here.

## Install

```sh
npm i -D white-elephant
```

## Usage

# Functions

Functions for creating different types of random data.

```js
const {
    randomNumber,
    randomBoolean,
    randomCharacter,
    randomString,
    randomArray,
    randomObject,
    randomData,
    randomFnCall
} = require('white-elephant');
```

### `randomNumber([min = 0], [max = Number.MAX_SAFE_INTEGER])`

_**Note:** Random numbers are generated on a curve in order to ensure you get a good mix of smaller and larger numbers._

```js
randomNumber();
// => 875233846374802

randomNumber();
// => 5

randomNumber();
// => 25192091

randomNumber();
// => 354

randomNumber();
// => 7832096272493

randomNumber(10, 50);
// => 23

randomNumber(1, 10);
// => 9

randomNumber(10, 50);
// => 23
```

### `randomCharacter()`

```js
randomCharacter();
// => 'D'

randomCharacter();
// => 'G'

randomCharacter();
// => '5'

randomCharacter();
// => 'q'
```

### `randomBoolean()`

```js
randomBoolean();
// => true

randomBoolean();
// => true

randomBoolean();
// => false
```

### `randomString([length = randomNumber(0, 32)])`

```js
randomString();
// => '7N4'

randomString();
// => 'hg8PS7h83ZxtQYN9N3o8BBtyPB4'

randomString();
// => 'Xncs'

randomString();
// => '6GM6VuJuQwUC1E55'

randomString(64);
// => '55ehKHkFKvtrf7f8jnjmuAMeNQqRCG86D826f8JKPb9jaHzwT3qXFtw8efk1FRWJ'
```

### `randomArray([maxDepth = 1], [baseLength = randomNumber(0, 16)], [consistentDepth = false], [consistentLength = false])`

```js
randomArray();
// => [ 953, 'Y3Q9g51uRTl4J29', 1549115, 95668689985324, null ]

randomArray();
// => [ 41810, 7858, 51256, false, 4750, true, 'JgSH8a49123', false ]

randomArray();
// => [ '7Cq6Iv59q1AiC5793y7odwG8k24GZW6v',
//      818085210,
//      'Ni7jmjS8oMv',
//      'TtT354Z',
//      8,
//      'E4JoDd3Z81zc',
//      '5EjEf93D1nda7ENO1r1iK',
//      'ngfloDt7',
//      'Dl94Ycy5Yn7ha5b',
//      4946,
//      '' ]

randomArray(2);
// => [ [ 5759018,
//        '6a61cX86tYo2lIf1N81ZP6n3874t6aSG',
//        'J7',
//        '3Hk954c',
//        4073,
//        '9zMbZq164xeM9IvA1wgC116',
//        1110,
//        '2Ft3862D4',
//        7381600,
//        225351,
//        702639441764,
//        732175665655 ],
//      [ '8B4l91s94SYh6nJ7erokUm3Im96i',
//        'Uq6pmqW1uw3dAR448g73',
//        91292589537,
//        '3fG6oS3NP7qH2PD9FXtZ846eoW' ],
//      '86S1fj58a93Ed1n7VEDy9RNC38i3gA',
//      { '1f9vPv5WL8O7EOfzG4N8u6o6ti': 82157197434031,
//        '5598Kq7Yyio135IuRsA': false,
//        B7AU44dI446Uv: 6507223558603845,
//        '66S44DIZH9SG4j': 'aShumeOsD9H6t7mOqbP',
//        C2W5W1L2ea429IxAoKAfVL41khk: '65qtccT1AG3I688kH3',
//        '3J4Ah7cKE1w15C': 5069279290 },
//      { '663cSZd5Dnj85R229b8y7HzKx9k': 4353244,
//        '31982h5': 422838,
//        OF4sE2njjpi7KOtj3j96G59qC: 'enICK41i9',
//        Sc4TI5e5L9z: 'fIBSy3o5l1Maoo',
//        '89F1f24A4Me6ao76Z9zKtA5pfXU239lL': 50,
//        '': 'rlL25yJ1N2gpE18w', // yes, empty string is a valid key
//        fYKY7e: 'Tw1F8jiCgiBTLf7',
//        LD1CyK9g32K6Hk14: 'o4b358nR1jzi6XTpTTJAN4' },
//      {} ]

randomArray(1, 10);
// => [ 1665829482979873,
//      'w39e4pnglqs',
//      'miXA9WMXIE8BVAHB24f7',
//      'mq8phtlbvagBCM38LPT6632aM7mRnTap',
//      10486479857,
//      '9z',
//      21499798965768,
//      '9R',
//      571,
//      5244060647 ]
```

### `randomObject([maxDepth = 1], [baseWidth = randomNumber(0, 16)], [consistentDepth = false], [consistentWidth = false])`

```js
randomObject();
// => { rdLn3lhRH5V3pO19LUUlNB2LZ598: '5Dg8v54wdQ4',
//      y4J6NCfH94n: 4977101846,
//      Xat7KPZ2L: 'f5E5M4PnV59i5w1F9ebt',
//      '9r648r8UJ59': 'm7R3kDGo6qVti119oKK4',
//      qvIaE98CN5e8U1k4R3l1hM: 'oE',
//      rxjK46dhn175132SzqlWTI9qvno1K: 'GU2d71',
//      '4rs76tH9Qfrld': false,
//      ZHlscuC5r2i8WHq7O5qEF4zjIYO7: false,
//      A1HwL4r94jkaEf15A213j2l: '3sBX26aKXI98pJK2ns3CCh' }

randomObject();
// => { '85jK8zRKm75ri2rDl8sJU3GIM8W74498': 543901, J98o94Z5: 3690 }

// Note that `maxDepth` doesn't guaranteed depth...
randomObject(2, 1);
// => { fh1PAw64rlpwEMvJDmG3rcA: 8911044642547903 }

// ...and even if the returned object has depth, the child object maybe empty.
randomObject(2, 1);
{ W33d7FHdCiApJ6E54Qk4744: {} }

// Also, note that child objects may be arrays.
randomObject(2, 1);
{ J65rcFwPd88l37682IiljsR6y:
   [ 'UJy9r55KoxXAFL7il37r83Gu',
     573402667,
     0,
     96,
     85130175878499,
     759054611,
     6895888562 ] }
```

### `randomData([maxDepth = 1])`

```js
randomData();
// => { '4ulpi9je': 'eJdh8S',
//      j9BeN41E9M7FnsCXowV7: 'gUh4W2pwnNrpHp6e8h',
//      EIKRXu2xcw: 'GV85poi12zjJ8CWvP4b5WaD8DIo7s',
//      LMn9R: '',
//      SuXn2nGvLh6z8: 211,
//      x2Ol: '21lr11gFlf9g4CL6z',
//      kDR85E9rr3TKxB2LTkkkyf: 223439547,
//      x6dtMkT85mW5846T4: 'VTGiK8XG9elGn',
//      '3wiC17h98': '4978oCv5qNk',
//      FERxQ4I1fZK721mNlC: 'rRoWqdX',
//      At88RfrZ2tO4Z12keBtA23n9E2Iu47: '69uo4XZNTTZ7SO',
//      L4Za117: 38 }

randomData();
// => [ 24,
//      'xCj4eHpG6HZB3Cupw2y',
//      48496399714921,
//      '78sKZ6jM4e6He39lyysv',
//      51378051,
//      64324900,
//      '2U21Dq4GLA5C1x91GUSPyq6MK9' ]

randomData();
// => '9AhTnj8Jrg864lIL24tcmAI39yK1IE'

randomData();
// => 83214652346

randomData();
// => 99

randomData();
// => '8j6'

randomData();
// => 'f3pq73uSHUyF97A'

randomData();
// => undefined

randomData();
// => [ 'L3nTPr15g', 7850103 ]

// Note that specifying `maxDepth` doesn't mean you're doing to get an object or
// an array.
randomData(2);
// => '5pg92e67W2el847wIdJL'

// `maxDepth` will be respected IF you do happen to get an object or array.
randomData(2);
// => { '6y58UNbm5To4tW98EQMF93IE': null,
//      IZAPlUt46uqwBBa7: 2031,
//      Q18r655aGw2U8xphU7s2jr6twsIk51d:
//       { '7OqRlCbGqJ5t2787Q6f': 'ROoe98dwflwpakN5hk1M7',
//         '85l': 45252516,
//         M61vj3drzrd7tGT: 'venQA3IN583v',
//         Lj53j5uGUX8hBGlh5frGlyuwP8: 'QX5Hu2TK',
//         ev: 31251584100959,
//         g9RNSYxx6954v: 'pfhwSH99tZf3C9IlD',
//         '9TA9': 3114349071344711,
//         TpfaH6awGBFg: 'N11yw5',
//         cdVyXCeeVUUf4Plx13yu8lQ7: 9733019751816,
//         ueq8Ct8mHyv8J1iO4I1dqL: 6366129389963073,
//         P5t6f668Nmegy: 81241,
//         w92LmJx12wuKBzBdz8VNbnofdXTR: '95c9M9HN9A9e8Q953Ac',
//         '4DYq71u51nho7okO922a26uu1uC': '333QdqNEs6OB72KcJ2Eh6' },
//      mbp2DPx3Sz8WKjUIj77of19f3j1go4UT: undefined,
//      '92Pvgfn':
//       { '5': 'i5tVd5iFGSdn2aw4MF62hltD',
//         '4v5398WJX8561O7': 972610848141,
//         '7R5TGR3c1AR39hhdF1PqwgN6841': '15X6o9l8p1QiUc6',
//         '4idcQB2YZ8ZSphB4b6OhJ2': 'aas1432zD',
//         Uvm4Eljrx21: 25170462,
//         '5TZpY5CwY8Db3PH8mWF3UkaDZ3QcYh6O': 324061,
//         qQ2h658XM9mG5p23: 8,
//         Rp: '1A',
//         '29OT61M8fZd': 399222,
//         A5jlhL5p: 'c3E8q7O',
//         b1C4ey313oHG2Y8: 9,
//         X54fj98: 37086961,
//         RJ6ZX8NbubM1b99D2y3hz57huhTu6: 'd7a5E1zK8iXW5p9a5Ltruq4M13HLum9',
//         '5NkyZlxrYmT7aIdv2xiBHATr9Z8HXL': 1,
//         B73QkEN55R75cCZoMmfBdH6fwx72P6g: 29258350068 },
//      '4Jh3r2dD4QD6hoI6SnCW43uT8M36ol': [ 915407 ] }
```

### `randomFnCall(...fns)`

Sometimes you want to call a random function...

```js
randomFnCall(() => randomString(3), () => randomNumber(1, 10));
// => '18q'
randomFnCall(() => randomString(3), () => randomNumber(1, 10));
// => 2
randomFnCall(() => randomString(3), () => randomNumber(1, 10));
// => 1
randomFnCall(() => randomString(3), () => randomNumber(1, 10));
// => 'bP8'
```

# Generators

With there random data generators in hand, you are unstoppable.

Unfamiliar with generators? [RTFM here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators).

```js
const {
    generateRandomNumber,
    generateRandomNumber,
    generateRandomCharacter,
    generateRandomString,
    generateRandomArray,
    generateRandomObject,
    generateRandomData
} = require('white-elephant');
```

### `generateRandomNumber([count = 1], [min = 0], [max = Number.MAX_SAFE_INTEGER])`

```js
[ ...generateRandomNumber(10) ];
// => [ 37950, 606631, 6927, 43318, 8216136320, 358043333367, 4119147, 38, 4659302, 32240908 ]

[ ...generateRandomNumber(10, 1, 3) ];
// => [ 1, 3, 2, 2, 2, 1, 2, 2, 3, 1 ]

generateRandomNumber().next().value;
// => 1058
```

### `generateRandomBoolean([count = 1])`

```js
[ ...generateRandomBoolean(10) ];
// => [ false, true, false, true, true, true, true, true, false, true ]

generateRandomBoolean().next().value;
// => false
```

### `generateRandomCharacter([count = 1])`

```js
[ ...generateRandomCharacter(10) ];
// => [ 'a', 'v', 'l', 'e', 'B', 'H', 'h', 'z', 'd', 't' ]

generateRandomCharacter().next().value;
// => '6'
```

### `generateRandomString([count = 1], [length = randomNumber(0, 32)])`

```js
[ ...generateRandomString(3) ];
// => [ 'jtbc', '7gyw2lg2o3Q243o', '6885yhdaW3dRihM' ]

[ ...generateRandomString(4, 4) ];
// => [ 'm6QB', 'wb4O', 'Q6Ti', 'N58k' ]

generateRandomString().next().value;
// => '1Kq4'
```

### `generateRandomArray([count = 1], [maxDepth = 1], [baseLength = randomNumber(0, 16)])`

```js
[ ...generateRandomArray(4, 1, 1) ];
// => [ [ true ], [ 7077968 ], [ 8266812682 ], [ true ] ]

generateRandomArray().next().value;
// => [ 'cj2v953528j', 86088975, 'KWxJ49bL', true, false, true, false ]
```

### `generateRandomObject([count = 1], [maxDepth = 1], [baseWidth = randomNumber(0, 16)])`

```js
[ ...generateRandomObject() ];
// => [ { gIWD: 'e7U972',
//        u1v: '7r24h5Q57fJI9cQwPZhq46o567OhK',
//        p1rFQXORmE8Eai7LsJX8LA17r: 66234848 } ]

[ ...generateRandomObject(4, 1, 1) ];
// => [ { x3Eo: 1019277164868 },
//      { JDf88w7814fV3ELG2QosRdB77f: 55257 },
//      { pl46FD1ebuPkUC48TXyQcz5K5jrKa: 16333186 },
//      { '6v9J': false } ]

[ ...generateRandomObject(2, 2, 2) ];
// => [ { kmcuQr3d38z52a4KeN5kET9GKpnyS: '819oCYKK9vMU52k5',
//        s8H6YJr:
//         [ 38155,
//           628608,
//           'eL',
//           793809,
//           false,
//           'pKS5ahuv9w59s2DNZjB9PqmTT3o',
//           348996,
//           true,
//           4602,
//           true,
//           false,
//           true ] },
//      { '17135NVrKJh8': 881,
//        '739p32':
//         { '6LrGZ465B9k': false,
//           EG4726w5: 'JPR7g5312L212bK',
//           bnLygWBXY92Oy41Bf: 'v768xMSO5n62E5T',
//           hZ5H: false,
//           n6OLrEwC9tP6X9b: true,
//           y2V517CEDu36EUyAc8q3lE5B47xi: 'nhtCE7Ey76',
//           '2YDZtSS6R4oT1SyI5YPRj3fA7E6r1b': true,
//           bLFsYTjOPON3ydH5CTQ5: 0,
//           jlIWlwVkjIn51NjHs68AZ: false,
//           qnLlFthMWIg7m8IeTKz348qua4x3h: 7973 } } ]
```

### `generateRandomData([count = 1], [maxDepth = 1])`

By now, you get the idea...

# License

MIT
