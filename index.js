'use strict';

function weigh(x, weight = 1) {
    if (Array.isArray(x)) return x.map(v => weigh(v)).flat();
    return (new Array(weight)).fill(x);
}

const ranges = [
    [ -Number.MAX_SAFE_INTEGER, -100000000000001],
    [ -100000000000000, -10000000000001 ],
    [ -10000000000000, -1000000000001 ],
    [ -1000000000000, -100000000001 ],
    [ -100000000000, -10000000001 ],
    [ -10000000000, -1000000001 ],
    [ -1000000000, -100000001 ],
    [ -100000000, -10000001 ],
    [ -10000000, -1000001 ],
    [ -1000000, -100001 ],
    [ -100000, -10001 ],
    [ -10000, -1001 ],
    [ -1000, -101 ],
    [ -100, -11 ],
    [ -10, -1 ],
    [ 0, 10 ],
    [ 11, 100 ],
    [ 101, 1000 ],
    [ 1001, 10000 ],
    [ 10001, 100000 ],
    [ 100001, 1000000 ],
    [ 1000001, 10000000 ],
    [ 10000001, 100000000 ],
    [ 100000001, 1000000000 ],
    [ 1000000001, 10000000000 ],
    [ 10000000001, 100000000000 ],
    [ 100000000001, 1000000000000 ],
    [ 1000000000001, 10000000000000 ],
    [ 10000000000001, 100000000000000 ],
    [ 100000000000001, Number.MAX_SAFE_INTEGER ]
];

const randomArg = (...args) => args[randomNumber(0, args.length - 1)];
const randomFnCall = (...fns) => randomArg(...fns)();

function randomNumber(...args) {
    if (args.length === 0) {
        args = randomArg(...ranges);
    } else if (args.length === 1) {
        args[1] = Number.MAX_SAFE_INTEGER;
    }
    const [ min, max ] = args;
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomBoolean = () => randomArg(true, false);

const unicodeDigits = [ 49, 57 ];
const unicodeUpper = [ 65, 90 ];
const unicodeLower = [ 97, 122 ];

const unicodeRanges = [
    unicodeDigits,
    unicodeUpper,
    unicodeLower
];

const randomCharacter = () =>
    String.fromCharCode(randomNumber(...unicodeRanges[randomNumber(0, 2)]));

function Gen(fn) {
    return function* (count = 1, ...args) {
        let i = 0;
        while (i++ < count) yield fn(...args);
    };
}

const generateRandomNumber = Gen(randomNumber);
const generateRandomBoolean = Gen(randomBoolean);
const generateRandomCharacter = Gen(randomCharacter);

const randomString = (length = randomNumber(0, 32)) =>
    [ ...generateRandomCharacter(length) ].join('');

const generateRandomString = Gen(randomString);

const nils = () => randomArg(void 0, null, NaN);

const primitives = [
    () => randomString(),
    () => randomNumber(),
    () => randomBoolean()
];

const objects = (maxDepth, width, uniformDepth, uniformWidth) => [
    () => randomArray(maxDepth, width != null ? width : randomNumber(0, 16), uniformDepth, uniformWidth),
    () => randomObject(maxDepth, width != null ? width : randomNumber(0, 16), uniformDepth, uniformWidth)
];

function randomArray(maxDepth = 1, baseLength = randomNumber(0, 16), uniformDepth = false, uniformLength = false) {
    const stub = [];
    let fns = weigh(primitives, 2);
    let i = 0;
    while (i < baseLength) {
        if (maxDepth > 1) {
            const obs = uniformLength
                ? objects(maxDepth - 1, baseLength, uniformDepth, uniformLength)
                : objects(maxDepth - 1, null, uniformDepth, uniformLength);
            fns = uniformDepth
                ? obs
                : [ ...fns, ...weigh(obs, 2), nils ];
        }
        const value = randomFnCall(...fns);
        stub[i] = value;
        i++;
    }
    return stub;
}

function randomObject(maxDepth = 1, baseWidth = randomNumber(0, 16), uniformDepth = false, uniformWidth = false) {
    const stub = {};
    let fns = weigh(primitives, 2);
    let i = 0;
    while (i < baseWidth) {
        let key = randomString(randomNumber(0, 32));
        if (maxDepth > 1) {
            const obs = uniformWidth
                ? objects(maxDepth - 1, baseWidth, uniformDepth, uniformWidth)
                : objects(maxDepth - 1, randomNumber(0, 16), uniformDepth, uniformWidth);
            fns = uniformDepth
                ? obs
                : [ ...fns, ...weigh(obs, 2), nils ];
        }
        const value = randomFnCall(...fns);
        while (Reflect.has(stub, key)) {
            key = randomString(randomNumber(0, 32));
        }
        stub[key] = value;
        i++;
    }
    return stub;
}

const generateRandomArray = Gen(randomArray);
const generateRandomObject = Gen(randomObject);

const randomData = (maxDepth = 1) => randomFnCall(
    ...primitives,
    () => randomObject(maxDepth),
    () => randomArray(maxDepth));

const generateRandomData = Gen(randomData);

module.exports = {
    randomNumber,
    generateRandomNumber,
    randomBoolean,
    generateRandomBoolean,
    randomCharacter,
    generateRandomCharacter,
    randomString,
    generateRandomString,
    randomArray,
    generateRandomArray,
    randomObject,
    generateRandomObject,
    randomData,
    generateRandomData,
    randomFnCall
};
