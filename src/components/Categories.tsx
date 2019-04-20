import React from 'react';
import { connect } from 'react-redux';
import { Select } from 'grommet';

import { ReceiptTrackerState } from '../store/types';
import { updateCategory } from '../store/actions';

import categories from '../constants/categories';

interface LinkStateToProps {
    category?: string;
}

interface LinkDispatchToProps {
    updateCategory: (receiptId: string, category: string) => void;
}

interface OwnProps {
    receiptId: string;
}

type CategoriesProps = OwnProps & LinkStateToProps & LinkDispatchToProps;

const Categories = ({ receiptId, category, updateCategory }: CategoriesProps): JSX.Element => (
    <Select
        placeholder="Select a Category"
        value={category || ''}
        size="medium"
        onChange={(event): void => updateCategory(receiptId, event.value)}
        options={categories.toJS()}
    />
);

const mapStateToProps = (state: ReceiptTrackerState, ownProps: OwnProps): LinkStateToProps => {
    return {
        category: state.receipts.get(ownProps.receiptId).category,
    };
};

const mapDispatchToProps: LinkDispatchToProps = { updateCategory };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Categories);
