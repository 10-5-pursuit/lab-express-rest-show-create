function invalidIndex(req, res, next) {
    const { arrayIndex } = req.params;

    if (isNaN(arrayIndex) || arrayIndex < 0) {
        res.status(400).json({ error: 'Invalid array index' });
    }
    next();
}

function validation(req, res, next) {
    if (!('captainName' in req.body)) {
        res.status(400).json({ error: `"captainName" key must be included` });
    } else if (typeof req.body.captainName !== 'string') {
        res.status(400).json({ error: 'Captain Name must be a text' });
    }

    if (!('title' in req.body)) {
        res.status(400).json({ error: `"title" key must be included` });
    } else if (typeof req.body.title !== 'string') {
        res.status(400).json({ error: 'Title must be a text' });
    }

    if (!('post' in req.body)) {
        res.status(400).json({ error: `"post" key must be included` });
    } else if (typeof req.body.post !== 'string') {
        res.status(400).json({ error: 'Post must be a text' });
    }

    if (!('mistakesWereMadeToday' in req.body)) {
        res.status(400).json({ error: `"mistakesWereMadeToday" key must be included` });
    } else if (typeof req.body.mistakesWereMadeToday !== 'boolean') {
        res.status(400).json({ error: '"Mistakes were made today" must be a boolean' });
    }

    if (!('daysSinceLastCrisis' in req.body)) {
        res.status(400).json({ error: `"daysSinceLastCrisis" key must be included` });
    } else if (typeof req.body.daysSinceLastCrisis !== 'number') {
        res.status(400).json({ error: '"Days since last crisis" must be a number' });
    }

    next();
}

module.exports = { invalidIndex, validation };