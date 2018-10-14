import React, {Component} from 'react';
import {Header, Segment} from 'semantic-ui-react';
import S3ImageUpload from '../S3ImageUpload/S3ImageUpload'
import PhotosList from '../PhotosList/PhotosList'

class AlbumDetails extends Component {
    render() {
        return (
            <Segment>
                <Header as='h3'>{this.props.album.name}</Header>
                <S3ImageUpload albumId={this.props.album.id}/>
                <PhotosList photos={this.props.album.photos.items} />
            </Segment>
        )
    }
}

export default AlbumDetails