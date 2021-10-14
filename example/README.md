### How to build

```
docker-compose build --no-cache sssr
```

### How to start

```
docker-compose up -d sssr
```

### Example application

```
docker-compose up -d example
```

Then send simple GET request to localhost

```
curl http://localhost
```

> **note that the javascript has already been rendered**

### SSSR X- header

You can disable caching with custom header `X-SSSR-NO-CACHE: 1`

### Environment variables

> example can be found inside the file .env.example

- `PORT`: (integer) which port to listen to requests, default: 3000
- `WORKERS`: (integer) how many workers to run, default: 1
- `NO_CACHE`: (integer) if is 1, caching is disabled completely
- `CACHE_FILE`: (string) absolute path to the cache file, default: in-memory caching
- `DEBUG`: (string) filter for [debug](https://www.npmjs.com/package/debug) package. Used only for logging
