import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Box } from '../.';
import '../jrad.css';
import { BehaviorSubject } from 'rxjs';

const App = () => {
    const bs = new BehaviorSubject<any>(null);
    return (
        <Box fg="default" bg="body" m="0" p="0">
            Har har har
            <Box bg="header">
                this is a header
            </Box>
        </Box>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));
