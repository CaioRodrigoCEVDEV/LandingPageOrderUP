#!/usr/bin/env bash
set -eu

APP_DIR="${APP_DIR:-/home/sites/OrderUp/LandingPageOrderUP}"
LANDING_DIR="$APP_DIR/client"

echo ">> App dir:    $APP_DIR"
echo ">> Landing:    $LANDING_DIR"

if [ ! -d "$LANDING_DIR" ]; then
  echo "ERRO: diretório da landing não encontrado: $LANDING_DIR" >&2
  echo "Defina APP_DIR via variável de ambiente ou edite o default no script." >&2
  exit 1
fi

if [ ! -d "$APP_DIR/.git" ]; then
  echo "ERRO: repositório git não encontrado em $APP_DIR" >&2
  exit 1
fi

cd "$APP_DIR"

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
echo ">> Atualizando repositório ($CURRENT_BRANCH)"
git fetch --all --prune
git pull --ff-only origin "$CURRENT_BRANCH"

cd "$LANDING_DIR"

if [ -f package.json ]; then
  echo ">> Instalando dependências da landing (npm install)"
  npm install --no-audit --no-fund
fi

echo ">> Buildando landing (npm run build)"
npm run build

cd "$APP_DIR"

echo ">> Executando /root/deployOrderUp.sh"
chmod +x /root/deployOrderUp.sh
/root/deployOrderUp.sh

echo ">> Deploy concluído"
