import React from 'react'
import { searchIcon } from '../assets'

const SearchInput = () => {
  return (
    <div className="w-72 flex justify-center items-center gap-6 col-start-2 col-end-12 smTab:w-96 xl:col-start-4 xl:col-end-lrgMainGridBeforeEnd">
      <img className="w-6 h-6 smTab:w-8 smTab:h-8" src={searchIcon} alt="search-icon" />
      <input
        className="text-base font-light w-full h-full outline-none bg-transparent"
        type="text"
        placeholder="Search for movies or TV shows"
      />
    </div>
  );
}

export default SearchInput