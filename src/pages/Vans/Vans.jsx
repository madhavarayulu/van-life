import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function Vans() {
  const [vans, setVans] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch('/api/vans')
      .then((res) => res.json())
      .then((data) => {
        setVans(data.vans);
      })
      .catch((err) => console.log(err));
  }, []);

  const typeFilter = searchParams.get('type');
  const displayedVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  const vanElements = displayedVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link
        to={van.id}
        state={{ search: `?${searchParams}`, type: typeFilter }}
      >
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          className={`van-type simple ${typeFilter === 'simple' && 'selected'}`}
          onClick={() => setSearchParams({ type: 'simple' })}
        >
          Simple
        </button>
        <button
          className={`van-type luxury ${typeFilter === 'luxury' && 'selected'}`}
          onClick={() => setSearchParams({ type: 'luxury' })}
        >
          Luxury
        </button>
        <button
          className={`van-type rugged ${typeFilter === 'rugged' && 'selected'}`}
          onClick={() => setSearchParams({ type: 'rugged' })}
        >
          Rugged
        </button>
        {typeFilter && (
          <button
            className="van-type clear-filters"
            onClick={() => setSearchParams({})}
          >
            Clear filter
          </button>
        )}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
