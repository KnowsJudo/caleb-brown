import React from 'react';

export const AppFooter: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#282c34',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <div className="copyFoot">
        <span>Made with Create React App and Material UI</span>
        <p>&copy; Lachlan Bardwell 2021</p>
      </div>
    </footer>
  );
};
