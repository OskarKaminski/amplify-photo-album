import React from 'react';
import {graphqlOperation} from 'aws-amplify/lib/index';
import {getAlbum} from '../graphql/queries';
import {Connect} from 'aws-amplify-react';
import AlbumDetails from '../components/AlbumDetails/AlbumDetails.component'
import {onCreatePhoto} from '../graphql/subscriptions';

class AlbumDetailsContainer extends React.Component {
    onNewPhoto = (prevQuery, newData) => {
        // When we get data about a new album,
        // we need to put in into an object
        // with the same shape as the original query results,
        // but with the new data added as well
        console.log(newData);
        // let updatedQuery = Object.assign({}, prevQuery);
        // updatedQuery.listAlbums.items = prevQuery.listAlbums.items.concat([newData.onCreateAlbum]);
        // return updatedQuery;
        return prevQuery
    }

    render () {
        return (
            <Connect
                query={graphqlOperation(getAlbum, {id: this.props.id})}
                subscription={graphqlOperation(onCreatePhoto)}
                onSubscriptionMsg={this.onNewPhoto}
            >
                {({data, loading, errors}) => {
                    if (loading) {
                        return <div>Loading...</div>;
                    }
                    if (!data.getAlbum) return;

                    return <AlbumDetails album={data.getAlbum}/>;
                }}
            </Connect>
        );
    }
}

export default AlbumDetailsContainer