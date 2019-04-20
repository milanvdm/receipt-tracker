import React from 'react';
import { Box, Text } from 'grommet';
import { Currency } from 'grommet-icons';

import { Price } from '../store/types';

interface TotalProps { value: Price }

const Total = ({ value }: TotalProps): JSX.Element =>
    <Box 
        direction='row' 
        gap='small' 
        margin='small'
        align='center'
    >
        <Currency color='neutral-1' size='medium' /> 
        <Text size='large' weight='bold'>{value || 0}</Text>
    </Box>

export default Total
