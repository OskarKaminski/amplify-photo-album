import React, {Component} from 'react';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import {withAuthenticator} from 'aws-amplify-react';
import Routing from './router';

Amplify.configure(aws_exports);

class App extends Component {
    render () {
        return (
            <div className="App">
                <Routing />
            </div>
        );
    }
}

export default withAuthenticator(App, {includeGreetings: true})
