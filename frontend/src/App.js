import ApartmentsList from './ApartmentsList';
import axios from 'axios';
import {useState} from "react";

const API_URL = 'http://127.0.0.1:8000/api/apartments/'

function App() {
  const [Apartments, setApartments]= useState([])
  async function getApartments() {
    const response = await axios.get(API_URL)
    setApartments(response.data)
  }

  return (
    <div className="App">
      <button onClick={getApartments}>Обновить список</button>
    <ApartmentsList Apartments={Apartments}/>
    </div>
  );
}

export default App;
