FROM nginx:stable-alpine

RUN mkdir -p /nginx_base && \
  mkdir -p /etc/nginx/vhosts && \
  echo -n "Install packages ..." && \
  apk add --no-cache dumb-init > /dev/null && \
  echo " done"

COPY docker/nginx/*.conf docker/nginx/start.sh /etc/nginx/
COPY static/ /nginx_base/static/

ENTRYPOINT ["dumb-init", "--"]

CMD /etc/nginx/start.sh && nginx -g 'daemon off;'
    
