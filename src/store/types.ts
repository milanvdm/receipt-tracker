import { Map } from 'immutable';

export type ReceiptId = string;
export type ExpenseId = string;

export type Category = string;
export type Note = string;
export type Price = number;

export interface ReceiptData {
    id: ReceiptId;
    category?: Category;
    expenses: Map<ExpenseId, ExpenseData>;
}
export interface ExpenseData {
    id: ExpenseId;
    note?: Note;
    price?: Price;
}

export interface ReceiptTrackerState {
    readonly receipts: Map<ReceiptId, ReceiptData>;
}

export const ADD_RECEIPT = 'ADD_RECEIPT';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const UPDATE_PRICE = 'UPDATE_PRICE';

export interface AddReceiptAction {
    type: typeof ADD_RECEIPT;
}

export interface UpdateCategoryAction {
    type: typeof UPDATE_CATEGORY;
    payload: {
        receiptId: ReceiptId;
        category: Category;
    };
}

export interface AddExpenseAction {
    type: typeof ADD_EXPENSE;
    payload: {
        receiptId: ReceiptId;
    };
}

export interface UpdateNoteAction {
    type: typeof UPDATE_NOTE;
    payload: {
        receiptId: ReceiptId;
        expenseId: ExpenseId;
        note: Note;
    };
}

export interface UpdatePriceAction {
    type: typeof UPDATE_PRICE;
    payload: {
        receiptId: ReceiptId;
        expenseId: ExpenseId;
        price: Price;
    };
}

export type ReceiptTrackerActionType =
    | AddReceiptAction
    | UpdateCategoryAction
    | AddExpenseAction
    | UpdateNoteAction
    | UpdatePriceAction;
