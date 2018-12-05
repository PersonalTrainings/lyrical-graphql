import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
  state = {
    title: ''
  }

  submitHandler = e => {
    e.preventDefault();

    this.props.mutate({
      variables: { title: this.state.title },
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/'));
  }

  render() {
    return (
      <div>
        <Link to='/'>Back</Link>       
        <h3>Create a New Song</h3>
        <form onSubmit={this.submitHandler}>
          <label htmlFor='title'>Song Title:</label>
          <input
            name='title'
            type='text'
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </form>        
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
