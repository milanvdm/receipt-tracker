interface ReceiptData { id: number, category?: string, note?: string, price?: number }

class Store {
    private lastReceiptId = 0

    public receiptList: ReceiptData[] = [];
  
    public addReceipt() {
        const receiptId = this.lastReceiptId + 1;
        this.lastReceiptId = receiptId;
        const receipt = { id: receiptId }
        this.receiptList.push(receipt);
    }
  }
  
  export { 
      Store,
      ReceiptData
  }
