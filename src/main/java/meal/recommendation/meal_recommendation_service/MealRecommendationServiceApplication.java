package meal.recommendation.meal_recommendation_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;

import meal.recommendation.meal_recommendation_service.Config.EdamamConfig;

@SpringBootApplication
@EnableCaching
@EnableConfigurationProperties(EdamamConfig.class)
public class MealRecommendationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MealRecommendationServiceApplication.class, args);
	}

	
}
