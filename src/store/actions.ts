import { 
    ReceiptId, ExpenseId, Category, Note, Price,
    ADD_RECEIPT, UPDATE_CATEGORY, ADD_EXPENSE, UPDATE_NOTE, UPDATE_PRICE, 
    AddReceiptAction, UpdateCategoryAction, AddExpenseAction, UpdateNoteAction, UpdatePriceAction
} from './types'

export const addReceipt = (): AddReceiptAction => {
    return({ type: ADD_RECEIPT })
}

export const updateCategory = (receiptId: ReceiptId, category: Category): UpdateCategoryAction => {
    return({ 
        type: UPDATE_CATEGORY,
        payload: {
            receiptId,
            category
        }
    })
}

export const addExpense = (receiptId: ReceiptId): AddExpenseAction => {
    return({ 
        type: ADD_EXPENSE,
        payload: {
            receiptId
        }
    })
}

export const updateNote = (receiptId: ReceiptId, expenseId: ExpenseId, note: Note): UpdateNoteAction => {
    return({ 
        type: UPDATE_NOTE,
        payload: {
            receiptId,
            expenseId,
            note
        }
    })
}

export const updatePrice = (receiptId: ReceiptId, expenseId: ExpenseId, price: Price): UpdatePriceAction => {
    return({ 
        type: UPDATE_PRICE,
        payload: {
            receiptId,
            expenseId,
            price
        }
    })
}
