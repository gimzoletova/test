import React, {Component} from 'react';

export default class UpdateUser extends Component {
    handleUpdate(e) {
        e.preventDefault();
        let userName = document.getElementById("username").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        Meteor.call('updateUser', this.props.user, userName, email, password);
    }
    render() {
        return (
            <div>
                <h2>Update User</h2>
                <form onSubmit={this.handleUpdate.bind(this)}>
                    Current user name: {this.props.user.username}
                    <input type="text" id="username" placeholder="Enter new user name"/><br/>
                    Current email: {this.props.user.emails[0].address}
                    <input type="text" id="email" placeholder="Enter new email address"/><br/>
                    Update password: <input type="text" id="password" placeholder="Enter new password"/>
                    <button>Update user</button>
                </form>
            </div>
        )
    }
}