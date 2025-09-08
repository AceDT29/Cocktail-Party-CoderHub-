import { useState, useEffect } from "react"

export const useRandomQuery = (letters) => {
  const [randomList, setRandomList] = useState([]);

  useEffect(() => {
    if (!letters || letters.length === 0) return;
    const fetchData = async () => {
      try {
        const requests = letters.map(l =>
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${l}`)
            .then(res => res.json())
            .then(data => {
              if (data.drinks && data.drinks.length > 0) {
                return data.drinks[Math.floor(Math.random() * data.drinks.length)];
              }
              return null;
            })
        );
        const results = await Promise.all(requests);
        setRandomList(results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [letters]);

  return randomList;
}