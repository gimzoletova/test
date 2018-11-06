import { Mongo } from 'meteor/mongo';
 
export const Groups = new Mongo.Collection('groups');


Meteor.methods ({
    'updateUsersOfGroup' (group, usersArray) {
        Groups.update({name: group}, {$set: {users: usersArray}});
    }
});