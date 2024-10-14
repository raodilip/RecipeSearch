package meal.recommendation.meal_recommendation_service.API.Responses;

import java.util.ArrayList;

public class Root {

    private ArrayList<Hit> hits;  // This should map the "hits" array in the JSON

    public ArrayList<Hit> getHits() {
        return hits;
    }

    public void setHits(ArrayList<Hit> hits) {
        this.hits = hits;
    }


}
