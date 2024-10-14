import React from 'react';

function SearchResult({query, timeTaken, recipes}) {
    return (<div>
              <span>
                  <strong>Source API:</strong> Edamam API &nbsp;
                  <strong>Total No. of Results:</strong> {recipes.length} &nbsp;
                  <strong>Search Keyword:</strong> {query} &nbsp;
                  <strong>Time Taken for API Call:</strong> {timeTaken} ms &nbsp;
                  <h4>List of Recipes:</h4>
                  <ul>
                      <div className="row">
                          {recipes.map((recipe, index) => <div className="col-md-4 mb-4" key={index}>
                                  <div className="card">
                                      <img src={recipe.image} className="card-img-top" alt={recipe.label} />
                                      <div className="card-body">
                                          <h5 className="card-title">{recipe.label}</h5>
                                          <a href={recipe.uri} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                              View Recipe
                                          </a>
                                      </div>
                                  </div>
                              </div>)}
                      </div>
                  </ul>

              </span>
          </div>);
  }

export default SearchResult;