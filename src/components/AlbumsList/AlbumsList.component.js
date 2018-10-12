import React from 'react';
import {Header, List, Segment} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

class AlbumsList extends React.Component {
    albumItems () {
        return this.props.albums.map(album =>
            <List.Item key={album.id}>
                <NavLink to={`/album/${album.id}`}>{album.name}</NavLink>
            </List.Item>);
    }

    render () {
        return (
            <Segment>
                <Header as='h3'>My Albums</Header>
                <List divided relaxed>
                    {this.albumItems()}
                </List>
            </Segment>
        );
    }
}

export default AlbumsList