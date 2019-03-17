'use strict';

const unicodeDigits = [ 49, 57 ];
const unicodeUpper = [ 65, 90 ];
const unicodeLower = [ 97, 122 ];

const unicodeRanges = [
    unicodeDigits,
    unicodeUpper,
    unicodeLower
];

function generatorFromFn(fn) {
    return function* (count = 1, ...args) {
        let i = 0;
        while (i++ < count) yield fn(...args);
    };
}

function randomNumber (min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const generateRandomNumber = generatorFromFn(randomNumber);

function randomArg(...args) {
    return args[randomNumber(0, args.length - 1)];
}

function randomCharacter() {
    return String.fromCharCode(randomNumber(...unicodeRanges[randomNumber(0, 2)]));
}

const generateRandomCharacter = generatorFromFn(randomCharacter);

function randomString(length = randomNumber(1, 16)) {
    return [ ...generateRandomCharacter(length) ].join(''); 
}

const generateRandomString = generatorFromFn(randomString);

function randomArrayOfNonArrays(length = randomNumber(1, 16)) {
    let i = 0;
    const arr = [];
    while (i++ < length) {
        arr.push(randomArg(randomString, randomNumber, randomObjectOfLiterals, () => void 0)());
    }
    return arr;
}

function randomArray(length = randomNumber(1, 16)) {
    let i = 0;
    const arr = [];
    while (i++ < length) {
        arr.push(randomArg(randomString, randomNumber, randomObjectOfLiterals, randomArrayOfNonArrays)());
    }
    return arr;
}

const generateRandomArray = generatorFromFn(randomArray);

function randomLiteral() {
    return randomArg(randomString, randomNumber, () => void 0)();
}

const generateRandomLiteral = generatorFromFn(randomLiteral);

function randomObjectOfLiterals(width = randomNumber(1, 20), depth = randomNumber(1, 5)) {
    const obj = {};
    let iw = 0;
    let cursor = obj;
    while (iw < width) {
        const key = randomString();
        let id = 1;
        if (id < depth) {
            while (id < depth) {
                const newObj = {};
                cursor[key] = newObj;
                cursor = cursor[key];
                let iww = 0;
                while (iww++ < width) {
                    cursor[randomString()] = randomLiteral();
                }
                id++;
            }
        } else {
            cursor[randomString()] = randomLiteral();
        }

        cursor = obj;
        iw++;
    }
    return obj;
}

const generateRandomObjectOfLiterals = generatorFromFn(randomObjectOfLiterals);

function randomObject(width = randomNumber(1, 20)) {
    const obj = {};
    let i = 0;
    while (i++ < width) {
        obj[randomString()] = randomArg(randomString, randomNumber, randomArray, randomObjectOfLiterals, () => void 0)();
    }
    return obj;
}

const generateRandomObject = generatorFromFn(randomObject);

const randomData = () => randomArg(randomString, randomNumber, randomArray, randomObject, () => void 0)();

const generateRandomData = generatorFromFn(randomData);

module.exports = {
    randomNumber,
    generateRandomNumber,
    randomCharacter,
    generateRandomCharacter,
    randomString,
    generateRandomString,
    randomArray,
    generateRandomArray,
    randomObject,
    generateRandomObject,
    randomData,
    generateRandomData
};

