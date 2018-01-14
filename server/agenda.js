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
    console.log("Josh user id is:" + userId);

    db.query("SELECT Tour_agenda_item__c.name, Date_Time__c, description__c, picture_url__c, link_url__c, Contact.id FROM salesforce.Tour_agenda_item__c, salesforce.Contact, salesforce.Tour__c WHERE salesforce.Contact.tour__c = salesforce.Tour_agenda_item__c.tour__c AND salesforce.Contact.id=$1 ORDER BY Date_Time__c", [userId])
        
        .catch(next);
};


exports.getItems = getItems;
