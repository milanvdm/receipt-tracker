import React, { Component } from 'react';
import { Select } from 'grommet';

import categories from '../constants/categories';

class Categories extends Component {
    public state = { value: [], options: categories }

    public render(): JSX.Element {
        const { options, value } = this.state;
        return (
            <Select
                placeholder='Select a Category'
                value={value}
                size='medium'
                onSearch={(query: string): void => {
                    const regexp = new RegExp(query, 'i');
                    const matchedCategory = categories.filter((category: string): boolean => category.match(regexp));
                    this.setState({ options: matchedCategory });
                }}
                onChange={(event: any): void => this.setState({ value: event.value })}
                options={options}
            />
        );
    }
}

export default Categories
