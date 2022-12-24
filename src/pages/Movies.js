import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Content, LoadingSpinner } from "../components";
import handleSearch from "../search/searchFunction";


const Movies = () => {
  const [searchQueryArray, setSearchQueryArray] = useState([]);
  const [queryLength, setQueryLength] = useState(0);
  const { moviesData, isLoading, searchQueryAndLocation, searchQuery } =
    useSelector((store) => store.content);
  //
  useEffect(() => {
    const queriedItems = handleSearch(searchQuery, moviesData)
    setSearchQueryArray(queriedItems)
    setQueryLength(searchQuery.length)
  }, [searchQuery, moviesData]);
  //
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {queryLength <= 0 ? (
            <Content name={"Movies"} contentData={moviesData} />
          ) : (
            <Content
              name={`Found ${searchQueryArray.length} result${
                searchQueryArray.length === 1 ? "" : "s"
              } for "${searchQueryAndLocation.query}"`}
              contentData={searchQueryArray}
            />
          )}
        </>
      )}
    </>
  );
};

export default Movies;
