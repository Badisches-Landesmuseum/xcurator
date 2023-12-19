#! /bin/sh

EXTRACT_COUNT=$1

if [ -z "$EXTRACT_COUNT" ]; then
    echo "ERROR: missing argument, please provide number of objects to be extracted."
    exit 1
fi

JSON_FILE=$XCURATOR_ROOT/json/xcurator-artefact-enrichment.json

echo "File size before, Mb"
du -sm $JSON_FILE

echo "Extracting first $EXTRACT_COUNT objects from JSON file... Existing file will be replaced."
time jq "".[:$EXTRACT_COUNT]"" $JSON_FILE > $JSON_FILE.small.tmp && mv $JSON_FILE.small.tmp $JSON_FILE
# Expect 20-30 seconds for 1.5Gb file.
# If performance needs to be improved, see https://github.com/jqlang/jq/wiki/FAQ#streaming-json-parser
# and https://stackoverflow.com/questions/62825963/improving-performance-when-using-jq-to-process-large-files

echo "File size after, Mb"
du -sm $JSON_FILE
