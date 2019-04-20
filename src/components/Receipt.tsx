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

interface OwnProps {
    id: ReceiptId;
}

interface StateProps {
    total: Price;
    addExpense: (receiptId: ReceiptId) => AddExpenseAction;
}

type ReceiptProps = OwnProps & StateProps

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

const mapStateToProps = (state: ReceiptTrackerState, ownProps: OwnProps) => {
    return {
        total: sumBy(state.receipts.get(ownProps.id).expenses.valueSeq().toJS(), 'price')
    }
}

const mapDispatchToProps = { addExpense }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Receipt)
