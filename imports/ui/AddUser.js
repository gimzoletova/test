import React, {Component} from 'react';

import Header from './Header'

export default class AddUser extends Component {
    addUser(e) {
        e.preventDefault();
        let userName = document.getElementById("userName").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        Meteor.call('addUser', userName, email, password);  
    }
    render () {
        return (
        <div>
            <Header />
            <h2>Add User</h2>
            <form onSubmit={this.addUser}>
                user name: <input type="text" id="userName"/>
                email: <input type="text" id="email"/>
                password: <input type="text" id="password"/>
                <button>Add user</button>
            </form>
        </div>);
    }
}