import React from 'react';
import {Grid} from 'semantic-ui-react';
import AlbumsListContainer from '../containers/AlbumsList.container';
import NewAlbum from '../components/NewAlbum/NewAlbum.component';

const AlbumListPage = () => (
    <Grid padded>
        <Grid.Column>
            <NewAlbum/>
            <AlbumsListContainer/>
        </Grid.Column>
    </Grid>
)

export default AlbumListPage
