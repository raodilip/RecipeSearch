import {  } from './SearchBar';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import SearchResult from './SearchResult.jsx';
import SearchBar from './SearchBar';

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
            <SearchBar fetchRecipes={fetchRecipes} isMobile={isMobile} query={query} setQuery={setQuery} cuisine={cuisine} setCuisine={setCuisine} isOffline={isOffline} handleToggle={handleToggle} />
            {loading && <Loading />}
            <br/>
            {recipes.length > 0 && 
            <SearchResult   query={query} timeTaken={timeTaken} recipes={recipes}  />
            }
        </div>
    );
}
export default Recipe;