var db = require('./pghelper'),
    config = require('./config'),
    winston = require('winston');

return db.query('SELECT id, name, description__c, picture_url__c FROM salesforce.Tour_agenda_item__c INNER JOIN salesforce.Tour_hotel__c ON salesforce.Tour_agenda_item__c.tour_hotel__c = salesforce.Tour_hotel__c.sfid ORDER BY publishDate DESC LIMIT $2');

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
