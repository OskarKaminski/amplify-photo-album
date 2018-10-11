import {graphqlOperation} from 'aws-amplify/lib/index';
import {listAlbums} from '../graphql/queries';
import {onCreateAlbum} from '../graphql/subscriptions';
import {Connect} from 'aws-amplify-react';
import React from 'react';
import AlbumsList from '../components/AlbumsList/AlbumsList.component'

class AlbumsListContainer extends React.Component {

    onNewAlbum = (prevQuery, newData) => {
        // When we get data about a new album,
        // we need to put in into an object
        // with the same shape as the original query results,
        // but with the new data added as well
        let updatedQuery = Object.assign({}, prevQuery);
        updatedQuery.listAlbums.items = prevQuery.listAlbums.items.concat([newData.onCreateAlbum]);
        return updatedQuery;
    }

    render () {
        return (
            <Connect
                query={graphqlOperation(listAlbums)}
                subscription={graphqlOperation(onCreateAlbum)}
                onSubscriptionMsg={this.onNewAlbum}
            >
                {({data, loading, errors}) => {
                    if (loading) {
                        return <div>Loading...</div>;
                    }
                    if (!data.listAlbums) return;

                    return <AlbumsList albums={data.listAlbums.items}/>;
                }}
            </Connect>
        );
    }
}

export default AlbumsListContainer