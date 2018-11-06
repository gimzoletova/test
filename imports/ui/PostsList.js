import React, {Component} from 'react';

import Post from './Post';

export default class PostsList extends Component {
    renderPosts() {
        return this.props.posts.map((post) => {
            let title = this.props.page==="group" ? `${post.user} posted:` : `You posted on ${post.group}:`;
            return <Post key={this.props.posts.indexOf(post)} title={title} body={post.body}/>;
        });
    }
    render () {        
      return (
        <div>
          {this.props.posts.length === 0 ? <h3>{this.props.page==="group" ? "Currently there are no posts in this gruop" : "You didn't post anything yet"}</h3> : <span><h3>{this.props.page==="group" ? "Posts:" : "Your posts:" }</h3>{this.renderPosts()}</span>
        }
        </div>
      );
    }
  }