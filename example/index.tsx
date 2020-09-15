import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Box, CssGrid, BigCalendar } from '../.';


import '../jrad.css';
import { BehaviorSubject } from 'rxjs';

const App = () => {
    const bs = new BehaviorSubject<any>(null);
    return (
        <Box fg="default" bg="body" m="0" p="0">
            <Box bg="header" style={{ height:'40px' }}>
                JeffRad Header
            </Box>
            <BigCalendar mm={8} yyyy={2020} mt="2" mx="2" />

        </Box>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));
