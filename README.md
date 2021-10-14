# Docker Image for SSSR

Dockerized [SSSR](https://www.npmjs.com/package/sssr) + Chrome Headless (chromium-browser on Alpine Linux)

SSSR-in-docker is an open-source Node.js based web application that serves pre-rendered HTML of your SPA for web crawlers like Google, Twitter, Slack preview bots and so on.

It is used for SEO for single page web apps built on any framework: React, Angular, Vue.js, etc.

### Environment variables

- `PORT`: (integer) which port to listen to requests, default: 3000
- `WORKERS`: (integer) how many workers to run, default: 1
- `NO_CACHE`: (integer) if is 1, caching is disabled completely
- `CACHE_FILE`: (string) absolute path to the cache file, default: in-memory caching
- `DEBUG`: (string) filter for [debug](https://www.npmjs.com/package/debug) package. Used only for logging

### SSSR X- header

You can disable caching with custom header `X-SSSR-NO-CACHE: 1`

### Examples

> Do not expose the port to world wide web. Just put it in a docker (or docker-compose) network.

Run it with default settings and expose the port to the public:
```bash
docker run --detach \
    --name sssr \
    -p 3000:3000 \
    webdevium/sssr
```

Run it with debug mode and without caching in general

```bash
docker run --detach \
    --name sssr \
    -e "DEBUG=sssr*" \
    -e "NO_CACHE=1" \
    webdevium/sssr
```

Run it with multiple workers

```bash
docker run --detach \
    --name sssr \
    -e "WORKERS=4" \
    webdevium/sssr
```

### Nginx flow

See example of Nginx [config](./example/nginx.conf)

### Debug

To debug the app (see SSSR logs):
* run it in foreground (without --detach)
* watch the logs `docker logs -f sssr`

### Cache

You can see the cache in action by reading the logs.
For example, from multiple calls of `curl localhost:3000/https://google.com`:

```
sssr:limiter started +0ms
sssr is listening on 3000 port +0ms
sssr:worker { version: 'HeadlessChrome/91.0.4469.0', pid: 8064 } +0ms
sssr:engine processing https://google.com/ +3s
sssr:engine processed https://google.com/ +728ms
sssr:cache stored https://google.com/ +0ms
sssr:cache hit found for https://google.com/ +4ms
sssr:cache hit found for https://google.com/ +27ms
sssr:cache hit found for https://google.com/ +75ms

```

Since the cache is in memory by default, in order to clear it (for example, on release), you can simply restart the container.

```
docker restart sssr
```
