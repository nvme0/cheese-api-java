# Cheese API Java Version

## Setup

1. Depending on your IDE, install Java dependencies in `/api`

## Development

1. Run `docker-compose up` to start the postgreSQL server

2. Depending on your IDE, start the Cheese API server in `/api`

## Swagger UI

To view Swagger UI, start the API server and go to `http://localhost:8080/swagger-ui/index.html`.

To view the raw openapi JSON, go to `http://localhost:8080/v3/api-docs`

## Database migrations

Database migrations are performed using flyway, they are automatically applied to the database when running the application.

### Creating a new migration

Inside `com.cheese.api` create a new SQL file in `resources/db/migration`.

The convention for the file name is `VX__the_description.sql`, where `X` equals the version number.

When naming columns and tables, the column name `price_per_kilo` will map to `pricePerKilo` in the ORM.

For example, the following table:

```Java
@Entity(name="cheese")
public class Cheese {
  private Integer pricePerKilo;
}
```

Requires a migration:

```SQL
CREATE TABLE IF NOT EXISTS cheese (
  price_per_kilo INTEGER NOT NULL,
);
```
