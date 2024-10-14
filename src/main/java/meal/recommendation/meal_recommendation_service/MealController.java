package meal.recommendation.meal_recommendation_service;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import meal.recommendation.meal_recommendation_service.API.Responses.Recipe;
import meal.recommendation.meal_recommendation_service.Requests.RecipeRequest;
import meal.recommendation.meal_recommendation_service.services.RecipeService;
@CrossOrigin(origins = "http://localhost:3000") 
@RestController
public class MealController {
    private final RecipeService recipeService;

    public MealController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }


    @CrossOrigin(origins = "http://localhost:3000") 
    @PostMapping("/api/recipes")
    public List<Recipe> index(@RequestBody RecipeRequest recipeRequest) throws Exception{
        String query = recipeRequest.getQuery();
        String cuisine = recipeRequest.getCuisine();
       
        return  recipeService.fetch(query,cuisine);
       // return "Greetings from Meal Recommendation Service";
    }
}
