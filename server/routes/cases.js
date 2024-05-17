const router = require("express").Router();
const { Case, validateCase } = require("../models/case");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const superAdmin = require("../middleware/superAdmin");

// Get all cases (Accessible by Admin and Super Admin)
router.get("/", [auth, admin], async (req, res) => {
	try {
		const cases = await Case.find();
		res.status(200).send(cases);
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// Get a single case by ID (Accessible by Admin and Super Admin)
router.get("/:id", [auth, admin], async (req, res) => {
	try {
		const caseItem = await Case.findById(req.params.id);
		if (!caseItem) return res.status(404).send({ message: "Case not found" });

		res.status(200).send(caseItem);
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// Create a new case (Accessible by Admin and Super Admin)
router.post("/", [auth, admin], async (req, res) => {
	try {
		const { error } = validateCase(req.body);
		if (error) return res.status(400).send({ message: error.details[0].message });

		const caseItem = new Case(req.body);
		await caseItem.save();
		res.status(201).send({ message: "Case created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// Update a case (Accessible by Super Admin only)
router.put("/:id", [auth, superAdmin], async (req, res) => {
	try {
		const { error } = validateCase(req.body);
		if (error) return res.status(400).send({ message: error.details[0].message });

		const caseItem = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!caseItem) return res.status(404).send({ message: "Case not found" });

		res.status(200).send({ message: "Case updated successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// Delete a case (Accessible by Super Admin only)
router.delete("/:id", [auth, superAdmin], async (req, res) => {
	try {
		const caseItem = await Case.findByIdAndDelete(req.params.id);
		if (!caseItem) return res.status(404).send({ message: "Case not found" });

		res.status(200).send({ message: "Case deleted successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
