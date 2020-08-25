import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
     return this.transactions
  }

  public getBalance(): Balance {


    const income = this.transactions.filter(transaction => transaction.type == 'income')
    const outcome = this.transactions.filter(transaction => transaction.type == 'outcome')

   const sumIncome = income.reduce( ( sum, { value } : { value: number } ) => sum + value , 0)
   const sumOutcome = outcome.reduce( ( sum, { value } : { value: number } ) => sum + value , 0)

   const balance =
     {
      balance: {
        income: sumIncome,
        outcome: sumOutcome,
        total: (sumIncome - sumOutcome),
      }
   }

   this.transactions.push(balance)
   return balance
    // const sumIncome = income.reduce((total, num) =>  total.value + num.value)
    // const sumOutcome = outcome.reduce((total, num) => total + num)
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type })

    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository;
