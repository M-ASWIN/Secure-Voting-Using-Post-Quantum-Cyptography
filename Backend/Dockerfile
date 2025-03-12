# Use an official Java runtime as the base image
FROM openjdk:21-jdk-slim

WORKDIR usr/app

# Copy the built JAR file from the target directory
COPY target/*.jar SecureVotingBackend.jar

# Expose the application port (match with your application.properties)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "SecureVotingBackend.jar"]
