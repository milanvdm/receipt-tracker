import uuid from 'uuid/v4'
import { Map } from 'immutable'

import { 
    ReceiptTrackerState, ReceiptId, ReceiptData, ExpenseData, ExpenseId,
    ADD_RECEIPT, UPDATE_CATEGORY, ADD_EXPENSE, UPDATE_NOTE, UPDATE_PRICE,
    ReceiptTrackerActionType 
} from "./types";


const initialState: ReceiptTrackerState = {
    receipts: Map<ReceiptId, ReceiptData>()
}
  
const ReceiptTrackerReducer = (
    state = initialState,
    action: ReceiptTrackerActionType
): ReceiptTrackerState => {
    switch (action.type) {
        case ADD_RECEIPT: {
            const id = uuid()
            const receipt = { id: id, expenses: Map<ReceiptId, ExpenseData>() }
            return {
                receipts: state.receipts.set(id, receipt)
            }
        }
        case UPDATE_CATEGORY: {
            return {
                receipts: state.receipts.setIn(
                    [action.payload.receiptId, 'category'],
                    action.payload.category
                )
            }
        }
        case ADD_EXPENSE: {
            const id = uuid()
            const expense = { id: id }
            return {
                receipts: state.receipts.updateIn(
                    [action.payload.receiptId, 'expenses'],
                    (expenses: Map<ExpenseId, ExpenseData>) => expenses.set(id, expense)
                )
            }
        }
        case UPDATE_NOTE: {
            return {
                receipts: state.receipts.setIn(
                    [action.payload.receiptId, 'expenses', action.payload.expenseId, 'note'], 
                    action.payload.note
                )
            }
        }
        case UPDATE_PRICE: {
            return {
                receipts: state.receipts.setIn(
                    [action.payload.receiptId, 'expenses', action.payload.expenseId, 'price'], 
                    action.payload.price
                )
            }
        }
        default: {
            return state
        }
    }
}

export default ReceiptTrackerReducer
