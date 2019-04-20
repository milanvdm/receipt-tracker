import React from 'react';
import { connect } from 'react-redux';
import { Select } from 'grommet';

import { ReceiptTrackerState, ReceiptData } from '../store/types';
import { updateCategory } from '../store/actions';

import categories from '../constants/categories'

interface OwnProps {
    receiptId: string; 
}

interface StateProps {
    category?: string;
    updateCategory: (receiptId: string, category: string) => void; 
}

type CategoriesProps = OwnProps & StateProps;

const Categories = ({ receiptId, category, updateCategory }: CategoriesProps): JSX.Element =>
    <Select
        placeholder='Select a Category'
        value={category || ''}
        size='medium'
        onChange={(event): void => updateCategory(receiptId, event.value)}
        options={categories.toJS()}
    />

const mapStateToProps = (state: ReceiptTrackerState, ownProps: OwnProps) => {
    return {
        category: state.receipts.get(ownProps.receiptId).category
    }
}

const mapDispatchToProps = { updateCategory }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Categories)
