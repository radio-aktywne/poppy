FROM caddy:2.4.5-alpine

COPY ./emiweb/Caddyfile /etc/caddy/Caddyfile
COPY ./emiweb/src/ /srv/

ENV EMIWEB_TARGET_HOST=localhost \
    EMIWEB_TARGET_PORT=10000
