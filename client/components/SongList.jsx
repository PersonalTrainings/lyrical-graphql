import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Loader from './Loader';
import query from '../queries/fetchSongs';

class SongList extends Component {
  openSongDetailHandler = (id) => {
    hashHistory.push(`/songs/${id}`);
  }

  onSongDelete = (e, id) => {
    e.stopPropagation();
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => (
      <li 
        key={id} 
        className='song-item collection-item'
        onClick={() => this.openSongDetailHandler(id)}
      >
        {title}
        <i 
          className="delete-icon material-icons"
          onClick={(e) => this.onSongDelete(e, id)}
        >delete</i>
      </li>
    ));
  }

  render() {
    if (this.props.data.loading) { return <Loader />; }
    return (
      <div>
        <ul className='collection'>
          {this.renderSongs()}
        </ul>
        <Link 
          className="btn-floating btn-large red right"
          to='/songs/new'
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(
  graphql(query)(SongList)
);
