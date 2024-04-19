import React, { createContext, useContext, useState, useEffect } from 'react';

const SearchInputContext = createContext();

export const useSearchInputContext = () => useContext(SearchInputContext);

export const SearchInputProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <SearchInputContext.Provider value={{ searchInput, setSearchInput }}>
      {children}
    </SearchInputContext.Provider>
  );
};
