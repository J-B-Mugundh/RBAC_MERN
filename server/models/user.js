const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: Number, enum: [0, 1, 2], default: 2 }, // 0 -> super admin, 1 -> admin, 2 -> user
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, role: this.role },
		process.env.JWTPRIVATEKEY,
		{
			expiresIn: "7d",
		}
	);
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		role: Joi.number().valid(0, 1, 2).label("Role"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };
