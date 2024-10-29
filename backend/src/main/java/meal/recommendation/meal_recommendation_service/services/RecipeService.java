package meal.recommendation.meal_recommendation_service.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import meal.recommendation.meal_recommendation_service.API.Responses.Hit;
import meal.recommendation.meal_recommendation_service.API.Responses.Recipe;
import meal.recommendation.meal_recommendation_service.API.Responses.Root;
import meal.recommendation.meal_recommendation_service.Config.EdamamConfig;
import meal.recommendation.meal_recommendation_service.Config.APITemplate.RecipeApiCall;

@Service
public class RecipeService {
    
    private final EdamamConfig edamamConfig;

    @Autowired
    public RecipeService(EdamamConfig edamamConfig) {
        this.edamamConfig = edamamConfig;
    }

    @Cacheable(value = "recipes", key = "#query + '-' + #cuisine")
    public List<Recipe> fetch(String query, String cuisine) throws Exception {
       
        RecipeApiCall apiCall = new RecipeApiCall(query, cuisine, edamamConfig);
        return apiCall.makeApiCall();
    }



    private List<Recipe> parseResponse(String jsonResponse) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        Root root = objectMapper.readValue(jsonResponse, Root.class);
        List<Recipe> recipes =  root.getHits().stream().map(Hit::getRecipe).collect(Collectors.toList());
        return recipes;
    }

    public static List<Recipe> getRecipe(String jsonResponse) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);
        // Parse the full JSON response
        Root root = objectMapper.readValue(jsonResponse, Root.class);
        List<Recipe> recipes = root.getHits().stream()
                .map(Hit::getRecipe)  // Extract Recipe object from each Hit
                .collect(Collectors.toList()); 
        return recipes;
    }


    @CacheEvict(value = "recipes", key = "#query + '-' + #cuisine")
    public void clearRecipeFromCache(String query, String cuisine) {
        // This method will remove the specific cache entry for the given query and cuisine
        
    }
}
