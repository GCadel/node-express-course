const currentHour = new Date().getHours();
if (currentHour >= 6 && currentHour < 12) {
  console.log("Good Morning! 🌄");
} else if (currentHour >= 12 && currentHour < 17) {
  console.log("Good Afternoon! 🌇");
} else {
  console.log("Good Evening! 🌃");
}
