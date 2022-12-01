FROM maven:3.8.3-openjdk-17

WORKDIR /you-manage
COPY . .
RUN mvn clean install

CMD mvn spring-boot:run
