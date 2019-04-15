import React from 'react';
import { Box , Table, TableBody, TableRow, TableCell } from 'grommet';
import { observer } from 'mobx-react'

import Receipt from './Receipt';
import { ReceiptData } from '../store/Store'

interface ReceiptListProps { receiptList: ReceiptData[] }

const ReceiptList = ({ receiptList }: ReceiptListProps): JSX.Element =>
    <Box margin='small' >
        <Table alignSelf='center'>
            <TableBody>
                {receiptList.map((receipt): JSX.Element => (
                    <TableRow key={receipt.id}>
                        <TableCell>
                            <Receipt />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Box>

export default observer(ReceiptList)
