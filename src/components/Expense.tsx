import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, TextInput, FormField } from 'grommet';

import { ReceiptId, ExpenseId, Note, Price, UpdateNoteAction, UpdatePriceAction, ReceiptTrackerState } from '../store/types';
import { updateNote, updatePrice } from '../store/actions';

interface OwnProps {
    id: ExpenseId;
    receiptId: ReceiptId;
}

interface StateProps {
    note?: Note;
    price?: Price;
    updateNote: (receiptId: ReceiptId, expenseId: ExpenseId, note: Note) => UpdateNoteAction;
    updatePrice: (receiptId: ReceiptId, expenseId: ExpenseId, price: Price) => UpdatePriceAction;
}

type ExpenseProps = OwnProps & StateProps

interface ExpenseState {
    price?: string;
    priceErrorMessage: string;
}

class Expense extends Component<ExpenseProps, ExpenseState> {

    private readonly priceErrorMessage: string = 'Provide a number :)'

    public state: ExpenseState = {
        priceErrorMessage: ''
    };

    private handlePriceInput = (price: string): void => {
        const parsedPrice = Number(price)
        const { id, receiptId, updatePrice } = {...this.props}
        if (parsedPrice != NaN && parsedPrice > 0) {
            this.setState({ price })
            updatePrice(receiptId, id, parsedPrice)
            this.setState({ priceErrorMessage: '' })
        } else {
            this.setState({ price })
            updatePrice(receiptId, id, 0)
            this.setState({ priceErrorMessage: this.priceErrorMessage })
        }
    }

    public render(): JSX.Element {
        return (
            <Box 
                direction='row'
                gap='small'
            >
                <FormField>
                    <TextInput 
                        placeholder='Add a note' 
                        value={this.props.note} 
                        onChange={(event): UpdateNoteAction => this.props.updateNote(
                            this.props.receiptId, this.props.id, event.target.value
                        )} 
                    />
                </FormField>
                <FormField error={this.state.priceErrorMessage}>
                    <TextInput 
                        placeholder='Add a price' 
                        value={this.state.price || ''} 
                        onChange={(event): void => this.handlePriceInput(event.target.value)}
                    />
                </FormField>
            </Box>
        )
    }
}

const mapStateToProps = (state: ReceiptTrackerState, ownProps: OwnProps) => {
    return {
        note: state.receipts.get(ownProps.receiptId).expenses.get(ownProps.id).note,
        price: state.receipts.get(ownProps.receiptId).expenses.get(ownProps.id).price
    }
}

const mapDispatchToProps = { updateNote, updatePrice }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Expense)
