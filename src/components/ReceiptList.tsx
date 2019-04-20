import React from 'react';
import { connect } from 'react-redux';
import { Box , Table, TableBody, TableRow, TableCell } from 'grommet';
import { List } from 'immutable';

import { ReceiptData, ReceiptTrackerState } from '../store/types';

import Receipt from './Receipt';

interface ReceiptListProps { 
    receipts: List<ReceiptData>;
}

const ReceiptList = ({ receipts }: ReceiptListProps): JSX.Element =>
    <Box margin='small' >
        <Table alignSelf='center'>
            <TableBody>
                {receipts.map((receipt): JSX.Element =>
                    <TableRow key={receipt.id}>
                        <TableCell>
                            <Receipt id={receipt.id} />
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </Box>

const mapStateToProps = (state: ReceiptTrackerState) => {
    return {
        receipts: state.receipts.valueSeq().toList()
    }
}

export default connect(
    mapStateToProps
)(ReceiptList)
