# shellcheck disable=SC1112
# run below OR docker compose up elasticsearch-init

ELASTIC_PASSWORD=$1
INDEX_NAME=$2

if [ -z "$ELASTIC_PASSWORD" ]; then
    echo "ERROR: no password for user 'elastic' supplied"
    exit 1
fi

if [ -z "$INDEX_NAME" ]; then
    echo "ERROR: no index name supplied"
    exit 1
fi

echo "### Creating ES index '$INDEX_NAME' with custom parameters"
curl -u elastic:$ELASTIC_PASSWORD -H 'Content-Type: application/json' -XPUT "http://localhost:9200/xcurator.$2" -d @$XCURATOR_ROOT/elasticsearch-init/elastic-mapping-$INDEX_NAME.json
echo
