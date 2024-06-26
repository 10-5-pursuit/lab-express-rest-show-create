const logsData = require('../models/logs');

const checkForCorrectFormat = (req, res, next) => {
    const formatObj = {
        captainName: "string",
        title: "string",
        post: "string",
        mistakesWereMadeToday: "boolean",
        daysSinceLastCrisis: "number"
    };
    const obj = req.body;

    for (const key in formatObj) {
        if (!obj.hasOwnProperty(key) || typeof obj[key] !== formatObj[key]) {
            return res.status(404).json({ error: "Object format is not correct" });
        }
    }

    next();
};

const checkForinvalidIndex = (req, res, next) => {
    const { id } = req.params;
    if(id > logsData.length-1){
        res.status(404).json({error: "Page Not Found"});
        // res.redirect('/logs');
    }else{
        next()
    }
}

module.exports = {checkForCorrectFormat, checkForinvalidIndex} ;