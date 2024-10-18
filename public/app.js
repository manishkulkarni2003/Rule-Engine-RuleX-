//function for creating new rule

function createRule() {
    const ruleString = document.getElementById('ruleInput').value;

    fetch('/api/rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ruleString })
    })
        .then(response => response.json())
        .then(data => {
            displayResult(`Rule Created:${JSON.stringify(data)}`)
        })
        .catch(err => {
            displayResult(`Error Creating rule:${err.message}`)
        })
}

//function to combine rules

function combineRules() {
    const ruleIds = document.getElementById('ruleIdsInput').value.split(',');

    fetch('/api/rules/combine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ruleIds })
    })
        .then(response => response.json())
        .then(data => {
            displayResult(`Rules combined ${data}`)
        })
        .catch(err => {
            displayResult(`Error While Combinig the Rules ${err.message}`)
        })
}

function evaluateRule() {
    const ruleId = document.getElementById('evaluateRuleId').value;
    const userData = JSON.parse(document.getElementById('userData').value);

    fetch('/api/rules/evaluate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ruleId, userData })
    })
        .then(response => response.json())
        .then(data => {
            displayResult(`Evaluation Result:${JSON.stringify(data)}`)
        })
        .catch(err => {
            displayResult(`Error While Evaluating the Rule:${err.message}`)
        })
}

function displayResult(message) {
    document.getElementById('resultOutput').innerText = message;
}



