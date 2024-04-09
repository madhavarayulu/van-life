import 'react';
import { useOutletContext } from 'react-router-dom';

export default function HostVanInfo() {
  const { currentVan } = useOutletContext();

  return (
    <section className="host-van-detail-info">
      <p>
        Name: <span>{currentVan.name}</span>
      </p>
      <p>
        Type: <span>{currentVan.type}</span>
      </p>
      <p>
        Description: <span>{currentVan.description}</span>
      </p>
      <p>
        Visibility: <span>Public</span>
      </p>
    </section>
  );
}
