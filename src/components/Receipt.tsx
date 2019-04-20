import React from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';
import { sumBy } from 'lodash';

import { addExpense } from '../store/actions';
import { ReceiptId, AddExpenseAction, ReceiptTrackerState, Price } from '../store/types';

import Total from './Total';
import Categories from './Categories';
import AddButton from './AddButton';
import ExpenseList from './ExpenseList';

interface LinkStateToProps {
    total: Price;
}

interface LinkDispatchToProps {
    addExpense: (receiptId: ReceiptId) => AddExpenseAction;
}

interface OwnProps {
    id: ReceiptId;
}

type ReceiptProps = OwnProps & LinkStateToProps & LinkDispatchToProps

const Receipt = ({ id, total, addExpense }: ReceiptProps): JSX.Element => 
    <Box border margin='small' pad='small'>
        <Box direction='row' margin='medium' gap='small'>
            <Categories receiptId={id} />
            <AddButton label='Add Expense' onClick={(): AddExpenseAction => addExpense(id)} />
        </Box>
        <ExpenseList receiptId={id} />
        <Box align='end'>
            <Total value={total} />
        </Box>
    </Box>

const mapStateToProps = (state: ReceiptTrackerState, ownProps: OwnProps): LinkStateToProps => {
    return {
        total: sumBy(state.receipts.get(ownProps.id).expenses.valueSeq().toJS(), 'price')
    }
}

const mapDispatchToProps: LinkDispatchToProps = { addExpense }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Receipt)
