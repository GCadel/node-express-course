const nameObj = require("./04-names.js");
const addTwoValues = require("./05-utils.js");
const fruits = require("./06-alternative-flavor.js");
require("./07-mind-grenade.js");

console.log(nameObj.names);
console.log(addTwoValues(3, 5));
console.log(`Price of fruits / lb:
  Apples: $${fruits.applePrice}
  Bananas: $${fruits.bananaPrice}
  Kiwis: $${fruits.kiwiPrice}`);
