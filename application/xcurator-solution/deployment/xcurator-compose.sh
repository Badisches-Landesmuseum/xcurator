#! /bin/sh

throw_error() {
  echo "
    ERROR: XCURATOR_ROOT and XCURATOR_ENVIRONMENT variables must be set.

    XCURATOR_ROOT example: ~/deployment
    XCURATOR_ENVIRONMENT valid choices are: localdev, staging, production.

    Example ~/.bashrc:
    export XCURATOR_ENVIRONMENT=localdev
    export XCURATOR_ROOT=/home/user/deployment/
    alias xcurator-compose='sh \$XCURATOR_ROOT/xcurator-compose.sh'
  "
  exit 1
}

if [ -z "$XCURATOR_ROOT" -o -z "$XCURATOR_ENVIRONMENT" ]; then
  throw_error
fi

echo "### Running Docker Compose for '$XCURATOR_ENVIRONMENT' environment in '$XCURATOR_ROOT'"

case $XCURATOR_ENVIRONMENT in
  localdev)
    docker compose \
      -f $XCURATOR_ROOT/docker-compose.yaml \
      --env-file $XCURATOR_ROOT/.env.base \
      --env-file $XCURATOR_ROOT/.env.localdev \
      --profile adminui --profile nginx "$@"
  ;;
  staging)
    docker compose \
      -f $XCURATOR_ROOT/docker-compose.yaml \
      --env-file $XCURATOR_ROOT/.env.base \
      --env-file $XCURATOR_ROOT/.env.staging \
      --profile adminui --profile nginx  --profile backup "$@"
  ;;
  production)
    # On production administration UIs are not necessary and are not started by default
    # Skipping reverse proxy, Production system does have it's own
    docker compose \
      -f $XCURATOR_ROOT/docker-compose.yaml \
      --env-file $XCURATOR_ROOT/.env.base \
      --env-file $XCURATOR_ROOT/.env.production \
      --profile backup "$@"
  ;;
  *)
    throw_error
  ;;
esac

