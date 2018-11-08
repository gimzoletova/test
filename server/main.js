import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import '../imports/api/groups';
import '../imports/api/posts';

Meteor.startup(() => {
  Meteor.publish('userData', function () {
    if (this.userId) {
      return Meteor.users.find({}, {
        fields: { admin : 1,
                  emails : 1}  
      });
    } else {
      this.ready();
    }
  });
  
});

Meteor.methods ({
  'updateUser' (user, username, email, password) {
    if (username.length > 0)
      Meteor.users.update({_id: user._id}, {$set: {username: username}})
    if (email.length > 0){
      Meteor.users.update({"emails.address" : user.emails[0].address}, {$set: {"emails.$.address": email}});
    }
    if (password.length > 0)
      // console.log('change pass');
      
      Accounts.setPassword(user._id, password);
  },
  'deleteUser' (user) {
    Meteor.users.remove({_id : user._id});
    Meteor.call('deleteUserFromAllGroups',user._id);
    Meteor.call('deleteAllPostsOfUser', user._id)
  },
  'addUser' (username, email, password) {    
    Accounts.createUser({
      username,
      email,
      password
    });
  }
});
