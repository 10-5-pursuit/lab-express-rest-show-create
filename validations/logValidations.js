/* 
captainName: string
title: string
post: string
mistakesWereMadeToday: boolean
daysSinceLastCrisis: number
*/

const validateNameType = (req, res, next) => {
    if(typeof req.body.captainName === 'string') {
        next()
    } else {
        res.json({error: "Name must be a string"})
    }
}

const validateTitleType = (req, res, next) => {
    if(typeof req.body.title === 'string') {
        next()
    } else {
        res.json({error: "Title must be a string"})
    }
}
const validatePostType = (req, res, next) => {
    if(typeof req.body.post === 'string') {
        next()
    } else {
        res.json({error: "Post must be a string"})
    }
}
const validateMistakeType = (req, res, next) => {
    if(typeof req.body.mistakesWereMadeToday === 'boolean') {
        next()
    } else {
        res.json({error: "Mistakes must be true or false"})
    }
}
const validateCrisisType = (req, res, next) => {
    if(typeof req.body.daysSinceLastCrisis === 'number') {
        next()
    } else {
        res.json({error: "Days since last crisis must be a number"})
    }
}

module.exports = {
    validateNameType,
    validateTitleType,
    validatePostType,
    validateMistakeType,
    validateCrisisType
}