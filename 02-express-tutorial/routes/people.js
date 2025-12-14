const express = require("express");
const router = express.Router();
const {
  addPerson,
  getPeople,
  findPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/people.js");

router.get("/:id", findPerson);
router.get("/", getPeople);
router.post("/", addPerson);
router.put("/", updatePerson);
router.delete("/", deletePerson);
module.exports = router;
