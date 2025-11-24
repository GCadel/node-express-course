const EventEmitter = require("events");

const emitter = new EventEmitter();

// Event listeners
emitter.on("timer", (msg) => {
  const currTime = new Date();
  const timeDetails = {
    hours: currTime.getHours(),
    minutes: currTime.getMinutes(),
    seconds: currTime.getSeconds(),
  };
  console.log(
    `${timeDetails.hours}:${timeDetails.minutes}:${timeDetails.seconds}`,
    msg
  );
});

emitter.on("fetched", (data) => {
  console.log("Fetched data:", data);
});

// Emitters
setInterval(() => {
  const currTime = new Date();

  if (currTime.getSeconds() % 3 == 0 && currTime.getSeconds() != 0) {
    emitter.emit("timer", "Hello from 3 second timer");
  }
}, 1000);

setInterval(() => {
  const currTime = new Date();

  if (currTime.getSeconds() % 5 == 0 && currTime.getSeconds() != 0) {
    emitter.emit("timer", "Hello from 5 second timer");
  }
}, 500);

const fetchRandomRecipe = async () => {
  const result = await fetch(
    "http://www.themealdb.com/api/json/v1/1/random.php"
  );
  const data = await result.json();
  emitter.emit("fetched", `Today's Random Recipe: ${data.meals[0].strMeal}`);
};

fetchRandomRecipe();
