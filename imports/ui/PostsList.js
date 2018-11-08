import React, {Component} from 'react';

import Post from './Post';

export default class PostsList extends Component {
    renderPosts() {
        return this.props.posts.map((post) => {
          return <Post key={this.props.posts.indexOf(post)} page={this.props.page} post={post}/>;
        });
    }
    render () {        
      return (
        <div>
          {this.props.posts.length === 0 ? <h3>{this.props.page==="group" ? "Currently there are no posts in this gruop" : "You didn't post anything yet"}</h3> : <span><h3>{this.props.page==="group" ? "Posts:" : "Your posts:" }</h3>{this.renderPosts()}</span>}
        </div>
      );
    }
  }