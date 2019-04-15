import React from 'react';
import { Box } from 'grommet';

import Total from './Total';
import Categories from './Categories';
import AddButton from './AddButton';

const Receipt = (): JSX.Element => 
    <Box border margin='small' pad='small'>
        <Box direction='row' gap='small'>
            <Categories />
            <AddButton label='Add Expense' onClick={(): void => {}} />
        </Box>
        <Box align='end'>
            <Total value={123} />
        </Box>
    </Box>

export default Receipt
