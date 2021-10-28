import './App.css';
import React from 'react';
import { Header } from '../header/header';
import { CryptoTable } from '../cryptos/crypto-table';
import { AppFooter } from '../footer/footer';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <CryptoTable />
      <AppFooter />
    </>
  );
};

export default App;
