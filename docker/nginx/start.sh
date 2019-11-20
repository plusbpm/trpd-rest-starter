#!/bin/sh

BASE_PATH=/etc/nginx/
ENVIRONMENT_KEYS=`for v in $(env | awk -F '=' '{ print $1 }');do printf '${%s} ' $v;done`

for filename in nginx proxy_backend proxy_react
do
  SOURCE_TEMPLATE=$BASE_PATH/$filename.template.conf
  TARGET_CONFIG=$BASE_PATH/$filename.conf
  envsubst "$ENVIRONMENT_KEYS" < $SOURCE_TEMPLATE > $TARGET_CONFIG
  rm -f $SOURCE_TEMPLATE
done