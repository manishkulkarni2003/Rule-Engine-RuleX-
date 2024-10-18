const Rule = require('../models/rule.model')

class Node {
    constructor(type, value = null, left = null, right = null) {
        this.type = type;//operator or operand
        this.value = value;//operand value
        this.left = left;//left child
        this.right = right;//right child
    }
}
function create_rule(ruleString) {
    const tokens = ruleString.split(' ');

    const leftNode = new Node('operand', tokens[0] + ' ' + tokens[1] + ' ' + tokens[2]);
    const operatorNode = new Node('operator', tokens[3]);
    const rightNode = new Node('operand', tokens[4] + ' ' + tokens[5] + ' ' + tokens[6]);

    operatorNode.left = leftNode;
    operatorNode.right = rightNode;

    return operatorNode;
}

function combine_rules(ruleAsts) {
    if (ruleAsts < 2) return ruleAsts[0];

    let combinedAst = ruleAsts[0];

    for (let i = 1; i < ruleAsts.length; i++) {
        const newRoot = new Node('operator', 'OR');

        newRoot.left = combinedAst;

        newRoot.right = combinedAst;

        combinedAst = newRoot;

    }
    return combinedAst;


}
function evaluate_rule(ast, data) {
    if (!ast) return false;


    if (ast.type === 'operand') {
        const condition = ast.value;


        const [attribute, operator, value] = condition.split(' ');

        const leftValue = data[attribute];

        // Handle numbers and strings for the comparison
        let rightValue = value;
        if (!isNaN(value)) {
            rightValue = Number(value);
        } else {
            rightValue = value.replace(/['"]/g, '');  // Remove quotes for string comparison
        }


        switch (operator) {
            case '>':
                return leftValue > rightValue;
            case '<':
                return leftValue < rightValue;
            case '>=':
                return leftValue >= rightValue;
            case '<=':
                return leftValue <= rightValue;
            case '==':
            case '=':  // Handle both equality operators
                return leftValue == rightValue;
            case '!=':
                return leftValue != rightValue;
            default:
                throw new Error(`Unsupported operator: ${operator}`);
        }
    }

    // Handling 'operator' nodes (e.g., AND/OR)
    if (ast.type === 'operator') {
        const leftResult = evaluate_rule(ast.left, data);
        const rightResult = evaluate_rule(ast.right, data);

        if (ast.value === 'AND') {
            return leftResult && rightResult;
        }
        if (ast.value === 'OR') {
            return leftResult || rightResult;
        }
    }

    return false;
}

module.exports = { create_rule, combine_rules, evaluate_rule }
