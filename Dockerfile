# Step 1: Use an official OpenJDK base image
FROM openjdk:17-jdk-slim

# Step 2: Set a working directory inside the container
WORKDIR /app

# Step 3: Add the jar file to the container
COPY target/meal-recommendation-service-0.0.1-SNAPSHOT.jar app.jar

# Step 4: Expose the port that your Spring Boot app runs on (default: 8080)
EXPOSE 8080

# Step 5: Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
