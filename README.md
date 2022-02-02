# n8n-nodes-starter

A starter template for n8n nodes module.

Use this template to get started with creating your own n8n-nodes-module.

Learn more about the n8n-nodes-module on the [official documentation](https://docs.n8n.io/nodes/creating-nodes/create-n8n-nodes-module.html).

<!--
## Usage

### Docker

If you're running n8n via Docker, you will have to create a Docker image with the node module installed in n8n. Follow the steps mentioned below:

1. Create a Dockerfile and paste the following code

```
FROM node:14.15-alpine

ARG N8N_VERSION

RUN if [ -z "$N8N_VERSION" ] ; then echo "The N8N_VERSION argument is missing!" ; exit 1; fi

# Update everything and install needed dependencies
RUN apk add --update graphicsmagick tzdata git tini su-exec

# # Set a custom user to not have n8n run as root
USER root

# Install n8n and the also temporary all the packages
# it needs to build it correctly.
RUN apk --update add --virtual build-dependencies python build-base ca-certificates && \
	npm_config_user=root npm install -g full-icu n8n@${N8N_VERSION} && \
	apk del build-dependencies \
	&& rm -rf /root /tmp/* /var/cache/apk/* && mkdir /root;

# Install n8n-nodes-starter
RUN cd /usr/local/lib/node_modules/n8n && npm install n8n-nodes-starter

# Install fonts
RUN apk --no-cache add --virtual fonts msttcorefonts-installer fontconfig && \
	update-ms-fonts && \
	fc-cache -f && \
	apk del fonts && \
	find  /usr/share/fonts/truetype/msttcorefonts/ -type l -exec unlink {} \; \
	&& rm -rf /root /tmp/* /var/cache/apk/* && mkdir /root

ENV NODE_ICU_DATA /usr/local/lib/node_modules/full-icu

WORKDIR /data

COPY docker-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT ["tini", "--", "/docker-entrypoint.sh"]

EXPOSE 5678/tcp
```

2. Create a `docker-entrypoint.sh` file with the following code.

```sh
#!/bin/sh

if [ -d /root/.n8n ] ; then
  chmod o+rx /root
  chown -R node /root/.n8n
  ln -s /root/.n8n /home/node/
fi

chown -R node /home/node

if [ "$#" -gt 0 ]; then
  # Got started with arguments
  exec su-exec node "$@"
else
  # Got started without arguments
  exec su-exec node n8n
fi
```

3. Create your Docker image

```sh
docker build -t n8n-custom .
```

4. Start the container

```sh
docker run -p 5678:5678 n8n-custom
```

Navigate to your instance (`localhost:5678` if you're running locally) to access the starter node.

### Other

If you’re running either by installing it globally or via PM2, make sure that you install `n8n-nodes-starter` inside n8n. n8n will find the module and load it automatically.

-->

## Contributing

To contribute, refer to [CONTRIBUTING.md](./CONTRIBUTING.md).
