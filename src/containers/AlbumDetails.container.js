import React from 'react';
import {graphqlOperation} from 'aws-amplify/lib/index';
import {getAlbum} from '../graphql/queries';
import {Connect} from 'aws-amplify-react';
import AlbumDetails from '../components/AlbumDetails/AlbumDetails.component'

class AlbumDetailsContainer extends React.Component {
    render () {
        return (
            <Connect
                query={graphqlOperation(getAlbum, {id: this.props.id})}
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