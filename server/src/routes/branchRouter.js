const express = require("express");
const router = express.Router();

const { param, body, query } = require("express-validator");
const validator = require("../middleware/validator");
const { verifyToken } = require("../middleware/auth");

const {
  createBranchController,
  updateBranchController,
  findBranchesController,
} = require("../controllers/branchController");

router.get("/", verifyToken, findBranchesController);
router.post("/", createBranchController);
router.patch("/:id", validator([param("id").isInt()]), updateBranchController);

module.exports = router;
