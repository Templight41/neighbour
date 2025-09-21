import React from 'react';

const ManufacturerContainer = ({manufacturerDetails, manufacturerUrl, manufacturer}) => {
  return (
    <div className='ManufacturerOuter'>
      <figure className="Image">
        <img src={manufacturerUrl || null} alt={manufacturer || ''} loading="lazy" width="342" height="342"/>
      </figure>

      <article className="Details">
        <div className="ManufacturerDetails">
          <h1>About the Manufacturer</h1>
          <h2>{manufacturer || 'N/A'}</h2>
          <h3>{manufacturerDetails?.location || 'N/A'}</h3>
          <h3>Established: {manufacturerDetails?.established || 'N/A'}</h3>
          <h4>{manufacturerDetails?.description || 'N/A'}</h4>
        </div>
      </article>
    </div>
  );
};

export default ManufacturerContainer;