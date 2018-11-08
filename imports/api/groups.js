import { Mongo } from 'meteor/mongo';
 
export const Groups = new Mongo.Collection('groups');

Meteor.methods ({
    'updateUsersOfGroup' (group, userId, member) {
        if (!member)
            Groups.update({_id: group._id}, {$push: {users: userId}});
        else
            Groups.update({_id: group._id}, {$pull: {users: userId}});
    },
    'deleteUserFromAllGroups' (userId) {
        Groups.update({}, {$pull: {users: userId}}, {multi: true});
    },
    'updateGroup' (group, newName) {
        Groups.update({_id: group._id}, {$set: {name: newName}});
    },
    'addGroup' (newName) {
        Groups.insert({name: newName});
    }
});