import React, { Component } from 'react';
import { Box } from 'grommet';

import Total from '../components/Total';
import ReceiptList from '../components/ReceiptList';

class Home extends Component {
    public render(): JSX.Element {
        return (
            <Box background='light-4'>
                <Box 
                    border 
                    round
                    elevation='small'
                    background='dark-2' 
                >
                    <ReceiptList />
                    <Box 
                        border='top'
                        align='center'
                        round={{ "size": "small", "corner": "bottom" }}
                        fill
                        background='brand'
                    >
                        <Total />
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default Home
