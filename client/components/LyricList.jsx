import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {
  lyricLikeHandler = (id, likes) => {
    this.props.mutate({ 
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  }

  renderSongs() {
    return (this.props.lyrics || []).map(({ id, content, likes }) => (
      <li 
        key={id} 
        className='collection-item'
      >
        {content}
        <div className='vote-box'>
          <i
            className="like-icon material-icons"
            onClick={() => this.lyricLikeHandler(id, likes)}
          >thumb_up</i>
          <i>{likes}</i>
        </div>
      </li>
    ));
  }
  render() {
    return (
      <ul className='collection'>
        {this.renderSongs()}
      </ul>
    )
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
