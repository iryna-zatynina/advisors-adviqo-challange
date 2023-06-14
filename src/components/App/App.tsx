import React, { useEffect, useState } from 'react';
import AdvisorCard from '../AdvisorCard/AdvisorCard';
import { faker } from '@faker-js/faker';
import TableHeader from '../TableHeader/TableHeader';
import api from "../../axios"
import { IAdvisor } from '../../interfaces/interfaces';

function App() {
  const [advisors, setAdvisors] = useState<IAdvisor[]>([]);

  useEffect(() => {
    getAdvisors();
  }, [])

  const addAdvisors = () => {
    for (let i = 0; i < 2; i++) {
      api.post('api/add/advisors', {
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
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
    }
  }

  const getAdvisors = () => {
    api.get('api/advisors')
    .then(res => {
      setAdvisors(res.data)
    })
  }

  return (
    <div className="App">
      <button onClick={addAdvisors}>click</button>
      <TableHeader />
      {advisors.map(adv => <AdvisorCard key={adv._id} advisor={adv}/>)}
    </div>
  );
}

export default App;
