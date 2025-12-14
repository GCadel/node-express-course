const { people } = require("../data.js");

const getPeople = (req, res) => {
  res.json(people);
};

const findPerson = (req, res) => {
  const foundPerson = people.find((person) => person.id == req.params.id);
  if (foundPerson) {
    res.status(200).json(foundPerson);
  } else {
    res.status(404).json({ message: "This person does not exist" });
  }
};

const addPerson = (req, res) => {
  const name = req.body.name;
  if (name) {
    people.push({ id: people.length + 1, name: name });
    res.status(201).json({ success: true, name: name });
  } else {
    res.status(400).json({ success: false, message: "Please provide a name" });
  }
};

const updatePerson = (req, res) => {
  const { id, name } = req.body;
  const foundPerson = people.find((person) => person.id == id);
  if (foundPerson) {
    foundPerson.name = name;
    res.status(201).json({ success: true, message: "Updated person" });
  } else {
    res.status(404).json({ success: false, message: "Person not found" });
  }
};

const deletePerson = (req, res) => {
  const { id } = req.body;
  const person = people.find((person) => person.id == id);
  if (person) {
    res.status(200).json({
      success: true,
      message: `Deleted ${person.name}`,
      data: people.filter((person) => person.id != id),
    });
  } else {
    res.status(404).json({ success: false, message: "Person not found" });
  }
};

module.exports = {
  addPerson,
  getPeople,
  findPerson,
  updatePerson,
  deletePerson,
};
