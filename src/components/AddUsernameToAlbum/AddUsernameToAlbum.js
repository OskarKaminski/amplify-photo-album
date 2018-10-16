import React, {Component} from 'react'
import {Input} from 'semantic-ui-react'
import {graphqlOperation, API} from 'aws-amplify'
import {AddUsernameToAlbumMutation} from '../../graphql/mutations';

class AddUsernameToAlbum extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    handleSubmit = async (event) => {
        event.preventDefault();
        const result = await API.graphql(graphqlOperation(AddUsernameToAlbumMutation, { username: this.state.username, albumId: this.props.albumId }));
        console.log(`Added ${this.state.username} to album id ${result.data.addUsernameToAlbum.id}`);
        this.setState({ username: '' });
    }
    render() {
        return (
            <Input
                type='text'
                placeholder='Username'
                icon='user plus'
                iconPosition='left'
                action={{ content: 'Add', onClick: this.handleSubmit }}
                name='username'
                value={this.state.username}
                onChange={this.handleChange}
            />
        )
    }
}

export default AddUsernameToAlbum