'use strict';

import test from 'ava';

import {
    weigh,
    curve,
    Gen,
    randomNumber,
    generateRandomNumber,
    randomBoolean,
    generateRandomBoolean,
    randomNumeric,
    randomUpper,
    randomLower,
    randomAlpha,
    randomCharacter,
    generateRandomCharacter,
    randomString,
    generateRandomString,
    arrayOf,
    generateArrayOf,
    randomArray,
    generateRandomArray,
    objectOf,
    generateObjectOf,
    randomObject,
    generateRandomObject,
    randomData,
    generateRandomData,
    randomFnCall,
    letterFrequencyInTheEnglishLanguage,
    letterFrequencyInTheOxfordDictionary,
    letterFrequencyInPressReporting,
    letterFrequencyInReligiousWritings,
    letterFrequencyInScientificWritings,
    letterFrequencyInGeneralFiction,
    mostCommonFirstLetters,
    mostCommonSecondLetters,
    mostCommonThirdLetters,
    mostCommonLastLetters,
    mostCommonLetterFollowingE,
    moreThanHalfOfAllWordsEndWith,
    digraphFrequency,
    trigraphFrequency,
    doubleLetterFrequency,
    pluralWordLetterFrequency,
    nonPluralWordLetterFrequency,
    randomWord,
    generateRandomWord,
    randomSentence,
    generateRandomSentence,
    randomParagraph,
    generateRandomParagraph
} from '.';

test('objectOf', t => {
    t.is(typeof objectOf(randomString), 'object');
    t.true(Object.entries(objectOf(randomString)).every(([ k, v ]) => typeof v === 'string'));
    t.true(Object.entries(objectOf(randomNumber)).every(([ k, v ]) => typeof v === 'number'));
    t.true(Object.entries(objectOf(randomNumeric)).every(([ k, v ]) => typeof v === 'string' && /\-?[0-9]+/.test(v)));
    t.true(Object.entries(objectOf(randomAlpha)).every(([ k, v ]) => typeof v === 'string' && /[a-zA-Z]+/.test(v)));
    t.true(Object.entries(objectOf(randomUpper)).every(([ k, v ]) => typeof v === 'string' && /[A-Z]+/.test(v)));
    t.true(Object.entries(objectOf(randomLower)).every(([ k, v ]) => typeof v === 'string' && /[a-z]+/.test(v)));
});

test('arrayOf', t => {
    t.true(Array.isArray(arrayOf(() => 0)));
    t.true(arrayOf(randomString).every(v => typeof v === 'string'));
    t.true(arrayOf(randomNumber).every(v => typeof v === 'number'));
    t.true(arrayOf(randomNumeric).every(v => typeof v === 'string' && /\-?[0-9]+/.test(v)));
    t.true(arrayOf(randomAlpha).every(v => typeof v === 'string' && /[a-zA-Z]+/.test(v)));
    t.true(arrayOf(randomUpper).every(v => typeof v === 'string' && /[A-Z]+/.test(v)));
    t.true(arrayOf(randomLower).every(v => typeof v === 'string' && /[a-z]+/.test(v)));
});

test('randomObject - base width', t => {
    t.is(typeof randomObject(), 'object');
    t.is(Object.keys(randomObject(1, 1)).length, 1);
    t.is(Object.keys(randomObject(1, 2)).length, 2);
    t.is(Object.keys(randomObject(1, 3)).length, 3);
});

test('randomObject - uniform depth', t => {
    t.is(typeof randomObject(), 'object');
    const depthOne = randomObject(1, 1, true);
    const depthTwo = randomObject(2, 1, true);
    const depthThree = randomObject(3, 1, true);
    const depthFour = randomObject(4, 1, true);
    t.false(Object.entries(depthOne).some(([ k, v ]) => typeof v === 'object'));
    t.true(Object.entries(depthTwo).every(([ k, v ]) => typeof v === 'object'));
    t.true(Object.entries(Object.entries(depthThree)[0][1]).every(([ k, v ]) => typeof v === 'object'));
    t.true(Object.entries(Object.entries(Object.entries(depthFour)[0][1])[0][1]).every(([ k, v ]) => typeof v === 'object'));
});
