'use strict';

function weigh(x, weight = 1, noFlat = false) {
    weight = Math.floor(weight);
    if (weight < 1) weight = 1;
    if (!noFlat && Array.isArray(x)) return x.map(v => weigh(v, weight)).flat();
    return (new Array(weight)).fill(x);
}

const curve = (arr, exponent = 1.1) => arr.reduce((acc, v, i, c) =>
    [ ...acc, ...weigh(v, Math.pow(arr.length - i, exponent)) ], []);

function Gen(fn) {
    return function* (count = 1, ...args) {
        let i = 0;
        while (i++ < count) yield fn(...args);
    };
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
const unicodeAlpha = [ unicodeUpper, unicodeLower ];

const unicodeRanges = [
    unicodeDigits,
    unicodeUpper,
    unicodeLower
];

const randomNumeric = () =>
    String.fromCharCode(randomNumber(...unicodeDigits));

const randomUpper = () =>
    String.fromCharCode(randomNumber(...unicodeUpper));

const randomLower = () =>
    String.fromCharCode(randomNumber(...unicodeLower));

const randomAlpha = () =>
    String.fromCharCode(randomNumber(...unicodeAlpha[randomNumber(0, 1)]));

const randomCharacter = () =>
    String.fromCharCode(randomNumber(...unicodeRanges[randomNumber(0, 2)]));

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

function objectOf(fns, width = randomNumber(1,16)) {
    if (!Array.isArray(fns)) fns = [ fns ];
    const stub = {};
    let i = 0;
    while (i < width) {
        let key;
        while (Reflect.has(stub, key)) key = randomString(randomNumber(0, 32));
        const value = randomFnCall(...fns);
        stub[key] = value;
        i++;
    }
    return stub;
}

function randomObject(maxDepth = 1, baseWidth = randomNumber(0, 16), uniformDepth = false, uniformWidth = false) {
    const stub = {};
    let fns = weigh(primitives, 2);
    let i = 0;
    while (i < baseWidth) {
        let key;
        while (Reflect.has(stub, key)) key = randomString(randomNumber(0, 32));
        if (maxDepth > 1) {
            const obs = uniformWidth
                ? objects(maxDepth - 1, baseWidth, uniformDepth, uniformWidth)
                : objects(maxDepth - 1, randomNumber(0, 16), uniformDepth, uniformWidth);
            fns = uniformDepth
                ? obs
                : [ ...fns, ...weigh(obs, 2), nils ];
        }
        const value = randomFnCall(...fns);
        stub[key] = value;
        i++;
    }
    return stub;
}

const generateRandomArray = Gen(randomArray);
const generateObjectOf = Gen(objectOf);
const generateRandomObject = Gen(randomObject);

const randomData = (maxDepth = 1) => randomFnCall(
    ...primitives,
    () => randomObject(maxDepth),
    () => randomArray(maxDepth));

const generateRandomData = Gen(randomData);


// And, just for fun....

const oneLetterWords = [ 'a', 'i' ];
const twoLetterWords = [ 'of', 'to', 'in', 'it', 'is', 'be', 'as', 'at', 'so', 'we', 'he', 'by', 'or', 'on', 'do', 'if', 'me', 'my', 'up', 'an', 'go', 'no', 'us', 'am' ];
const letterFrequencyInTheEnglishLanguage = [ 'e', 't', 'a', 'o', 'i', 'n', 's', 'r', 'h', 'l', 'd', 'c', 'u', 'm', 'f', 'p', 'g', 'w', 'y', 'b', 'v', 'k', 'x', 'j', 'q', 'z' ];
const letterFrequencyInTheOxfordDictionary = [ 'e', 'a', 'r', 'i', 'o', 't', 'n', 's', 'l', 'c', 'u', 'd', 'p', 'm', 'h', 'g', 'b', 'f', 'y', 'w', 'k', 'v', 'x', 'z', 'j', 'q' ];
const letterFrequencyInPressReporting = [ 'e', 't', 'a', 'o', 'n', 'i', 's', 'r', 'h', 'l', 'd', 'c', 'm', 'u', 'f', 'p', 'g', 'w', 'y', 'b', 'v', 'k', 'j', 'x', 'q', 'z' ];
const letterFrequencyInReligiousWritings = [ 'e', 't', 'i', 'a', 'o', 'n', 's', 'r', 'h', 'l', 'd', 'c', 'u', 'm', 'f', 'p', 'y', 'w', 'g', 'b', 'v', 'k', 'x', 'j', 'q', 'z' ];
const letterFrequencyInScientificWritings = [ 'e', 't', 'a', 'i', 'o', 'n', 's', 'r', 'h', 'l', 'c', 'd', 'u', 'm', 'f', 'p', 'g', 'y', 'b', 'w', 'v', 'k', 'x', 'q', 'j', 'z' ];
const letterFrequencyInGeneralFiction = [ 'e', 't', 'a', 'o', 'h', 'n', 'i', 's', 'r', 'd', 'l', 'u', 'w', 'm', 'c', 'g', 'f', 'y', 'p', 'v', 'k', 'b', 'j', 'x', 'z', 'q' ];

const mostCommonFirstLetters = [ 't', 'o', 'a', 'w', 'b', 'c', 'd', 's', 'f', 'm', 'r', 'h', 'i', 'y', 'e', 'g', 'l', 'n', 'p', 'u', 'j', 'k' ];
const mostCommonSecondLetters = [ 'h', 'o', 'e', 'i', 'a', 'u', 'n', 'r', 't' ];
const mostCommonThirdLetters = [ 'e', 's', 'a', 'r', 'n', 'i' ];
const mostCommonLastLetters = [ 'e', 's', 't', 'd', 'n', 'r', 'y', 'f', 'l', 'o', 'g', 'h', 'a', 'k', 'm', 'p', 'u', 'w' ];
const mostCommonLetterFollowingE = [ 'r', 's', 'n', 'd' ];
const moreThanHalfOfAllWordsEndWith = [ 'e', 't', 'd', 's' ];

const digraphFrequency = [ 'th', 'he', 'an', 'in', 'er', 'on', 're', 'ed', 'nd', 'ha', 'at', 'en', 'es', 'of', 'nt', 'ea', 'ti', 'to', 'io', 'le', 'is', 'ou', 'ar', 'as', 'de', 'rt', 've' ];
const trigraphFrequency = [ 'the', 'and', 'tha', 'ent', 'ion', 'tio', 'for', 'nde', 'has', 'nce', 'tis', 'oft', 'men' ];
const doubleLetterFrequency = [ 'ss', 'ee', 'tt', 'ff', 'll', 'mm', 'oo' ];
const pluralWordLetterFrequency = [ 'e', 'i', 's', 'a', 'r', 'n', 't', 'o', 'l', 'c', 'd', 'u', 'g', 'p', 'm', 'h', 'b', 'y', 'f', 'v', 'k', 'w', 'z', 'x', 'j', 'q' ];
const nonPluralWordLetterFrequency = [ 'e', 'a', 'i', 'r', 't', 'o', 'n', 's', 'l', 'c', 'u', 'p', 'm', 'd', 'h', 'g', 'b', 'y', 'f', 'v', 'w', 'k', 'x', 'z', 'q', 'j' ];

function randomWord(len, lett, noCurve = false) {
    let word = '';
    while (![ 'a', 'e', 'i', 'o', 'u' ].some(v => word.split('').includes(v))) {
        let length = len || randomNumber(...randomArg(...weigh([ 1, 2 ], 3, true), ...weigh([ 3, 5 ], 16, true), ...weigh([ 6, 8 ], 4, true), [ 9, 12 ], [ 12, 14 ]));
        let letters;
        if (noCurve) {
            letters = lett == null
                ? letterFrequencyInTheEnglishLanguage
                : lett;
        } else {
            letters = lett == null
                ? curve(letterFrequencyInTheEnglishLanguage)
                : curve(lett);
        }
        let i = 0;
        while (i < length) {
            const prev = word.length
                ? word.slice(-1)
                : '';
            if (length === 1) {
                word = randomArg(...oneLetterWords);
            } else if (length === 2) {
                word = randomArg(...twoLetterWords);
            } else if (i < length - 1) {
                if (i === 0) {
                    word += prev === 'e'
                        ? randomArg(...mostCommonLetterFollowingE)
                        : randomArg(...mostCommonFirstLetters);
                } else if (i === 1) {
                    word += prev === 'e'
                        ? randomArg(...mostCommonLetterFollowingE)
                        : randomArg(...mostCommonSecondLetters);
                } else if (i === 2) {
                    word += prev === 'e'
                        ? randomArg(...mostCommonLetterFollowingE)
                        : randomArg(...mostCommonThirdLetters);
                } else if (length === 3) {
                    let chars = '';
                    chars += prev === 'e'
                        ? randomArg(...mostCommonLetterFollowingE)
                        : randomArg(...[ ...weigh(letters, 5), ...doubleLetterFrequency, ...digraphFrequency ]);
                    word += chars;
                    i += chars.length - 1;
                } else {
                    let chars = '';
                    chars += prev === 'e'
                        ? randomArg(...mostCommonLetterFollowingE)
                        : randomArg(...[ ...weigh(letters, 5), ...doubleLetterFrequency, ...digraphFrequency, ...trigraphFrequency ]);
                    word += chars;
                    i += chars.length - 1;
                }
            } else {
                if (prev === 'e') {
                    word += randomArg(...mostCommonLetterFollowingE);
                } else {
                    word += randomArg(...[ ...weigh(moreThanHalfOfAllWordsEndWith, mostCommonLastLetters.length / 2), ...mostCommonLastLetters ]);
                }
            }
            i++;
        }
    }
    return word;
}

const generateRandomWord = Gen(randomWord);

const randomSentence = letters => {
    const unprocessedWords = [ ..._.generateRandomWord(_.randomNumber(3, 12), null, letters) ];
    const words = unprocessedWords.filter((v, i, a) => {
        return v != a[i - 1];
    });
    const unprocessedSentence = `${words.join(' ')}.`;
    const sentence = `${unprocessedSentence.split('').reduce((acc, c, i, a) => {
        if (c === ' ' && [ ' ' ].includes(acc[acc.length - 1])) return acc;
        if (c === '.' && [ 'a', 'i' ].includes(acc[acc.length - 1])) return acc;
        if (i === 0 || (a[i - 1] === ' ' && [' ', '.' ].includes(a[i + 1]) && oneLetterWords.includes(c))) return [ ...acc, c.toUpperCase() ];
        if (c === ' ') return [ ...acc, randomArg(...[ ...weigh(' ', 9), ', ' ]) ];
        return [ ...acc, c ];
    }, []).join('')}`;
    return sentence;
};

const generateRandomSentence = Gen(randomSentence);

const randomParagraph = letters => `${[ ..._.generateRandomSentence(_.randomNumber(2, 8), letters) ].join(' ')}\n\n`;
const generateRandomParagraph = Gen(randomParagraph);

module.exports = {
    weigh,
    curve,
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
};
