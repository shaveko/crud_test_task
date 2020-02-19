const logger = require('../util/logger');

function list(req, res, next) {
    res.send('list');
}

function create(req, res, next) {
    res.status(201).send('create');
}

function update(req, res, next) {
    res.send('update');
}

function del(req, res, next) {
    res.send('delete');
}


module.exports = {list, create, update, del};