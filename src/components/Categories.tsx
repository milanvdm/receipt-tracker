import React from 'react';
import { Select } from 'grommet';
import { observer } from 'mobx-react'

import { categories } from '../constants/categories';

interface CategoriesProps { 
    receiptId: string; 
    category?: string;
    updateCategory: (receiptId: string, category: string) => void; 
}

const Categories = ({ receiptId, category, updateCategory }: CategoriesProps): JSX.Element =>
    <Select
        placeholder='Select a Category'
        value={category}
        size='medium'
        onChange={(event): void => updateCategory(receiptId, event.value)}
        options={categories.toJS()}
    />

export default observer(Categories)
