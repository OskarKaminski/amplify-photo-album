import React, {Component} from 'react';
import {Header, Segment} from 'semantic-ui-react';
import S3ImageUpload from '../S3ImageUpload/S3ImageUpload'
import PhotosList from '../PhotosList/PhotosList'
import AlbumMembers from '../AlbumMembers/AlbumMembers'
import AddUsernameToAlbum from '../AddUsernameToAlbum/AddUsernameToAlbum'

class AlbumDetails extends Component {
    render() {
        return (
            <Segment>
                <Header as='h3'>{this.props.album.name}</Header>

                <Segment.Group>
                    <Segment>
                        <AlbumMembers members={this.props.album.members} />
                    </Segment>
                    <Segment basic>
                        <AddUsernameToAlbum albumId={this.props.album.id} />
                    </Segment>
                </Segment.Group>

                <S3ImageUpload albumId={this.props.album.id}/>
                <PhotosList photos={this.props.album.photos.items} />
            </Segment>
        )
    }
}

export default AlbumDetails