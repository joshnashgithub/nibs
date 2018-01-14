var db = require('./pghelper'),
    winston = require('winston');

/**
 * Get the user's wish list
 * @param req
 * @param res
 * @param next
 */
function getItems(req, res, next) {

    var userId = req.userId;

    db.query("SELECT Tour_agenda_item__c.id, Tour_agenda_item__c.name, Date_Time__c, description__c, picture_url__c, link_url__c FROM salesforce.Tour_agenda_item__c INNER JOIN salesforce.Tour__c ON salesforce.Tour__c.sfid = salesforce.Tour_agenda_item__c.tour__c INNER JOIN salesforce.Contact ON salesforce.Contact.tour__c = salesforce.Tour__c.sfid WHERE userId=$1 ORDER BY Date_Time__c", [userId])
        .then(function (agenda) {
            console.log(JSON.stringify(agenda));
            return res.send(JSON.stringify(agenda));
        })
        .catch(next);
};


exports.getItems = getItems;
