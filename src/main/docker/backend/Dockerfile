FROM adoptopenjdk:11-jre-hotspot as builder
WORKDIR /application
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar", "/application/app.jar"]

