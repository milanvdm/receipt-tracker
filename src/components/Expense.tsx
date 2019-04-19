import React, { Component } from 'react';
import { Box, TextInput, FormField } from 'grommet';
import { debounce } from 'lodash';

import { ReceiptId, ExpenseId } from '../store/Store'

interface ExpenseProps { 
    id: ExpenseId;
    receiptId: ReceiptId;
    note?: string;
    price?: number;
    updateNote: (receiptId: ReceiptId, expenseId: ExpenseId, note: string) => void;
    updatePrice: (receiptId: ReceiptId, expenseId: ExpenseId, price: number) => void;
}

interface ExpenseState { 
    note?: string;
    price?: number;
    priceErrorMessage?: string;
}

class Expense extends Component<ExpenseProps, ExpenseState> {

    private readonly debounceTimeMillis: number = 300
    private readonly priceErrorMessage: string = 'Please provide a numeric value :)'

    public state: ExpenseState = {};

    private handleNoteInput = (note: string): void => {
        const { id, receiptId, updateNote } = {...this.props}
        this.setState({ note: note })
        debounce((): void => updateNote(receiptId, id, note), this.debounceTimeMillis)
    }

    private handlePriceInput = (price: string): void => {
        const parsedPrice = Number(price)
        if (parsedPrice != NaN && parsedPrice > 0) {
            const { id, receiptId, updatePrice } = {...this.props}
            this.setState({ 
                price: parsedPrice,
                priceErrorMessage: undefined
            })
            debounce((): void => updatePrice(receiptId, id, parsedPrice), this.debounceTimeMillis)
        } else {
            this.setState({ priceErrorMessage: this.priceErrorMessage })
        }
    }

    public render(): JSX.Element {
        return (
            <Box 
                margin='small' 
                pad='small' 
                direction='row'
                gap='small'
            >
                <FormField>
                    <TextInput 
                        placeholder='Add a note' 
                        value={this.state.note} 
                        onChange={(event): void => this.handleNoteInput(event.target.value)} 
                    />
                </FormField>
                <FormField error={this.state.priceErrorMessage}>
                    <TextInput 
                        placeholder='Add a price' 
                        value={this.state.price} 
                        onChange={(event): void => this.handlePriceInput(event.target.value)}
                    />
                </FormField>
            </Box>
        )
    }
}

export default Expense
