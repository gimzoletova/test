import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import HomePage from './HomePage';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            showError : false
        }
    }
    handleLogin(e) {
        e.preventDefault();
        Meteor.loginWithPassword(e.target.username.value, e.target.password.value, (err) => {
            if (err)
                this.setState(() => ({showError : true}));
            else
                ReactDOM.render(<HomePage />, document.getElementById('render-target'));
        });
    }
    render () {
        return <div>
            <form onSubmit={this.handleLogin}>
                username or email: <input type="text" id="username" /><br/>
                password: <input type="password" id="password" /><br/>
                <button>Login</button>
            </form>
            {this.state.showError && <p>Login failed</p>}
        </div>;
    }
}