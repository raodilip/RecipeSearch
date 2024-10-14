package meal.recommendation.meal_recommendation_service.Config.APITemplate;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public abstract class APICallTemplate<T> {
     // Template method
     public final T makeApiCall() throws Exception {
        String url = buildUrl();
        String response = executeRequest(url);
        return processResponse(response);
    }

    // Steps to be customized by subclasses
    protected abstract String buildUrl();
    protected abstract T processResponse(String response) throws Exception;

    // Common method for making HTTP request
    private String executeRequest(String url) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            return responseEntity.getBody();
        } else {
            throw new RuntimeException("Failed to fetch data from API: " + responseEntity.getStatusCode());
        }
    }
}
