import React from 'react';
import { AppBar } from '@material-ui/core';

export const Header: React.FC = () => {
  return (
    <div className="headerDiv">
      <AppBar
        style={{
          backgroundColor: '#282c34',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <h2>Caleb & Brown Cryptocurrency List</h2>
      </AppBar>
    </div>
  );
};
