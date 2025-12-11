import { useState, useEffect } from 'react';

export const useAllergens = () => {
  const [allergens, setAllergens] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://test.onesnzeroes.dev/api/v1/misc/allergen");
        const data = await res.json();
        setAllergens(data);
      } catch (err) {
        console.error("Failed to fetch allergens:", err);
      }
    }
    load();
  }, []);

  return allergens;
};
