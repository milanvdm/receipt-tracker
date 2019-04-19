import React from 'react';
import { Box } from 'grommet';

import Total from '../components/Total';
import ReceiptList from '../components/ReceiptList';
import AddButton from '../components/AddButton';
import { Store } from '../store/Store'

interface HomeProps { store: Store }

const Home = ({ store }: HomeProps): JSX.Element =>
    <Box 
        background='light-4'
        border 
        round
        fill
        elevation='small'
    >
        <Box 
            id="test" 
            overflow='scroll'
            fill='vertical'
        >
            <ReceiptList
                receipts={store.receipts.valueSeq().toList()}
                updateCategory={store.updateCategory}
                addExpense={store.addExpense}
                updateNote={store.updateNote}
                updatePrice={store.updatePrice}
            />
        </Box>
        <Box
            border='top'
            align='center'
            round={{ "size": "small", "corner": "bottom" }}
            direction='row'
        >
            <Box 
                flex='grow' 
                align='start'
                pad={{left: 'medium'}}
            >
                <AddButton label='Add Receipt' onClick={(): void => store.addReceipt()} />
            </Box>
            <Box
                flex='grow'
                align='end'
                pad={{right: 'medium', bottom: 'small', top: 'small'}}
            >
                <Total value={123} />
            </Box>
        </Box>
    </Box>

export default Home
