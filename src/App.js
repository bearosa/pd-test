import React, { useEffect, useState } from "react";

import api from "api";
import logo from 'assets/pipedrive-logo.svg';
import PeopleList from "components/PeopleList";

import st from './app.module.scss';

function App() {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([]);
  const [start, setStart] = useState(0);

  // const fetchTransactions = () => {
  //   setLoading(true);
  //   console.log(start);
  //   api.getTransactionList({start}).then(tr =>{
  //     setLoading(false);
  //     setTransactions([...transactions, ...tr.items]);
  //     setStart(tr.last);
  //   })
  // }

  useEffect(() => {
    setLoading(true);
    api().getPersonsList({}).then(pr => {
      console.log(pr);
      setLoading(false);
      setPeople([...pr.data]);
      setStart(pr.next_start);
    })
  }, [])

  return (
    <div className={st.app}>
      <header className={st.appHeader}>
        <img src={logo} className={st.appLogo} alt="logo" />
      </header>
      <h3 className={st.title}>People's List</h3>
      <PeopleList people={people} className={st.list} />
    </div>
  );
}

export default App;
