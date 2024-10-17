const mongoose = require("mongoose");

const ruleSchema = new mongoose.Schema({
    _id: {
        type: String,
        // required: true
    },
    ruleAst: {
        type: Object
    },
    ruleString: {
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model("Rule", ruleSchema)