#! /bin/sh

JSON_FILE_URL=$1

if [ -z "$JSON_FILE_URL" ]; then
    echo "ERROR: no URL to download JSON file with enriched dataset is provided"
    exit 1
fi

echo "Downloading JSON with enriched dataset from $JSON_FILE_URL"
mkdir -p $XCURATOR_ROOT/json/
wget $JSON_FILE_URL -O $XCURATOR_ROOT/json/xcurator-artefact-enrichment.json
