import React from 'react'
import {Form} from 'semantic-ui-react'
import uuid from 'uuid'
import {createPhoto} from '../../graphql/mutations'
import {Storage, API, graphqlOperation} from 'aws-amplify'

class S3ImageUpload extends React.Component {
    constructor (props) {
        super(props);
        this.state = {uploading: false}
    }

    onChange = async (e) => {
        const file = e.target.files[0];
        const fileName = uuid();
        this.setState({uploading: true});
        const result = await Storage.put(
            fileName,
            file,
            {
                customPrefix: {public: 'uploads/'}
            }
        );
        console.log('Uploaded file: ', result);
        await API.graphql(graphqlOperation(createPhoto, {
            input: {
                bucketName: 'photoalbuma9b9573330f14d10a9916efcc68145aa',
                key: `uploads/${result.key}`,
                albumId: this.props.albumId
            }
        }))
        this.setState({uploading: false});
    }

    render () {
        return (
            <div>
                <Form.Button
                    onClick={() => document.getElementById('add-image-file-input').click()}
                    disabled={this.state.uploading}
                    icon='file image outline'
                    content={this.state.uploading ? 'Uploading...' : 'Add Image'}
                />
                <input
                    id='add-image-file-input'
                    type="file"
                    accept='image/*'
                    onChange={this.onChange}
                    style={{display: 'none'}}
                />
            </div>
        );
    }
}

export default S3ImageUpload