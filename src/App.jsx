import React from 'react';
import SeachList from './Components/List';
import ErrorBoundry from './Components/error-boundry';

import styles from './App.module.scss';
import SearchInput from './Components/SearchInput';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <SearchInput />
        <ErrorBoundry>
          <SeachList />
        </ErrorBoundry>
      </header>
    </div>
  );
}

export default App;
