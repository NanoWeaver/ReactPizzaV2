import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaSkeleton = (props) => (
  <ContentLoader
    className="pizz-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="130" cy="136" r="110" />
    <rect x="0" y="271" rx="10" ry="10" width="280" height="28" />
    <rect x="0" y="316" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="428" rx="10" ry="10" width="90" height="27" />
    <rect x="128" y="418" rx="30" ry="30" width="151" height="45" />
  </ContentLoader>
);

export default PizzaSkeleton;
