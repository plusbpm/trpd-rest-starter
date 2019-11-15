#!/bin/sh

envsubst "`for v in $(env | awk -F '=' '{ print $1 }');do printf '${%s} ' $v;done`" < /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf

envsubst "`for v in $(env | awk -F '=' '{ print $1 }');do printf '${%s} ' $v;done`" < /etc/nginx/proxy_backend.template.conf > /etc/nginx/proxy_backend.conf

envsubst "`for v in $(env | awk -F '=' '{ print $1 }');do printf '${%s} ' $v;done`" < /etc/nginx/proxy_react.template.conf > /etc/nginx/proxy_react.conf