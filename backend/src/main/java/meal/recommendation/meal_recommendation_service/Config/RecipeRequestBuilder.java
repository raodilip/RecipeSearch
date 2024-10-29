package meal.recommendation.meal_recommendation_service.Config;

public class RecipeRequestBuilder {
    private String query;
    private String cuisine;
    private String appId;
    private String appKey;
    private String baseUrl = "https://api.edamam.com/api/recipes/v2?type=public";

    public RecipeRequestBuilder(String appId, String appKey) {
        this.appId = appId;
        this.appKey = appKey;
    }

    public RecipeRequestBuilder setQuery(String query) {
        this.query = query;
        return this;
    }

    public RecipeRequestBuilder setCuisine(String cuisine) {
        this.cuisine = cuisine;
        return this;
    }

    public String build() {
        return baseUrl + "&q=" + query 
                + "&app_id=" + appId 
                + "&app_key=" + appKey 
                + "&cuisineType=" + cuisine;
    }
}
