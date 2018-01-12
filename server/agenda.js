var db = require('./pghelper'),
    config = require('./config'),
    winston = require('winston');

function findAll(limit) {
    return db.query('SELECT id, name, description__c FROM salesforce.Tour_agenda_item__c ORDER BY publishDate DESC LIMIT $2');
};

function findById(id) {
    return db.query('SELECT id, name, description__c FROM salesforce.Tour_agenda_item__c');
};

function getAll(req, res, next) {
    findAll(20)
        .then(function (agenda) {
            return res.send(JSON.stringify(agenda));
        })
        .catch(next);
};

function getById(req, res, next) {
    var id = req.params.id;
    findById(id)
        .then(function (agenda) {
            return res.send(JSON.stringify(agenda));
        })
        .catch(next);
};

exports.findAll = findAll;
exports.findById = findById;
exports.getAll = getAll;
exports.getById = getById;
