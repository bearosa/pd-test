const api = () => {
  const endpoint = "https://api.pipedrive.com/v1"
  const token = "290c2923e9ba28b742d935c14f2a741886ca6368"

	const getHeader = () => {
    return {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  };

  const getPersonsList = async ({limit = 10, start = 0}) => {
    const path = "/persons"

    try {
      let response = await fetch(
        `${endpoint}${path}?start=${JSON.stringify(start)}&limit=${limit}&api_token=${token}`,
        {
          method: 'GET',
          headers: getHeader()
        });
      let persons = response.json();
      return persons;
    } catch (event) {
      console.error(`There was a problem with getPersonsList(): ${event.message}`);
    }
  };

  const addPerson = async ({body}) => {
    const path = "/persons"

    try {
      let response = await fetch(
        `${endpoint}${path}&api_token=${token}`,
        {
          method: 'POST',
          headers: getHeader(),
          body
        });
      let person = response.json();
      return person;
    } catch (event) {
      console.error(`There was a problem with addPerson(): ${event.message}`);
    }
  };

  const deletePerson = async ({id}) => {
    const path = `/persons/${id}`

    try {
      let response = await fetch(
        `${endpoint}${path}&api_token=${token}`,
        {
          method: 'DELETE',
          headers: getHeader()
        });
      let person = response.json();
      return person;
    } catch (event) {
      console.error(`There was a problem with deletePerson(): ${event.message}`);
    }
  };

  return {
    getPersonsList,
    addPerson,
    deletePerson
  }
}

export default api
