import { useState } from 'react';

export const useFilter = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAllergens, setSelectedAllergens] = useState([]);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleAllergen = (allergen) => {
    if (selectedAllergens.includes(allergen)) {
      setSelectedAllergens(selectedAllergens.filter(a => a !== allergen));
    } else {
      setSelectedAllergens([...selectedAllergens, allergen]);
    }
  };

  const filterProducts = (products) => {
    return products.filter(p => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const allergenMatch = selectedAllergens.length === 0 || !p.allergens.some(a => selectedAllergens.includes(a.allergen_name));
      return categoryMatch && allergenMatch;
    });
  };

  return { selectedCategories, selectedAllergens, toggleCategory, toggleAllergen, filterProducts };
};
