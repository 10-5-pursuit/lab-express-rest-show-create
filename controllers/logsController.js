// Dependancies
const express = require('express');
const logsArray = require('../models/log');
const logs = express.Router();

// Middleware
const { validateNameType, validateTitleType, validatePostType, validateMistakeType, validateCrisisType } = require('../validations/logValidations')

// READ
logs.get('/', (req, res) => {
    let logsToFilter = [...logsArray];
    const regexNonNums = /\D+/g;
    const regexNums = /\d+/g;

    const filters = {
        mistakes: (log, value) => value === 'true' ? log.mistakesWereMadeToday : !log.mistakesWereMadeToday,
        lastCrisis: (log, value) => {
            const numMatch = value.match(regexNums)
            const operMatch = value.match(regexNonNums)
            const num = parseInt(numMatch[0]);
            const operation = operMatch[0]

            switch(operation) {
                case 'gt':
                    return log.daysSinceLastCrisis > num;
                case 'gte':
                    return log.daysSinceLastCrisis >= num;
                case 'lte':
                    return log.daysSinceLastCrisis <= num;
                default:
                    return true;
            }
        } 
    }

    Object.keys(req.query).forEach(key => {
        if(filters[key]) {
            logsToFilter = logsToFilter.filter(log => filters[key](log, req.query[key]))
        }
    })

    const sortOptions = {
        asc: (a,b) => a.captainName.localeCompare(b.captainName),
        desc: (a,b) => b.captainName.localeCompare(a.captainName)
    }

    if(req.query.order && sortOptions[req.query.order]) {
        logsToFilter.sort(sortOptions[req.query.order])
    }

    return res.json(logsToFilter)
})

// SHOW
logs.get('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params;
    if(logsArray[arrayIndex]){
        res.json(logsArray[arrayIndex]);
    } else {
        res.status(404).redirect('/error')
    }
});


// CREATE
logs.post('/', validateNameType, validateTitleType, validatePostType, validateMistakeType, validateCrisisType, (req, res) => {
    logsArray.push(req.body);
    res.json(logsArray[logsArray.length -1])
})

// UPDATE
logs.put('/:arrayIndex', validateNameType, validatePostType, validateTitleType, validateMistakeType, validateCrisisType, (req, res) => {
    const { arrayIndex } = req.params
    logsArray[arrayIndex] = req.body
    res.status(200).json(logsArray[arrayIndex])
})

// DELETE
logs.delete('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params;
    if(logsArray[arrayIndex]) {
        logsArray.splice(arrayIndex, 1)
        res.status(200).redirect('/logs')
    } else {
        res.status(404).redirect('/error')
    }
})



module.exports = logs