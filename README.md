# Receipt Tracker

## How to run

Start a local development server on `localhost:1234` with `yarn run dev`.

Run tests with `yarn test`.

Build a production package with `yarn run build`.

## Bugs

- `ExpenseList` and `ReceiptList` don't sort, so a newly added `Receipt` or `Expense` can appear anywhere in the rendered list. (Fix: order on creation time or monotonically increasing id).

## Improvements

- `ExpenseList` and `ReceiptList` could be abstracted into a generic `Table` component.
- Add type-safety to calls such as `state.receipts.getIn([ownProps.receiptId, 'category'], '')`.
- Folder structure does not really suit a DDD as it is currently split based on technical specification instead of conceptual ones.
