
rm -rf ./src/api/generated
openapi-generator-cli generate \
  -i http://localhost:8080/v3/api-docs \
  -g typescript-axios \
  -o ./src/api/generated \
  --package-name api \
  --additional-properties=useSingleRequestParameter=true
