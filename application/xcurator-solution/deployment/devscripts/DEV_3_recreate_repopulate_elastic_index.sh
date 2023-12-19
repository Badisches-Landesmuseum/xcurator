#! /bin/sh

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

echo "### Scaling Monstache to 0..."
kubectl scale -n xcurator --replicas=0 deployment/xcurator-solution-monstache-3pc
kubectl wait  -n xcurator deployment/xcurator-solution-monstache-3pc --for=jsonpath='{.spec.replicas}'=0 --timeout=30s

echo "### Removing index '$INDEX_NAME', recreating empty with necessary settings (e.g. mapping)... "
curl -u elastic:$ELASTIC_PASSWORD -XDELETE "https://elasticsearch.k8s.3pc.de/xcurator.$INDEX_NAME"
# shellcheck disable=SC1112
curl -u elastic:$ELASTIC_PASSWORD -H 'Content-Type: application/json' -XPUT "https://elasticsearch.k8s.3pc.de/xcurator.$INDEX_NAME" -d @$XCURATOR_ROOT/elasticsearch-init/elastic-mapping-$INDEX_NAME.json

# TODO delete monstache.monstache ts automagically
echo
read -p "Delete Monstache.monstache timestamp. Press Enter to continue..."
# TODO this does not force reindex!

echo "### Scaling Monstache to 1..."
kubectl -n xcurator scale --replicas=1 deployment/xcurator-solution-monstache-3pc
kubectl wait -n xcurator deployment/xcurator-solution-monstache-3pc --for=jsonpath='{.spec.replicas}'=0 --timeout=30s

echo "### Checking Monstache logs..."
kubectl -n xcurator logs deployment/xcurator-solution-monstache-3pc --tail=20 | cut -c -$(tput cols)

echo "### Check also Kibana: https://kibana.k8s.3pc.de/app/management/data/index_management/indices"
echo '### Also see ERROR in logs: kubectl -n xcurator logs deployment/xcurator-solution-monstache-3pc | grep "^ERROR" > /tmp/logs'