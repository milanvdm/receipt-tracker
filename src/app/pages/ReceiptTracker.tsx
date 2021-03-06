import React from 'react';
import { Box } from 'grommet';
import { connect } from 'react-redux';
import { sumBy } from 'lodash';
import { List } from 'immutable';

import { AddReceiptAction, Price, ReceiptTrackerState, ExpenseData } from '../store/types';
import { addReceipt } from '../store/actions';

import Total from '../components/Total';
import ReceiptList from '../components/ReceiptList';
import AddButton from '../components/AddButton';

interface LinkStateToProps {
    total: Price;
}

interface LinkDispatchToProps {
    addReceipt: () => AddReceiptAction;
}

type ReceiptTrackerProps = LinkStateToProps & LinkDispatchToProps;

const ReceiptTracker = ({ total, addReceipt }: ReceiptTrackerProps): JSX.Element => (
    <Box background="light-4" border round fill elevation="small">
        <Box id="test" overflow="scroll" fill="vertical">
            <ReceiptList />
        </Box>
        <Box border="top" align="center" round={{ size: 'small', corner: 'bottom' }} direction="row">
            <Box flex="grow" align="start" pad={{ left: 'medium' }}>
                <AddButton label="Add Receipt" onClick={(): AddReceiptAction => addReceipt()} />
            </Box>
            <Box flex="grow" align="end" pad={{ right: 'medium', bottom: 'small', top: 'small' }}>
                <Total value={total} />
            </Box>
        </Box>
    </Box>
);

const mapStateToProps = (state: ReceiptTrackerState): LinkStateToProps => {
    return {
        total: sumBy(
            state.receipts
                .valueSeq()
                .flatMap((receipt): List<ExpenseData> => receipt.expenses.valueSeq().toList())
                .toJS(),
            'price',
        ),
    };
};

const mapDispatchToProps: LinkDispatchToProps = { addReceipt };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ReceiptTracker);
