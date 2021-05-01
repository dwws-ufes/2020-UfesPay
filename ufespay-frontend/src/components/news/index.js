import React, { useEffect, useState } from 'react';

import './news.css';

import TransferCard from '../transfer-card';
import { listTransactions } from '../../services/TransactionService';

export default function News() {
  
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const resp = await listTransactions();
      setTransactions(resp.transactions);
    };

    loadData();
  }, []);

  return (
    <div className="container-transactions-list">
      <div className="content-transactions-list">
        {transactions.map(transaction => (
          <TransferCard key={transaction._id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}
