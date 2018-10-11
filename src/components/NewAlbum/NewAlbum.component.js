import React, {Component} from 'react';
import {API, graphqlOperation} from 'aws-amplify/lib/index';
import {createAlbum} from '../../graphql/mutations';
import {Header, Input, Segment} from 'semantic-ui-react';

class NewAlbum extends Component {
    constructor (props) {
        super(props);
        this.state = {
            albumName: ''
        };
    }

    handleChange = (event) => {
        let change = {};
        change[event.target.name] = event.target.value;
        this.setState(change);
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const result = await API.graphql(graphqlOperation(createAlbum, {input: this.state.albumName}));
        console.info(`Created album with id ${result.data.createAlbum.id}`);
    }

    render () {
        return (
            <Segment>
                <Header as='h3'>Add a new album</Header>
                <Input
                    type='text'
                    placeholder='New Album Name'
                    icon='plus'
                    iconPosition='left'
                    action={{content: 'Create', onClick: this.handleSubmit}}
                    name='albumName'
                    value={this.state.albumName}
                    onChange={this.handleChange}
                />
            </Segment>
        )
    }
}

export default NewAlbum