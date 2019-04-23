import React from 'react';
import { cleanup, render } from 'react-testing-library';

import Total from '../../app/components/Total';

afterEach(cleanup);

test('can render a simple display of a number', () => {
    const { getByText } = render(<Total value={10} />);
    const totalElement = getByText('10');

    expect(totalElement).toBeDefined;
});

test('can render a simple display of undefined', () => {
    const { getByText } = render(<Total value={undefined as unknown as number} />);
    const totalElement = getByText('0');

    expect(totalElement).toBeDefined;
});
