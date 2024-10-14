import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import OfflineToggle from './OfflineToggle';

function Recipe(props) {
    const [query, setQuery] = useState('');
    const [cuisine, setCuisine] = useState('American')
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state
    const [timeTaken, setTimeTaken] = useState(0);
    const [isOffline, setIsOffline] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const apiUrl = process.env.REACT_APP_RECIPE_ENDPOINT;
    //choose the screen size 
    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();
    }, [])

    useEffect(() => {
        setRecipes([]);
    }, [query, cuisine])

    const fetchRecipes = async (e) => {
        if (e)
            e.preventDefault();
        setRecipes([]);
        if (!isOffline && query !== '' && cuisine !== '') {
            setLoading(true);
            try {
                const requestBody = {
                    query: query,
                    cuisine: cuisine
                };

                const startTime = performance.now();
                // Send POST request with JSON body
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                    mode: 'cors',
                    // Send the body as JSON
                });
                // const response = await fetch(`http://localhost:8080/api/recipes?query=${query}&cuisine=${cuisine}`);
                const data = await response.json();
                const endTime = performance.now();
                setTimeTaken((endTime - startTime).toFixed(2));
                setRecipes(data);
                localStorage.setItem(`${query.toLowerCase()}-${cuisine.toLowerCase()}`, JSON.stringify(data));
            } catch (error) {
                console.error('Error fetching recipes:', error);
                if (isOffline) {
                    const offlineData = localStorage.getItem(`${query}-${cuisine}`);
                    if (offlineData) {
                        setRecipes(JSON.parse(offlineData));
                    }
                }
            } finally {
                setLoading(false); // Stop loading after the API response is received
            }
        }

        else if (isOffline) {
            const offlineData = localStorage.getItem(`${query.toLowerCase()}-${cuisine.toLowerCase()}`);
            if (offlineData) {
                setRecipes(JSON.parse(offlineData));
            }
        }
    };

    useEffect(() => {
        if (!isOffline) {
            fetchRecipes();
        } else {
            const startTime = performance.now();
            const offlineData = localStorage.getItem(`${query.toLowerCase()}-${cuisine.toLowerCase()}`);
            if (offlineData) {
                setRecipes(JSON.parse(offlineData));
            }
            const endTime = performance.now();
            setTimeTaken((endTime - startTime).toFixed(2));
        }
    }, [isOffline]);

    const handleToggle = () => {
        setIsOffline(prev => !prev);
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">Recipe Search</h1>
            <form onSubmit={fetchRecipes} className="row align-items-center" style={{
                justifyContent: "center",
                alignItems: "end!important",
                flexFlow: isMobile ? "column" : "unset",
            }}>
                <div className="mb-3 col-auto">
                    <label htmlFor="query" className="form-label">Enter a recipe name:</label>
                    <input
                        type="text"
                        id="query"
                        className="form-control"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g., Chicken"
                        required
                    />
                </div>

                {/* Cuisine Dropdown */}

                <div className="mb-3 col-auto">
                    <label htmlFor="cuisine" className="form-label">Select Cuisine:</label>
                    <select
                        id="cuisine"
                        className="form-select"
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                    >
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
                <div className="mb-3 col-auto" style={{ alignSelf: "end" }}>
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
                <div className="mb-3 col-auto" style={{ alignSelf: "end" }}>
                    <OfflineToggle isOffline={isOffline} onToggle={handleToggle} />
                </div>
                {/* <div class="mb-3 col-auto form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        <label class="form-check-label" for="flexSwitchCheckDefault">Offline Mode</label>
                </div> */}
            </form>

            {loading && <Loading />}
            {recipes.length > 0 && <div>
                <span>
                    <strong>Source API:</strong> Edamam API &nbsp;
                    <strong>Total No. of Results:</strong> {recipes.length} &nbsp;
                    <strong>Search Keyword:</strong> {query} &nbsp;
                    {/* <p><strong>Page No Retrieved:</strong> {page}</p> */}
                    <strong>Time Taken for API Call:</strong> {timeTaken} ms &nbsp;
                    <h4>List of Recipes:</h4>
                    <ul>
                        <div className="row">
                            {recipes.map((recipe, index) => (
                                <div className="col-md-4 mb-4" key={index}>
                                    <div className="card">
                                        <img src={recipe.image} className="card-img-top" alt={recipe.label} />
                                        <div className="card-body">
                                            <h5 className="card-title">{recipe.label}</h5>
                                            <a href={recipe.uri} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                                View Recipe
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ul>

                </span>
            </div>}
        </div>
    );
}

export default Recipe;