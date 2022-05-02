import React from "react";
import ArtItem from "./ArtItem";

function ArtList(props) {
  const { arts } = props;
  return (
    <div className="column">
      {arts.map((art) => (
        <ArtItem
          key={art.id}
          title={art.title}
          image={art.image}
          price={art.price}
          description={art.description}
          id={art.id}
        />
      ))}
    </div>
  );
}

export default ArtList;
