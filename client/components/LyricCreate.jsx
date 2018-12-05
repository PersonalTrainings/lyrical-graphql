import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
  state = {
    content: ''
  }

  submitHandler = (e) => {
    e.preventDefault();

    this.props.mutate({
      variables: { content: this.state.content, songId: this.props.songId }
    }).then(() => this.setState({ content: ''}));
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <label htmlFor="lyric">Add a Lyric</label>
        <input 
          name="lyric" 
          type="text"
          value={this.state.content}
          onChange={e => this.setState({ content: e.target.value })}
        />
      </form>
    )
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
