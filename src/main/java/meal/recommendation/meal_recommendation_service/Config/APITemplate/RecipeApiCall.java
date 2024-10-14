package meal.recommendation.meal_recommendation_service.Config.APITemplate;

import java.util.List;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import meal.recommendation.meal_recommendation_service.API.Responses.Hit;
import meal.recommendation.meal_recommendation_service.API.Responses.Recipe;
import meal.recommendation.meal_recommendation_service.API.Responses.Root;
import meal.recommendation.meal_recommendation_service.Config.EdamamConfig;
import meal.recommendation.meal_recommendation_service.Config.RecipeRequestBuilder;

//Concrete Class
public class RecipeApiCall extends APICallTemplate <List<Recipe>> {
    
    private final String query;
    private final String cuisine;
    private final EdamamConfig edamamConfig;

    public RecipeApiCall(String query, String cuisine, EdamamConfig edamamConfig) {
        this.query = query;
        this.cuisine = cuisine;
        this.edamamConfig = edamamConfig;
    }

    @Override
    protected String buildUrl() {
        return new RecipeRequestBuilder(edamamConfig.getAppId(), edamamConfig.getAppKey())
                    .setQuery(query)
                    .setCuisine(cuisine)
                    .build();
    }

    @Override
    protected List<Recipe> processResponse(String response) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        Root root = objectMapper.readValue(response, Root.class);
        return root.getHits().stream().map(Hit::getRecipe).toList();
    }
}
