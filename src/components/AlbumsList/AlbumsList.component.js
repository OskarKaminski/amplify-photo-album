import React from 'react';
import {Header, List, Segment} from 'semantic-ui-react';

class AlbumsList extends React.Component {
    albumItems () {
        return this.props.albums.map(album =>
            <li key={album.id}>
                {album.owner}: {album.name}
            </li>);
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