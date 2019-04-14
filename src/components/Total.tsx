import React, { Component } from 'react';
import { Box, Text } from 'grommet';
import { Currency } from 'grommet-icons';

class Total extends Component {
    public render(): JSX.Element {
        return (
            <Box 
                direction='row-responsive' 
                gap='small' 
                margin='small'
            >
                <Currency color='neutral-1' /> 
                <Text>123</Text>
            </Box>
        );
    }
}

export default Total
