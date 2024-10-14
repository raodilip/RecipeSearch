import React from 'react';
import OfflineToggle from './OfflineToggle'

function SearchBar({ fetchRecipes, isMobile, query, setQuery, cuisine, setCuisine, isOffline, handleToggle }) {
    return (
    <>
    <h1 className="text-center mt-5">Recipe Search</h1>
        <form onSubmit={fetchRecipes} className="row align-items-center" style={{
            justifyContent: "center",
            alignItems: "end!important",
            flexFlow: isMobile ? "column" : "unset"
        }}>
            <div className="mb-3 col-auto">
                <label htmlFor="query" className="form-label">Enter a recipe name:</label>
                <input type="text" id="query" className="form-control" value={query} onChange={e => setQuery(e.target.value)} placeholder="e.g., Chicken" required />
            </div>

            {
                /* Cuisine Dropdown */
            }

            <div className="mb-3 col-auto">
                <label htmlFor="cuisine" className="form-label">Select Cuisine:</label>
                <select id="cuisine" className="form-select" value={cuisine} onChange={e => setCuisine(e.target.value)}>
                    <option value="Indian">Indian</option>
                    <option value="Asian">Asian</option>
                    <option value="British">British</option>
                    <option value="Caribbean">Carribean</option>
                    <option value="Central Europe">Central Europe</option>
                    <option value="Chinese">Chinese</option>
                    <option value="American">American</option>
                    <option value="French">French</option>
                </select>
            </div>
            <div className="mb-3 col-auto" style={{
                alignSelf: "end"
            }}>
                <button type="submit" className="btn btn-primary">Search</button>
            </div>
            <div className="mb-3 col-auto" style={{
                alignSelf: "end"
            }}>
                <OfflineToggle isOffline={isOffline} onToggle={handleToggle} />
            </div>
        </form>
    </>);
}
export default SearchBar;

  