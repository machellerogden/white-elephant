'use strict';

/**
 * The following code and related data sets were taken from the `pronounceable` module Copyright (c) 2016 Luke Mitchell
 * https://github.com/lukem512/pronounceable
 */

const fs = require('fs');
const path = require('path');

const pronounceableThreshold = 0.001;

const tuples = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'data/tuples.json'), 'utf8')
);

const triples = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'data/triples.json'), 'utf8')
);

function undef(w, i, depth, probs) {
    if (depth <= 1) return typeof probs[w[i]] === 'undefined';
    if (typeof probs[w[i]] === 'undefined') return true;
    return undef(w, i + 1, depth - 1, probs[w[i]]);
}

const pronounceableTest = word => {
    const w = word.replace(/[^a-zA-Z]/g, '').toLowerCase()

    switch (w.length) {
        case 1:
            break;

        case 2:
            for (let i = 0; i < w.length - 1; i++) {
                if (undef(w, i, 2, tuples)) return false;
                if (tuples[w[i]][w[i + 1]] < pronounceableThreshold) return false;
            }

        default:
            for (var i = 0; i < w.length - 2; i++) {
                if (undef(w, i, 3, triples)) return false;
                if (triples[w[i]][w[i + 1]][w[i + 2]] < pronounceableThreshold) return false;
            }
    }

    return true;
};

module.exports = {
    pronounceableTest
};
