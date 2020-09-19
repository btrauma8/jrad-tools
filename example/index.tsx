import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button, Flex, FlexVCenter, Box, BigCalendar, Dropdown, DropdownItem, Icon, Textarea, Input, Checkbox, modal, ModalContainer } from '../.';
import { BehaviorSubject } from 'rxjs';
import '../jrad.css';

const App = () => {

    const [ val, setVal ] = React.useState<string>('');
    const [ num, setNum ] = React.useState<number>(10);
    const [ chk, setChk ] = React.useState<boolean>(false);
    const bs = new BehaviorSubject<any>(null);

    const items:DropdownItem[] = [
        { label: "abc this is abc", value: "abc" },
        { label: "Har har har", value: "har" },
        { label: "xyz", value: "xyz" }
    ]

    const openHar = () => {
        modal.open({
            title: 'Yes sir',
            applyHeaderBg: true,
            render: <Box>How are you?</Box>
        })
    }

    return (
        <>
        <Box fg="default" bg="body" m="0" p="0">
            <Box bg="header" style={{ height:'40px' }}>
                JeffRad Header <Icon name="activity" />
            </Box>

            <FlexVCenter p="3">
                <Button type="default" icon="download" ml="1">default</Button>
                <Button type="link" ml="1">link</Button>
                <Button type="secondary" onClick={openHar} ml="1">secondary</Button>
                <Button type="danger" ml="1">danger</Button>
            </FlexVCenter>

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
                <Box>
                    <Textarea />
                </Box>
                <Box>
                    { chk ? 'yes': 'no' }
                    <Checkbox checked={chk} onToggle={x => setChk(x)} label="dude?" />
                </Box>

            </Flex>

            <BigCalendar mm={8} yyyy={2020} mt="2" mx="2" />

        </Box>
        <ModalContainer />
        </>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));
