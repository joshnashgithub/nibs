var db = require('./pghelper'),
    config = require('./config'),
    winston = require('winston');

function findAll(limit) {
    return db.query('SELECT Tour_agenda_item__c.id as tour_agenda_id, Tour_agenda_item__c.description__c as tour_agenda_item_desc, Tour_hotel__c.description__c as tour_hotel_desc, Tour_hotel__c.picture_url__c as tour_hotel_pic FROM Tour_agenda_item__c as tour_agenda_table INNER JOIN Tour_hotel__c as tour_hotel_table ON tour_agenda_table.tour_hotel__c = tour_hotel_table.sfid ORDER BY publishDate DESC LIMIT $2');
};

function findById(id) {
    return db.query('SELECT Tour_agenda_item__c.id, Tour_agenda_item__c.name, Tour_agenda_item__c.description__c as agenda_item_desc, Tour_hotel__c.description__c as hotel_desc, Tour_hotel__c.picture_url__c FROM salesforce.Tour_agenda_item__c INNER JOIN salesforce.Tour_hotel__c ON salesforce.Tour_hotel__c.sfid = salesforce.Tour_agenda_item__c.tour_hotel__c');
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
