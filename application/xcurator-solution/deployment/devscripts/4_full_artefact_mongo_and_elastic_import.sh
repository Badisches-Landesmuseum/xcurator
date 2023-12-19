#! /bin/sh

MONGODB_PASSWORD=$1
MONGODB_DATABASE=xcurator
MONGODB_USERNAME=xcurator-admin
ELASTIC_PASSWORD=$2
ELASTIC_INDEX_NAME=artefact

if [ -z "$ELASTIC_PASSWORD" ]; then
    echo "ERROR: no password for user 'elastic' supplied"
    exit 1
fi
if [ -z "$MONGODB_PASSWORD" ]; then
    echo "ERROR: no password for user '$MONGODB_USERNAME' on database '$MONGODB_DATABASE' supplied"
    exit 1
fi

echo "Stop Monstache from syncing anything in between index drop and recreation, as will lead to index autcreation with a default settings"
sh $XCURATOR_ROOT/xcurator-compose.sh stop monstache
echo "Clean index efficiently (via drop), recreate index with custom mappings/settings"
sh $XCURATOR_ROOT/devscripts/clean_index.sh "$ELASTIC_PASSWORD" "$ELASTIC_INDEX_NAME"
sh $XCURATOR_ROOT/devscripts/create_index.sh "$ELASTIC_PASSWORD" "$ELASTIC_INDEX_NAME" # OR sh $XCURATOR_ROOT/xcurator-compose.sh up elasticsearch-init
sh $XCURATOR_ROOT/xcurator-compose.sh start monstache
sleep 2 && sh $XCURATOR_ROOT/xcurator-compose.sh logs monstache --tail 5

# prefering running in Compose, as DNS is handled, healthchecks are present
sh $XCURATOR_ROOT/xcurator-compose.sh up mongo-import | grep mongo-import # configured to drop before import

sleep 2 && sh $XCURATOR_ROOT/xcurator-compose.sh logs monstache --tail 5

