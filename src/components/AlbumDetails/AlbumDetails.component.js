import React, {Component} from 'react';
import {Header, Segment} from 'semantic-ui-react';
import S3ImageUpload from '../S3ImageUpload/S3ImageUpload'

class AlbumDetails extends Component {
    render() {
        return (
            <Segment>
                <Header as='h3'>{this.props.album.name}</Header>
                <S3ImageUpload albumId={this.props.album.id}/>
                <p>TODO: Show photos for this album</p>
            </Segment>
        )
    }
}

export default AlbumDetails