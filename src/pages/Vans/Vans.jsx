import { useState, Suspense } from 'react';
import {
  Link,
  useSearchParams,
  useLoaderData,
  defer,
  Await,
} from 'react-router-dom';
import { getVans } from '../../../api';

export function loader() {
  return defer({ vans: getVans() });
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const dataPromise = useLoaderData();

  const typeFilter = searchParams.get('type');

  if (error) {
    return <h1 aria-live="assertive">There was an error: {error}</h1>;
  }

  function renderVanElements(vans) {
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
      <>
        <div className="van-list-filter-buttons">
          <button
            className={`van-type simple ${
              typeFilter === 'simple' && 'selected'
            }`}
            onClick={() => setSearchParams({ type: 'simple' })}
          >
            Simple
          </button>
          <button
            className={`van-type luxury ${
              typeFilter === 'luxury' && 'selected'
            }`}
            onClick={() => setSearchParams({ type: 'luxury' })}
          >
            Luxury
          </button>
          <button
            className={`van-type rugged ${
              typeFilter === 'rugged' && 'selected'
            }`}
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
      </>
    );
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <Suspense fallback={<h2>Loading Vans ...</h2>}>
        <Await resolve={dataPromise.vans}>{renderVanElements}</Await>
      </Suspense>
    </div>
  );
}
