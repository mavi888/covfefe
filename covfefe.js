const _ = require('lodash');

const vowels = ['a','e','i','o','u','y'];

const constMap = {
  b: 'p',
  c: 'g',
  d: 't',
  f: 'v',
  g: 'k',
  h: 'h',
  j: 'j',
  k: 'g',
  l: 'l',
  m: 'm',
  n: 'n',
  p: 'b',
  q: 'q',
  r: 'r',
  s: 'z',
  t: 'd',
  v: 'f',
  w: 'w',
  x: 'x',
  z: 's'
}

function findVowelFromPosition(input, startIndex) {
  var vowelIndex = input.length;
  _.forEach(vowels, function(vowel) {
    var vowelPos = input.indexOf(vowel)
    if (vowelPos >= startIndex && vowelPos < vowelIndex) {
      vowelIndex = vowelPos;
    }
  });
  return vowelIndex;
}

function findConsonantFromPosition(input, startIndex) {
  for (var i = startIndex; i < input.length; i++ ) {
    if (!_.includes(vowels, input.charAt(i))) {
      //Is not a vowels
      return input.charAt(i);
    }
  }
}

function confefe(input) {
  //Find the first vowels
  var firstVowelIndex = findVowelFromPosition(input, 0);

  //Find the first consonant after the first vowel
  var firstConsonant = findConsonantFromPosition(input, firstVowelIndex);
  var firstConsonantPos = input.indexOf(firstConsonant);

  //Remove the rest of the string
  var newInput = input.substring(0, firstConsonantPos + 1);

  //Replace it with the voiced version of the consonant
  var voicedConsonant = constMap[firstConsonant];

  //Grab the next vocal
  var secondVowel = input.charAt(findVowelFromPosition(input, firstVowelIndex + 1));

  //Put both togheter twice and attach it to the new input
  return newInput + voicedConsonant + secondVowel + voicedConsonant + secondVowel;
}

const args = process.argv.slice(2);
_.forEach(args, function(arg) {
  console.log(arg + ' --> ' + confefe(arg));
});
