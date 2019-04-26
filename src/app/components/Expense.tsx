import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, TextInput, FormField } from 'grommet';

import {
    ReceiptId,
    ExpenseId,
    Note,
    Price,
    UpdateNoteAction,
    UpdatePriceAction,
    ReceiptTrackerState,
} from '../store/types';
import { updateNote, updatePrice } from '../store/actions';

interface LinkStateToProps {
    note?: Note;
    price?: Price;
}

interface LinkDispatchToProps {
    updateNote: (receiptId: ReceiptId, expenseId: ExpenseId, note: Note) => UpdateNoteAction;
    updatePrice: (receiptId: ReceiptId, expenseId: ExpenseId, price: Price) => UpdatePriceAction;
}

interface OwnProps {
    id: ExpenseId;
    receiptId: ReceiptId;
}

type ExpenseProps = OwnProps & LinkStateToProps & LinkDispatchToProps;

interface ExpenseState {
    price?: string;
    priceErrorMessage: string;
}

class Expense extends Component<ExpenseProps, ExpenseState> {
    private readonly allowedDelimiter = ',';
    private readonly priceErrorMessage: string = 'Provide a number :)';

    public state: ExpenseState = {
        price: String(this.props.price),
        priceErrorMessage: '',
    };

    private handlePriceInput = (price: string): void => {
        const parsedPrice = Number(price.replace(this.allowedDelimiter, '.'));
        const { id, receiptId, updatePrice } = { ...this.props };
        if (parsedPrice != NaN && parsedPrice > 0) {
            this.setState({ price });
            updatePrice(receiptId, id, parsedPrice);
            this.setState({ priceErrorMessage: '' });
        } else {
            this.setState({ price });
            updatePrice(receiptId, id, 0);
            this.setState({ priceErrorMessage: this.priceErrorMessage });
        }
    };

    public render(): JSX.Element {
        return (
            <Box direction="row" gap="small">
                <FormField>
                    <TextInput
                        placeholder="Add a note"
                        value={this.props.note}
                        onChange={(event): UpdateNoteAction =>
                            this.props.updateNote(this.props.receiptId, this.props.id, event.target.value)
                        }
                    />
                </FormField>
                <FormField error={this.state.priceErrorMessage}>
                    <TextInput
                        placeholder="Add a price"
                        value={this.state.price || ''}
                        onChange={(event): void => this.handlePriceInput(event.target.value)}
                    />
                </FormField>
            </Box>
        );
    }
}

const mapStateToProps = (state: ReceiptTrackerState, ownProps: OwnProps): LinkStateToProps => {
    return {
        note: state.receipts.getIn([ownProps.receiptId, 'expenses', ownProps.id, 'note'], ''),
        price: state.receipts.getIn([ownProps.receiptId, 'expenses', ownProps.id, 'price'], 0),
    };
};

const mapDispatchToProps: LinkDispatchToProps = { updateNote, updatePrice };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Expense);
