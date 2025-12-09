const FilterMenu = ({ showFilter, toggleFilter, toggleCategory, toggleAllergens, showAllergens, toggleAllergen }) => {
  if (!showFilter) return null;

  return (
    <div>
      <ul>
        <li><button onClick={() => toggleCategory("pizza")}>Pizza</button></li>
        <li><button onClick={() => toggleCategory("burger")}>Burger</button></li>
        <li><button onClick={() => toggleCategory("salad")}>Salad</button></li>

        <li>
          <button onClick={toggleAllergens}>Allergens</button>
          {showAllergens && (
            <div>
              <ul>
                <li><button onClick={() => toggleAllergen("dairy")}>dairy</button></li>
                <li><button onClick={() => toggleAllergen("gluten")}>gluten</button></li>
                <li><button onClick={() => toggleAllergen("egg")}>egg</button></li>
                <li><button onClick={toggleAllergens}>close</button></li>
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
