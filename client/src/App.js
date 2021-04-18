import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Status from './components/Status';
import Transaction from './components/Transaction';
import AddStatusForm from './components/addStatusForm';
import AddTransactionForm from './components/addTransactionForm';


const apiPath = "http://localhost:5000/api";


const fetchAllStatuses = async() => {
  const { data: statuses } = await axios.get(`${apiPath}/statuses`);
  return statuses;
}

const fetchAllTransactions = async() => {
  const { data: transactions } = await axios.get(`${apiPath}/transactions`);
  return transactions;
}


const App = () => {
  const [ statuses, setStatuses ] = useState([]);
  const [ transactions, setTransactions ] = useState([]);

  useEffect(() => {
    
    fetchAllStatuses().then(({ data: statuses }) => {
      setStatuses(statuses);
    }).catch(error => {
      console.log(error.message);
    });

    fetchAllTransactions().then(({ data: transactions }) => {
      setTransactions(transactions);
    }).catch(error => {
      console.log(error.message);
    });

  }, []);

  const onStatusAdd = async (status) => {
    try {
        const {data: result} = await axios({
        method: 'post',
        url: `${apiPath}/statuses`,
        data: status
      });

      setStatuses([...statuses, result.data])
    } catch(ex) {
      // console.log(ex.response);
      console.log(ex.response.data.error);
    }
  }

  const onTransactionAdd = async (transaction) => {
    try {
        const {data: result} = await axios({
        method: 'post',
        url: `${apiPath}/transactions`,
        data: transaction
      });
      console.log(result.data);
      setTransactions([...transactions, result.data])
    } catch(ex) {
      console.log(ex.message);
      console.log(ex.response);
      // console.log(ex.response.data.error);
    }
  }

  const onStatusDelete = async (statusId) => {
    const { data: result } = await axios.delete(`${apiPath}/statuses/${statusId}`);
    if (result.data.ok) {
      setStatuses(statuses.filter(status => status._id !== statusId));
      setTransactions(transactions.filter(transaction => transaction.from._id !== statusId
        && transaction.to._id != statusId));
    }
  }

  const onTransactionDelete = async (transactionName) => {
    const { data: result } = await axios.delete(`${apiPath}/transactions/${transactionName}`);
    if (result.data.ok) {
      setTransactions(transactions.filter(transaction => transaction.name != transactionName));
    }
  }

  return (
    <div>
      <div>
        <AddStatusForm onStatusAdd={onStatusAdd} />
      </div>
      <div>
        <AddTransactionForm statuses={statuses} onTransactionAdd={onTransactionAdd} />
      </div>
      <h1>Statuses</h1>
      <ul>{ statuses.map(status =>
        <li key={ status.name }> <Status statusInfo = { status }
        onStatusDelete={onStatusDelete}/> </li>
        )}
      </ul>
      <h1>Transactions</h1>
      <ul>{ transactions.map(transaction =>
        <li key={ transaction.name }> <Transaction transactionInfo = { transaction }
        onTransactionDelete={onTransactionDelete} /> </li>
        )}</ul>
    </div>
  );
}

export default App;
