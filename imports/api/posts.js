import { Mongo } from 'meteor/mongo';
 
export const Posts = new Mongo.Collection('posts');

Meteor.methods ({
    'addPost' (group, user, body) {
        Posts.insert({group, user, body});
    }
});