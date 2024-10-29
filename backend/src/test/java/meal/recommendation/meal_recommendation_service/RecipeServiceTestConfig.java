package meal.recommendation.meal_recommendation_service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import meal.recommendation.meal_recommendation_service.Config.EdamamConfig;

@TestConfiguration
public class RecipeServiceTestConfig {

        @Value("${edamam.appId}")
    private String appId;

    @Value("${edamam.appKey}")
    private String appKey;

    @Bean
    EdamamConfig edamamConfig() {
        EdamamConfig config = new EdamamConfig();
        config.setAppId(appId);
        config.setAppKey(appKey);
        return config;
    }    
}
