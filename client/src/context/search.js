import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

const SearchPovider = ({ children }) => {
  const [keyword, setKeyword] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[keyword, setKeyword]}>
      {children}
    </SearchContext.Provider>
  );
};

//custom hook
const useSearch = () => useContext(SearchContext);

export { SearchPovider, useSearch };
