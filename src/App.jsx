import React from 'react';
import SeachList from './Components/List';


import styles from './App.module.scss';
import SearchInput from './Components/SearchInput';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <SearchInput />
        <button onClick={() => {}}>Click</button>
        <SeachList searchResult={[]} />
       
      </header>
    </div>
  );
}

export default App;
