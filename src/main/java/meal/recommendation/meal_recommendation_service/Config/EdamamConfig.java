package meal.recommendation.meal_recommendation_service.Config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
@ConfigurationProperties(prefix = "edamam")
public class EdamamConfig {
    private String appId;
    private String appKey;

    // Getters and setters
    public String getAppId() { return appId; }
    public void setAppId(String appId) { this.appId = appId; }

    public String getAppKey() { return appKey; }
    public void setAppKey(String appKey) { this.appKey = appKey; }

    @PostConstruct
    public void init() {
        System.out.println("App ID: " + appId);
        System.out.println("App Key: " + appKey);
    }
}
