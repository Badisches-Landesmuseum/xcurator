MONGODB_DATABASE=xcurator
MONGODB_USERNAME=xcurator-admin
if [ -z "$1" ]
  then
    echo "ERROR: no password for user '$MONGODB_USERNAME' on database '$MONGODB_DATABASE' supplied"
    exit 1
fi
MONGODB_PASSWORD=$1

MONGO_URL=mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@kube-node-01.3pc.local:32017/${MONGODB_DATABASE}

# https://www.mongodb.com/docs/database-tools/mongoimport/
time docker run --rm -it --network=host --entrypoint /usr/bin/mongoimport -v $PWD:$PWD -w $PWD tiredofit/db-backup \
--uri=$MONGO_URL \
--collection=artefact \
--file=$XCURATOR_ROOT/json/xcurator-artefact-enrichment.json \
--jsonArray \
--batchSize 100 \
--drop

#--upsertFields=sourceInfo.id \
#--mode=upsert \
#--stopOnError \

echo "### Check https://mongo-express.k8s.3pc.de/db/$MONGODB_DATABASE/"