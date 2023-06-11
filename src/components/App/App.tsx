import React from 'react';
import AdvisorCard from '../AdvisorCard/AdvisorCard';
import { faker } from '@faker-js/faker';
import TableHeader from '../TableHeader/TableHeader';

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


  return (
    <div className="App">
      <TableHeader />
      <AdvisorCard advisor={advisor}/>
    </div>
  );
}

export default App;
