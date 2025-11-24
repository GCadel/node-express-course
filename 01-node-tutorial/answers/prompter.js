const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let item = "Enter something below.";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body>
  <p>${item}</p>
  <form method="POST">
  <input name="item"></input>
  <button type="submit">Submit</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      // List from https://copypastelist.com/nature/list/list-of-national-parks-in-the-us
      const nationalParks = [
        "Acadia",
        "American Samoa",
        "Arches",
        "Badlands",
        "Big Bend",
        "Biscayne",
        "Black Canyon of the Gunnison",
        "Bryce Canyon",
        "Canyonlands",
        "Capitol Reef",
        "Carlsbad Caverns",
        "Channel Islands",
        "Congaree",
        "Crater Lake",
        "Cuyahoga Valley",
        "Death Valley",
        "Denali",
        "Dry Tortugas",
        "Everglades",
        "Gates of the Arctic",
        "Gateway Arch",
        "Glacier",
        "Glacier Bay",
        "Grand Canyon",
        "Grand Teton",
        "Great Basin",
        "Great Sand Dunes",
        "Great Smoky Mountains",
        "Guadalupe Mountains",
        "Haleakalā",
        "Hawaiʻi Volcanoes",
        "Hot Springs",
        "Indiana Dunes",
        "Isle Royale",
        "Joshua Tree",
        "Katmai",
        "Kenai Fjords",
        "Kings Canyon",
        "Kobuk Valley",
        "Lake Clark",
        "Lassen Volcanic",
        "Mammoth Cave",
        "Mesa Verde",
        "Mount Rainier",
        "New River Gorge",
        "North Cascades",
        "Olympic",
        "Petrified Forest",
        "Pinnacles",
        "Redwood",
        "Rocky Mountain",
        "Saguaro",
        "Sequoia",
        "Shenandoah",
        "Theodore Roosevelt",
        "Virgin Islands",
        "Voyageurs",
        "White Sands",
        "Wind Cave",
        "Wrangell–St. Elias",
        "Yellowstone",
        "Yosemite",
        "Zion",
      ];
      if (body["item"]) {
        item = `US National Parks containing "${body.item}"</br>
        ${nationalParks
          .filter((park) =>
            park.toLowerCase().includes(body.item.toLowerCase())
          )
          .toString()}`;
      } else {
        item = "Nothing was entered.";
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.on("request", (req) => {
  console.log("event received: ", req.method, req.url);
});

server.listen(3000);
console.log("The server is listening on port 3000.");
