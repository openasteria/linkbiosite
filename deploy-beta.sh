#!/usr/bin/env bash
# Деплой beta-версии на opendam.online — запустить локально в папке проекта
set -e
TOKEN="${1:?Usage: ./deploy-beta.sh <TOKEN>}"
git push "https://x-access-token:${TOKEN}@github.com/openasteria/linkbiosite.git" beta:main --force
echo "OK — сайт обновится на http://opendam.online в течение 1-2 минут"
