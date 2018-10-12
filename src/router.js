import React from 'react'
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import {Grid} from 'semantic-ui-react';
import AlbumListPage from './pages/AlbumList.page'
import AlbumDetailsContainer from './containers/AlbumDetails.container'

const Routing = () => (
    <Router>
        <Grid padded>
            <Grid.Column>
                <Route path="/" exact component={AlbumListPage}/>
                <Route
                    path="/album/:albumId"
                    render={() => <div><NavLink to='/'>Back to Albums list</NavLink></div>}
                />
                <Route
                    path="/album/:albumId"
                    render={props => <AlbumDetailsContainer id={props.match.params.albumId}/>}
                />
            </Grid.Column>
        </Grid>
    </Router>
);

export default Routing