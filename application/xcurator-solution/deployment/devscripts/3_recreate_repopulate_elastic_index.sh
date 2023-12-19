#! /bin/sh

if [ -z "$1" ]; then
    echo "ERROR: no password for user 'elastic' supplied"
    exit 1
fi

if [ -z "$2" ]; then
    echo "ERROR: no index name supplied"
    exit 1
fi

sh $XCURATOR_ROOT/xcurator-compose.sh stop monstache
sh $XCURATOR_ROOT/devscripts/clean_index.sh "$1" "$2"
# create mapping
sh $XCURATOR_ROOT/devscripts/create_index.sh "$1" "$2" # OR sh $XCURATOR_ROOT/xcurator-compose.sh up elasticsearch-init

sh $XCURATOR_ROOT/xcurator-compose.sh start monstache
sleep 2
sh $XCURATOR_ROOT/xcurator-compose.sh logs monstache --tail 5
