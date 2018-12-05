import React, { Component } from 'react'
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import get from 'lodash/get';
import Loader from './Loader';
import LyricList from './LyricList';
import LyricCreate from './LyricCreate';
import query from '../queries/fetchSong';

const SongDetail = ({ data: { loading, song }, params: { id } }) => {
  const title = get(song, 'title', 'wrong song id');

  if (loading) { return <Loader />; }
  return (
    <div>
      <Link to='/'>Back</Link>
      <h3>{title}</h3>
      <LyricList lyrics={song.lyrics} songId={id} />
      <LyricCreate songId={id} />
    </div>
  )
}

export default graphql(query, {
  options: (props) => ({ variables: { id: props.params.id } })
})(SongDetail);
