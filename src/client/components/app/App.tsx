import './App.css';
import React from 'react';
import { Header } from '../header/header';
import { CryptoTable } from '../cryptos/crypto-table';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <CryptoTable />
    </>
  );
};

export default App;
