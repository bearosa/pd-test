import React, { useEffect, useState } from "react";

import api from "api";
import logo from 'assets/pipedrive-logo.svg';
import PeopleList from "components/PeopleList";
import Loading from "components/Loading";

import st from './app.module.scss';

function App() {
  //consts
  const limit = 1000;

  //state
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([]);

  //fetch
  const fetchPeople = () => {
    setLoading(true);
    api().getPersonsList({limit}).then(({data}) =>{
      setLoading(false);
      setPeople([...data]);
    })
  }

  //hooks
  useEffect(() => {
    fetchPeople();
  }, [])

  //render
  return (
    <div className={st.app}>
      <header className={st.appHeader}>
        <img src={logo} className={st.appLogo} alt="logo" />
      </header>
      <h3 className={st.title}>People's List</h3>
      <div className={st.listContainer}>
        {loading ?
          <Loading />
        :
          <PeopleList people={people} setPeople={setPeople} refetch={fetchPeople} className={st.list} />
        }
      </div>
    </div>
  );
}

export default App;
