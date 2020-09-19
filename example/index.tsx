import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Flex, Box, BigCalendar, Dropdown, DropdownItem, Icon, Textarea, Input } from '../.';
import { BehaviorSubject } from 'rxjs';
import '../jrad.css';

const App = () => {

    const [ val, setVal ] = React.useState<string>('');
    const [ num, setNum ] = React.useState<number>(10);
    const bs = new BehaviorSubject<any>(null);

    const items:DropdownItem[] = [
        { label: "abc this is abc", value: "abc" },
        { label: "Har har har", value: "har" },
        { label: "xyz", value: "xyz" }
    ]
    return (
        <Box fg="default" bg="body" m="0" p="0">
            <Box bg="header" style={{ height:'40px' }}>
                JeffRad Header <Icon name="activity" />
            </Box>

            <Flex>

                <Dropdown
                    items={items}
                    value={items.find(x => x.value==val)}
                    setValue={setVal}
                />
                <Input
                    value={num}                    
                    numeric={{ float: true }}
                    setValue={setNum}
                />

            </Flex>
            <Flex>
                here is text area:
                <Textarea />

            </Flex>

            <BigCalendar mm={8} yyyy={2020} mt="2" mx="2" />

        </Box>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));
