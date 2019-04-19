import { observable, action } from 'mobx';
import uuid from 'uuid/v4';
import { Map } from 'immutable'

import { Category } from '../constants/categories'

type ReceiptId = string
type ExpenseId = string

type Note = string
type Price = number

interface ReceiptData { id: ReceiptId; category?: Category; expenses: Map<ExpenseId, ExpenseData> }
interface ExpenseData { id: ExpenseId; note?: Note; price?: Price }

class Store {

    @observable 
    public receipts: Map<ReceiptId, ReceiptData> = Map<ReceiptId, ReceiptData>();
  
    @action
    public addReceipt(): void {
        const id = uuid()
        const receipt = { id: id, expenses: Map<ReceiptId, ExpenseData>() }
        this.receipts = this.receipts.set(id, receipt);
    }

    @action
    public updateCategory(receiptId: ReceiptId, category: Category): void {
        this.receipts = this.receipts.updateIn(
            [receiptId, 'category'], 
            (): Category => category
        )
    }

    @action
    public addExpense(receiptId: ReceiptId): void {
        const id = uuid()
        const expense = { id: id }
        this.receipts = this.receipts.updateIn(
            [receiptId, id], 
            (): ExpenseData => expense
        )
    }

    @action
    public updateNote(receiptId: ReceiptId, expenseId: ExpenseId, note: Note): void {
        this.receipts = this.receipts.updateIn(
            [receiptId, expenseId], 
            (): Note => note
        )
    }

    @action
    public updatePrice(receiptId: ReceiptId, expenseId: ExpenseId, price: Price): void {
        this.receipts = this.receipts.updateIn(
            [receiptId, expenseId], 
            (): Price => price
        )
    }
}
  
export { 
    Store,
    ReceiptId,
    ReceiptData,
    ExpenseId,
    ExpenseData
}
