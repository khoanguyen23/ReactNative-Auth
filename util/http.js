import axios from 'axios';

const FireBase_URL = 'https://expenseapp-caee9-default-rtdb.firebaseio.com'

export async function storeExpense(expenseData) {
  const response= await axios.post(
    FireBase_URL+ '/expenses.json',
    expenseData
  );
  const id = response.data.name;
  return id ;
}

export async function fetchExpenses () {
    const response = await axios.get(
        FireBase_URL + '/expenses.json',
    );
    const expenses = [];

    for (const key in response.data) {
      const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description
      };
      expenses.push(expenseObj);
    }
  
    return expenses;
  }