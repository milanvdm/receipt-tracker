import { 
    ReceiptId, ExpenseId, Category, Note, Price,
    ADD_RECEIPT, UPDATE_CATEGORY, ADD_EXPENSE, UPDATE_NOTE, UPDATE_PRICE, 
    ReceiptTrackerActionType
} from './types'

export const addReceipt = (): ReceiptTrackerActionType => {
    return({ type: ADD_RECEIPT })
}

export const updateCategory = (receiptId: ReceiptId, category: Category): ReceiptTrackerActionType => {
    return({ 
        type: UPDATE_CATEGORY,
        payload: {
            receiptId,
            category
        }
    })
}

export const addExpense = (receiptId: ReceiptId): ReceiptTrackerActionType => {
    return({ 
        type: ADD_EXPENSE,
        payload: {
            receiptId
        }
    })
}

export const updateNote = (receiptId: ReceiptId, expenseId: ExpenseId, note: Note): ReceiptTrackerActionType => {
    return({ 
        type: UPDATE_NOTE,
        payload: {
            receiptId,
            expenseId,
            note
        }
    })
}

export const updatePrice = (receiptId: ReceiptId, expenseId: ExpenseId, price: Price): ReceiptTrackerActionType => {
    return({ 
        type: UPDATE_PRICE,
        payload: {
            receiptId,
            expenseId,
            price
        }
    })
}
