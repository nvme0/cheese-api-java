package com.cheese.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfiguration {
  @Bean
  public OpenAPI customOpenAPI(@Value("${app.version}") String appVersion) {
    OpenAPI openapi = new OpenAPI()
        .components(new Components())
        .info(new Info()
            .title("Cheese API")
            .version(appVersion));

    return openapi;
  }
}
