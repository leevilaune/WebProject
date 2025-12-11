const FilterMenu = ({ showFilter, toggleFilter, toggleCategory, toggleAllergens, 
    showAllergens, toggleAllergen,allergens,categories }) => {
  if (!showFilter) return null;

  return (
    <div>
      <ul>
        {categories.map((cat, i) => (
          <li key={i}>
            <button onClick={() => toggleCategory(cat)}>{cat}</button>
          </li>
        ))}
        <li>
          <button onClick={toggleAllergens}>Allergens</button>
          {showAllergens && (
             <div>
              <ul>
                {allergens.map(a => (
                  <li key={a.allergen_id}>
                    <button onClick={() => toggleAllergen(a.allergen_name)}>
                      {a.allergen_name}
                      </button>
                  </li>
                    ))}
              </ul>
            </div>
          )}
        </li>

        <li><button onClick={toggleFilter}>close</button></li>
      </ul>
    </div>
  );
};

export default FilterMenu;
