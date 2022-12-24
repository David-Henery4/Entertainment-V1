import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getContent } from "../features/content/contentSlice";
import { Trending, Content, LoadingSpinner } from "../components";
import { useState } from "react";
import handleSearch from "../search/searchFunction";

const Home = () => {
  const [searchQueryArray, setSearchQueryArray] = useState([]);
  const [queryLength, setQueryLength] = useState(0);
  const dispatch = useDispatch();
  const {
    allContentData,
    recommendedData,
    trendingContent,
    isLoading,
    searchQueryAndLocation,
    searchQuery,
  } = useSelector((store) => store.content);
  //
  useEffect(() => {
    const queriedItems = handleSearch(searchQuery, allContentData);
    setQueryLength(searchQuery.length);
    setSearchQueryArray(queriedItems);
  }, [searchQuery, allContentData]);
  //
  useEffect(() => {
    // dispatch(getContent());
  }, []);
  //
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {queryLength <= 0 ? (
            <>
              <Trending trendingData={trendingContent} />
              <Content
                name={"Recommended for you"}
                contentData={recommendedData}
              />
            </>
          ) : (
            <>
              <Content
                name={`Found ${searchQueryArray.length} result${
                  searchQueryArray.length === 1 ? "" : "s"
                } for "${searchQueryAndLocation.query}"`}
                contentData={searchQueryArray}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
