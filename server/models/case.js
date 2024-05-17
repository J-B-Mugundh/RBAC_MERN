const mongoose = require("mongoose");
const Joi = require("joi");

const caseSchema = new mongoose.Schema({
	caseId: { type: String, required: true, unique: true },
	dateTimeOfIncident: { type: Date, required: true },
	location: { type: String, required: true },
	victimName: { type: String, required: true },
	suspectName: { type: String, required: true },
	descriptionOfIncident: { type: String, required: true },
	charges: { type: String, required: true },
	arrestInformation: { type: String, required: true },
	evidence: { type: String, required: true },
});

const Case = mongoose.model("case", caseSchema);

const validateCase = (data) => {
	const schema = Joi.object({
		caseId: Joi.string().required().label("Case Id"),
		dateTimeOfIncident: Joi.date().required().label("Date and Time of Incident"),
		location: Joi.string().required().label("Location"),
		victimName: Joi.string().required().label("Victim Name"),
		suspectName: Joi.string().required().label("Suspect Name"),
		descriptionOfIncident: Joi.string().required().label("Description of Incident"),
		charges: Joi.string().required().label("Charges"),
		arrestInformation: Joi.string().required().label("Arrest Information"),
		evidence: Joi.string().required().label("Evidence"),
	});
	return schema.validate(data);
};

module.exports = { Case, validateCase };
