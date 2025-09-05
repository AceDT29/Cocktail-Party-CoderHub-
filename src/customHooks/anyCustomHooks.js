import { useEffect, useState } from "react";

export function useSearchByName(name) {
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

export const useGenerateList = (letters) => {
  const [randomList, setRandomList] = useState([]);

  useEffect(() => {
    if (!letters || letters.length === 0) return;
    const fetchData = async () => {
      try {
        const requests = letters.map(l =>
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${l}`)
            .then(res => res.json())
            .then(data => {
              // Tomar un cóctel aleatorio del resultado si hay
              if (data.drinks && data.drinks.length > 0) {
                return data.drinks[Math.floor(Math.random() * data.drinks.length)];
              }
              return null;
            })
        );
        const results = await Promise.all(requests);
        // Filtrar nulos y dejar solo cócteles válidos
        setRandomList(results.filter(Boolean));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [letters]);

  return randomList;
}