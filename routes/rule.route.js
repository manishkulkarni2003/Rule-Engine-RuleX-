const express = require('express')
const router = express.Router();
const Rule = require("../models/rule.model")
const { create_rule, combine_rules, evaluate_rule } = require("../Controllers/ruleEngine.controller")

router.post('/api/rules', async (req, res) => {
    const { ruleString } = req.body;

    try {
        const ruleAst = create_rule(ruleString);
        const rule = new Rule({ ruleAst, ruleString });
        await rule.save();
        res.json({ message: 'Rule Created', rule });
    } catch (error) {
        console.log(error);

        res.status(400).json({ message: "error While Creating rule", error })
    }
})

router.post('/api/rules/combine', async (req, res) => {
    const { ruleIds } = req.body;//it give an array of ids

    try {
        // const ruleIdArray = ruleIds.split(',').map(id => id.trim());


        const rules = await Rule.find({ _id: { $in: ruleIds } });

        const ruleAsts = rules.map(rule => ruleAst);//ruleAst is a object

        const combinedAst = combine_rules(ruleAsts);

        res.json({ message: 'Rules Combined ', combinedAst })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error While Combining Rules', error })
    }
})

router.post('/api/rules/evaluate', async (req, res) => {
    const { ruleId, userData } = req.body;

    try {
        const rule = await Rule.findById(ruleId);

        if (!rule) {
            return res.status(404).json({ message: 'Rule Not Found' })
        }


        const ruleAst = rule.ruleAst;
        const result = evaluate_rule(ruleAst, userData);
        console.log(ruleAst);

        // const isEligible = evaluate_rule(rule.ruleAst, userData);
        res.json({ message: "Rule Evaluted" }, result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error While Evaluating the Rule", error })
    }


})

module.exports = router;