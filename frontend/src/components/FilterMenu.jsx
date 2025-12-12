import getImageUrl from "../utils/getImageUrl";
import "./FilterMenu.css";

const FilterMenu = ({
    showFilter,
    toggleFilter,
    toggleCategory,
    toggleAllergens,
    showAllergens,
    toggleAllergen,
    allergens,
    categories,
    selectedCategories = [],
    selectedAllergens = [],
}) => {
    if (!showFilter) return null;

    return (
        <div id="filter-menu">
            <div id="filter-menu-categories">
                <ul>
                    {categories.map((cat, i) => (
                        <li key={i}>
                            <button
                                onClick={() => toggleCategory(cat)}
                                className={
                                    selectedCategories.includes(cat)
                                        ? "filter-btn active"
                                        : "filter-btn"
                                }
                            >
                                {cat}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div id="filter-menu-allergens">
                <button onClick={toggleAllergens}>Allergens</button>
                {showAllergens && (
                    <div id="allergens-list">
                        <ul>
                            {allergens.map((a) => (
                                <li key={a.allergen_id}>
                                    <button
                                        onClick={() =>
                                            toggleAllergen(a.allergen_name)
                                        }
                                        className={
                                            selectedAllergens.includes(
                                                a.allergen_name
                                            )
                                                ? "allergen-button active"
                                                : "allergen-button"
                                        }
                                    >
                                        <span className="allergen-name">
                                            {a.allergen_name}
                                        </span>
                                        <img
                                            className="allergen-icon"
                                            src={getImageUrl(
                                                a.allergen_icon_url
                                            )}
                                            alt={a.allergen_name}
                                        />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div id="filter-menu-close">
                <button onClick={toggleFilter}>Close</button>
            </div>
        </div>
    );
};

export default FilterMenu;
