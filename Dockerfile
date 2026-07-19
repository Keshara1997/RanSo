###############
### STAGE 1: Build app
###############
ARG BUILDER_IMAGE=node:20-alpine
ARG NGINX_IMAGE=nginx:1.19.3
FROM $BUILDER_IMAGE AS builder
ARG NPM_REGISTRY_URL=https://registry.npmjs.org/
ARG BUILD_ENVIRONMENT_OPTIONS="--configuration production"
ENV NODE_OPTIONS="--max-old-space-size=512"
RUN apk add --no-cache git
WORKDIR /usr/src/app
ENV PATH=/usr/src/app/node_modules/.bin:$PATH
ENV PUPPETEER_SKIP_DOWNLOAD=1
ENV CYPRESS_INSTALL_BINARY=0
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
COPY package*.json ./
COPY angular.json ./
COPY tsconfig*.json ./
RUN npm cache clean --force && \
    npm config set registry $NPM_REGISTRY_URL --location=global && \
    npm ci --ignore-scripts --no-audit --no-fund --no-progress
COPY ./ /usr/src/app/
RUN node version.js && \
    npx ng build --output-path=/dist $BUILD_ENVIRONMENT_OPTIONS
###############
### STAGE 2: Serve with nginx
###############
FROM $NGINX_IMAGE
COPY --from=builder /dist/browser /usr/share/nginx/html
EXPOSE 80
CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]