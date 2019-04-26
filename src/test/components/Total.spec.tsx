import React from 'react';
import { cleanup, render } from 'react-testing-library';

import Total from '../../app/components/Total';

afterEach(cleanup);

test('Total correctly shows a number', (): void => {
    const { getByText } = render(<Total value={10} />);
    const totalElement = getByText('10');

    expect(totalElement).toBeDefined();
});

test('Total correctly shows undefined as 0', (): void => {
    const { getByText } = render(<Total value={(undefined as unknown) as number} />);
    const totalElement = getByText('0');

    expect(totalElement).toBeDefined();
});
