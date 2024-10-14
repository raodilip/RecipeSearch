package meal.recommendation.meal_recommendation_service.Requests;

public class RecipeRequest {
    private String query;
    private String cuisine;
    public String getQuery() {
        return query;
    }
    public void setQuery(String query) {
        this.query = query;
    }
    public String getCuisine() {
        return cuisine;
    }
    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }
    
}
