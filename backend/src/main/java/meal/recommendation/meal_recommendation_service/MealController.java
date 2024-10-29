package meal.recommendation.meal_recommendation_service;

import meal.recommendation.meal_recommendation_service.API.Responses.Recipe;
import meal.recommendation.meal_recommendation_service.services.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("")
public class MealController {
    private final RecipeService recipeService;

    public MealController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }


    @GetMapping("/api/recipes")
    public List<Recipe> index(@RequestParam String mealType,@RequestParam String cuisine) throws Exception{
        if (mealType == null || mealType.isEmpty()) {
            throw new IllegalArgumentException("mealType is required");
        }
        if (cuisine == null || cuisine.isEmpty()) {
            throw new IllegalArgumentException("cuisine is required");
        }
        return  recipeService.fetch(mealType,cuisine);
       // return "Greetings from Meal Recommendation Service";
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleIllegalArgumentException(IllegalArgumentException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Invalid Request");
        errorResponse.put("message", ex.getMessage());  // Exception message returned in JSON
        return errorResponse;
    }

}
