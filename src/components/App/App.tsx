import React from 'react';
import AdvisorCard from '../AdvisorCard/AdvisorCard';
import { faker } from '@faker-js/faker';
import TableHeader from '../TableHeader/TableHeader';
import axios from 'axios';
import api from "../../axios"

function App() {

    const advisor = {
      icon: faker.image.avatarLegacy(), 
      fullName: faker.person.fullName(),
      status: faker.helpers.arrayElement(['online', 'offline']),
      reviews: faker.number.int(1000),
      onSiteSince: faker.date.past({ years: 3, refDate: '2023-06-11' }).toDateString().slice(3),
      language: faker.helpers.arrayElement([
        "German",
        "English",
        "Spanish",
        "Chinese",
        "Ukrainian",
        "French",
        "Swedish",
        "Danish",
      ])
  }

  const addAdvisors = () => {
    api.post('api/add/new-advisors', {...advisor})
    .then(response => console.log(response))
  }

  return (
    <div className="App">
      <button onClick={addAdvisors}>click</button>
      {/* <TableHeader />
      <AdvisorCard advisor={advisor}/> */}
    </div>
  );
}

export default App;
