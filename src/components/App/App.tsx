// @ts-nocheck
import React, { useEffect, useState } from 'react';
import "./App.scss";
import AdvisorCard from '../AdvisorCard/AdvisorCard';
import { faker } from '@faker-js/faker';
import TableHeader from '../TableHeader/TableHeader';
import api from "../../axios"
import { IAdvisor, IFilter } from '../../interfaces/interfaces';
import { LANGUAGES, STATUSES } from '../../shared/variables';
import Filters from '../Filters/Filters';
import Loader from '../Loader/Loader';


function App() {
  const [advisors, setAdvisors] = useState<IAdvisor[]>([]);
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getAdvisors();
  }, [filters])

  const addAdvisors = () => {
    for (let i = 0; i < 2; i++) {
      api.post('api/add/advisors', {
        icon: faker.image.avatarLegacy(), 
        fullName: faker.person.fullName(),
        status: faker.helpers.arrayElement(STATUSES),
        reviews: faker.number.int(1000),
        onSiteSince: faker.date.past({ years: 3, refDate: '2023-06-11' }).toDateString().slice(3),
        language: faker.helpers.arrayElement(LANGUAGES)
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
    }
  }

  const getAdvisors = () => {
    setLoading(true)
    api.get('api/advisors')
    .then(res => {
      const data = res.data;
      if (filters.length !== 0) {
        console.log(filters);
        const filteredAdvisors = data.filter(advisor => 
          filters.reduce((acc, filter) => {
            return acc && advisor[filter.key] === filter.value}, true)
        )
      setAdvisors(filteredAdvisors)
      } else {
        setAdvisors(data)
      }
      setLoading(false);
    })
    .catch(error => {
      throw new Error(error)
    })
  }
  

  const sortAdvisorsByReviewCount = (order: 'ascending' | 'descending'): IAdvisors[] => {
    const sortedAdvisors = [...advisors];
  
    sortedAdvisors.sort((a, b) => {
      if (order === 'ascending') {
        return a.reviews - b.reviews;
      } else {
        return b.reviews - a.reviews;
      }
    });
  
    setAdvisors(sortedAdvisors);
  }

  return (
    <div className="App">
      <Filters filters={filters} setFilters={setFilters}/>
      <TableHeader sortAdvisors={sortAdvisorsByReviewCount}/>
      {advisors.length !== 0 
        ? advisors.map(adv => <AdvisorCard key={adv._id} advisor={adv}/>)
        : <div className='no-message'>No advisors</div>}
        {loading && <Loader />}
    </div>
  );
}

export default App;