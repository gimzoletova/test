import React, {Component} from 'react';
// import {Posts} from '../api/posts';

export default class NewPostForm extends Component {
    handleNewPost(e) {
        e.preventDefault();
        let body = document.getElementById("post_body").value.trim();
        if (body.length > 0)
            Meteor.call('addPost', this.props.group, this.props.user, body);
            document.getElementById("post_body").value = '';
    }

    render() {        
        return (
            <div>
                <h2>What is on your mind?</h2>
                <form onSubmit={this.handleNewPost.bind(this)}>
                    <textarea id="post_body" style={{width: "100%", height: "100px"}}/>
                    <button>Send</button>
                </form>
            </div>
        );
    }
}