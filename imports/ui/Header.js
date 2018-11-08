import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import HomePage from './HomePage';
import UserPage from './UserPage';
import Login from './Login';
import ManageGroups from './ManageGroups';
import ManageUsers from './ManageUsers';

class Header extends Component {
    handleHomepage() {
        console.log("homepage");
        ReactDOM.render(<HomePage />, document.getElementById('render-target'));

    }
    handleUserpage() {
        console.log("userpage");
        ReactDOM.render(<UserPage user={[this.props.user]}/>, document.getElementById('render-target'));
    }
    handleLogout() {
        console.log("logout");
        Meteor.logout();
        ReactDOM.render(<Login />, document.getElementById('render-target'));
    }
    handleManageUsers() {   
        ReactDOM.render(<ManageUsers />, document.getElementById('render-target'));
    }
    handleManageGroups() {
        ReactDOM.render(<ManageGroups />, document.getElementById('render-target'));
    }
    render () {
        return (
        <div>
            <button onClick={this.handleHomepage}>Go to my homepage</button>
            <button onClick={this.handleUserpage.bind(this)}>Go to my userpage</button>
            {(this.props.user && this.props.user.admin) && <span> 
                                                              <button onClick={this.handleManageUsers}>Manage users</button>
                                                              <button onClick={this.handleManageGroups}>Manage groups</button>
                                                          </span>}
            <button onClick={this.handleLogout}>logout</button>
            <hr/>
        </div>);
    }
}

export default withTracker((props) => {
    return {
    user: Meteor.user()
    };
  })(Header);