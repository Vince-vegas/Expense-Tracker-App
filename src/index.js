'use strict';
const balance = document.querySelector('.exp-total');
const income = document.querySelector('.income');
const expense = document.querySelector('.expense');

const clearTransaction = document.querySelector('.clear-transaction');

const formIncome = document.querySelector('.form-income');
const formExpense = document.querySelector('.form-expense');

const inputIncome = document.querySelector('.input-income');
const inputExpense = document.querySelector('.input-expense');

const incomeAmount = document.querySelector('.income-amount');
const expenseAmount = document.querySelector('.expense-amount');

const transactionMenus = document.querySelector('.record-menu');

// Local Store Items
const localRecords = localStorage.getItem('transactions');

// if Local Store has items return the items on it
// if Local Store dont have items return []
let transactions = localRecords !== null ? JSON.parse(localRecords) : [];

// convert localstored to string and parse it
const toNumber = (number) => parseInt(JSON.parse(number));

transactionMenus.addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON') {
    const id = parseInt(e.target.parentElement.dataset.id);

    deleteTransaction(id);
    e.target.parentElement.remove();
  }
});

formIncome.addEventListener('submit', function (e) {
  e.preventDefault();

  if (inputIncome.value === '' || incomeAmount.value === '') {
    alert('enter an amount');
  } else {
    addTransactions(transactions, 'income', inputIncome, incomeAmount);
    updateLists(transactions);
  }
});

formExpense.addEventListener('submit', (e) => {
  e.preventDefault();

  if (inputExpense.value === '' || expenseAmount.value === '') {
    alert('enter an amount');
  } else {
    addTransactions(transactions, 'expense', inputExpense, expenseAmount);
    updateLists(transactions);
  }
});

incomeAmount.addEventListener('keypress', (e) => {
  console.log(e);
  if (e.keyCode === 61 || e.keyCode === 45 || e.which === 45) {
    console.log(1);
    e.preventDefault();
  }
});
expenseAmount.addEventListener('keypress', (e) => {
  if (e.keyCode === 61 || e.keyCode === 45 || e.which === 45) {
    e.preventDefault();
  }
});

transactions.forEach((list) => {
  let item = document.createElement('li');
  item.dataset.id = list.id;
  item.classList.add(list.type === 'income' ? 'income' : 'expense');

  item.innerHTML = `
    <button>X</button>
    <span class="inc-text">${list.name}</span>
    <span class="inc-number">${
      list.type === 'income' ? '+' : '-'
    }${list.amount.toLocaleString()}</span>
    `;

  transactionMenus.appendChild(item);
});

const addTransactions = (transactions, type, inputType, amountValue) => {
  const id = Math.floor(Math.random() * 100000000);
  const amount = parseInt(amountValue.value);

  let objList = {
    id,
    type,
    name: inputType.value,
    amount,
  };

  let item = addDomList(inputType, type, amount, id);
  transactionMenus.appendChild(item);

  transactions.push(objList);
};

function updateLists(transactions) {
  let totalBalance = 0;
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((item) => {
    if (item.type === 'income') {
      totalIncome += item.amount;
    } else {
      totalExpense += item.amount;
    }
  });

  totalBalance = totalIncome - totalExpense;

  balance.innerText = totalBalance.toLocaleString();
  income.innerText = totalIncome.toLocaleString();
  expense.innerText = totalExpense.toLocaleString();

  inputIncome.value = '';
  incomeAmount.value = '';
  inputExpense.value = '';
  expenseAmount.value = '';

  localStorage.setItem('transactions', JSON.stringify(transactions));
  localStorage.setItem('balance', totalBalance);
  localStorage.setItem('expense', totalExpense);
  localStorage.setItem('income', totalIncome);
}

// add list to dom
function addDomList(inputType, listType, amount, id) {
  let item = document.createElement('li');
  item.dataset.id = id;
  item.classList.add(listType);

  item.innerHTML = `
      <button>X</button>
      <span class="inc-text">${inputType.value}</span>
      <span class="inc-number">${
        listType === 'income' ? '+' : '-'
      }${amount.toLocaleString()}</span>
      `;

  return item;
}

const deleteTransaction = (id) => {
  transactions = transactions.filter((item) => item.id !== id);
  updateLists(transactions);
};

clearTransaction.addEventListener('click', () => {
  balance.innerText = 0;
  income.innerText = 0;
  expense.innerText = 0;
  transactions = [];
  transactionMenus.innerHTML = '';
  localStorage.clear();
});

updateLists(transactions);
