import { observable, action } from 'mobx';
import uuid from 'uuid/v4';

interface ReceiptData { id: string; category?: string; expenseList: ExpenseData[] }

interface ExpenseData { id: string; note?: string; price?: number }

class Store {

    @observable 
    public receiptList: ReceiptData[] = [];
  
    @action
    public addReceipt(): void {
        const receipt = { id: uuid(), expenseList: [] }
        this.receiptList.push(receipt);
    }

    @action
    public updateCategory(receiptId: string, category: string): void {

    }

    @action
    public addExpense(receiptId: string): void {
        
    }

    @action
    public updateNote(expenseId: string, note: string): void {
        
    }

    @action
    public updatePrice(expenseId: string, price: number): void {
        
    }
}
  
export { 
    Store,
    ReceiptData,
    ExpenseData
}
