import React, { Component } from 'react';
import { Box, Text , InfiniteScroll} from 'grommet';

const ITEMS: number[] = [];
while (ITEMS.length < 100) ITEMS.push(ITEMS.length);

class ReceiptList extends Component {
    public render(): JSX.Element {
        return (
            <Box 
                direction='column' 
                margin='small'
                overflow='scroll'
                height='large'
            >
                <InfiniteScroll 
                    items={ITEMS} 
                    step={10} 
                    replace 
                    scrollableAncestor='window'
                    onMore={(): void => console.log('!!! onMore')}
                >
                    {(item, index): JSX.Element => (
                        <Box
                            key={index}
                            pad='medium'
                            background={`neutral-${(index % 4) + 1}`}
                            align='center'
                        >
                            <Text size='large' weight='bold' color='white'>{index}</Text>
                        </Box>
                    )}
                </InfiniteScroll>
            </Box>
        );
    }
}

export default ReceiptList
