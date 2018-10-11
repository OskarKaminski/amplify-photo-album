import React, {Component} from 'react';
import {Grid, Header} from 'semantic-ui-react';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import {withAuthenticator} from 'aws-amplify-react';
import AlbumsListContainer from './containers/AlbumsList.container';
import NewAlbum from './components/NewAlbum/NewAlbum.component';

Amplify.configure(aws_exports);

class App extends Component {
    render () {
        return (
            <div className="App">
                <Header as='h1'>Hello World!</Header>
                <Grid padded>
                    <Grid.Column>
                        <NewAlbum/>
                        <AlbumsListContainer/>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default withAuthenticator(App, {includeGreetings: true})
