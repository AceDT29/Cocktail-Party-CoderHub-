import { useEffect, useState } from "react";

export function useSearchQuery(name) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (name == "") return;
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        const data = await response.json();
        setResults(data.drinks ? data.drinks[0] : []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [name]);

  return results;
}

