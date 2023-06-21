// @ts-nocheck
import React, { useEffect, useState, useRef, useCallback } from "react";
import "./App.scss";
import AdvisorCard from "../AdvisorCard/AdvisorCard";
import TableHeader from "../TableHeader/TableHeader";
import api from "../../axios";
import { IAdvisor, IFilter } from "../../interfaces/interfaces";
import Filters from "../Filters/Filters";
import Loader from "../Loader/Loader";

function App() {
  const [advisors, setAdvisors] = useState<IAdvisor[]>([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const getAdvisors = useCallback(() => {
    setLoading(true);
    api
      .get("api/advisors", {
        params: {
          limit: limit,
          language: filters.language,
          status: filters.status,
          sortBy: sortBy
        },
      })
      .then((res) => {
        const data = res.data.advisors;
        setAdvisors(data);

        setLoading(false);
        setHasMore(data.length < res.data.count);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, [filters, limit, sortBy]);

  useEffect(() => {
      getAdvisors();
  }, [filters, limit, sortBy, getAdvisors]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const isBottomOfContainer =
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 1;

    if (isBottomOfContainer && hasMore) {
      setLimit((prevLimit) => prevLimit + 10);
    }
  }, [hasMore, setLimit]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <div className="App">
      <div className="container">
        <Filters filters={filters} setFilters={setFilters} />
        <TableHeader sortAdvisors={setSortBy} />
        <div ref={containerRef} className="advisors">
          {advisors.length !== 0 ? (
            advisors.map((adv) => <AdvisorCard key={adv._id} advisor={adv} />)
          ) : (
            <div className="no-message">No advisors</div>
          )}
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
}

export default App;
