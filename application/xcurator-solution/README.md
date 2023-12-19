- [xCurator-Beta solution](#xcurator-beta-solution)
  - [Environments](#environments)
    - [URLs](#urls)
      - [User frontends and related backends:](#user-frontends-and-related-backends)
      - [Administration endpoints for subsystems:](#administration-endpoints-for-subsystems)
    - [Usage](#usage)
    - [Production](#production)
    - [Staging](#staging)
    - [Local development](#local-development)
      - [Development scripts](#development-scripts)
      - [M1 ARM architecture](#m1-arm-architecture)
      - [MongoDB connectivity, import, synchronization with ElasticSearch](#mongodb-connectivity-import-synchronization-with-elasticsearch)
  - [Building applications](#building-applications)
  - [Day 0, greenfield installation](#day-0-greenfield-installation)
    - [Requirements](#requirements)
    - [Reverse proxy](#reverse-proxy)
      - [Reverse proxy and NextJS](#reverse-proxy-and-nextjs)
      - [Testing endpoints via reverse proxies](#testing-endpoints-via-reverse-proxies)
    - [Configuration](#configuration)
      - [Keycloak](#keycloak)
  - [Day 1, operations](#day-1-operations)
    - [Startup and shutdown](#startup-and-shutdown)
    - [JSON file import](#json-file-import)
    - [Staging/production deployment update workflow using 3pc CI/CD](#stagingproduction-deployment-update-workflow-using-3pc-cicd)
      - [Staging \<\> Production data copy](#staging--production-data-copy)
        - [Example, staging \> production](#example-staging--production)
    - [Monitoring](#monitoring)
    - [Maintenance](#maintenance)
    - [Backup restoration](#backup-restoration)
      - [MongoDB](#mongodb)
    - [Production admin access](#production-admin-access)
      - [MongoDB shell access](#mongodb-shell-access)
- [Options considered](#options-considered)
  - [importing JSON](#importing-json)
  - [Admin-friendly alias `xcurator-compose`](#admin-friendly-alias-xcurator-compose)
- [xCurator compliance to "Sicherheitskonzept nach BSI-Standard"](#xcurator-compliance-to-sicherheitskonzept-nach-bsi-standard)
    - [Product/application high-level view](#productapplication-high-level-view)
    - [BSI documents](#bsi-documents)
    - [BSI Technical Guidelines applicability](#bsi-technical-guidelines-applicability)
    - [Applicable Technical Guidelines](#applicable-technical-guidelines)
      - [BSI TR-02102 Cryptographic Mechanisms](#bsi-tr-02102-cryptographic-mechanisms)
      - [Summary](#summary)
    - [Additional notes](#additional-notes)


**Authors**: Aleksejs Spiridonovs | [3pc GmbH](https://www.3pc.de)

# xCurator-Beta solution

This repository provides a sample of Xcurator deployment.

This sample consists of real life scenario, and is a base for actual deployment in AP (Allard Pierson) and BLM (Badisches Landesmuseum)

## Environments

N.B.! This repository is preconfigured to be used with these environments:

|     | Deployment        | Type                                                            |
| --- | ----------------- | --------------------------------------------------------------- |
| 1   | Local development | Docker Compose, full or partial                                 |
| 2   | DEV ("testing")   | Helm on Kubernetes DEV cluster with all prerequisites installed |
| 3   | Staging           | Docker Compose                                                  |
| 4   | Production        | Docker Compose                                                  |

Following methods are use to achieve this:

- `docker-compose.yaml` make use of "profiles" to enable or disable services. E.g. local development environment does not require backups.
- Multiple `.env.*` files are available, making use of `--env-from` parameter and ability of `docker compose` to merge them on startup.
- For ease of use and clean documentation, shell script and alias `xcurator-compose` are provided.

Passwords are mentioned in `deployment/.env.*` files.

### URLs

URLs follow same scheme for all Docker Compose environments.

Below is combination of reverse proxy configuration and specific application configuration (where required)

#### User frontends and related backends:

- https://$HOST_AP
  - https://$HOST_AP/api-gateway/
  - https://$HOST_AP/keycloak/

- https://$HOST_BLM
  - https://$HOST_BLM/api-gateway/

#### Administration endpoints for subsystems:

- https://$HOST_ADMIN/logs/
- https://$HOST_ADMIN/keycloak/
- https://$HOST_ADMIN/kibana/app/management/data/index_management/indices
- https://$HOST_ADMIN/mongo-express/
- https://$HOST_ADMIN/redis-commander/
- https://$HOST_ADMIN/pgweb/
- https://$HOST_ADMIN/monstache/instance

### Usage

```sh
# Start/stop Docker Compose environment. Enable or disable profile, if necessary (e.g. UI or Nginx) in `xcurator-compose.sh`
xcurator-compose up -d
xcurator-compose down
```

### Production

Production deployment uses variables from `.env.production*`.

### Staging

Staging deployment uses variables from `.env.staging*`.

### Local development

Additional usage examples:

```sh
# If you need only selected services like MongoDB or ElasticSearch for your tests, start them explicitly.
xcurator-compose up -d mongo elasticsearch elasticsearch-init

# Day 0/greenfield installation/complete reset
# WARNING! ALL DATA WILL BE LOST!
xcurator-compose down
xcurator-compose ps
docker volume rm deployment_es-data
docker volume rm deployment_mongo-data
docker volume rm deployment_postgres-data
docker volume rm deployment_redis-data
sudo rm -rf mongo-backup/*
sudo rm -rf postgres-backup/*
sudo rm -rf es-backup/*
xcurator-compose up -d
```

If no Nginx reverse proxy is used, following endpoints are exposed:

```
### Exposed endpoints (listening on external IP too, not only localhost)
### Covered by reverse proxy. Local Nginx on Staging and external Caddy on Production.
# http://localhost:8071/graphql - API (GraphQL Gateway)
# http://localhost:8081 - AP frontend (xcurator-web)
# http://localhost:8082 - BLM frontend (xcurator-web)
# http://localhost:8083/keycloak/auth - IAM/IDP (keycloak)

### Other ports provided by solution, exposed only until production stage, have to be hidden behind reverse proxy
# http://localhost:8060 - xcurator-service
# http://localhost:8062 - Clip HTTP Service
# http://localhost:9200 - elasticsearch
# http://localhost:27017 - mongo

# Optional UIs (may be configured to work only behind reverse proxy):
# http://localhost:5601/app/management/data/index_management/indices - kibana
# http://localhost:9081/mongo-express - mongo-express
# http://localhost:9082 - redis-commander
# http://localhost:9083 - pgweb
# http://localhost:9084/instance - monstache
# http://localhost:9085/logs - dozzle, log aggregator
```

When Nginx reverse proxy is used, endpoints are available under configured in [.env.localdev](.env.localdev) hostname.

Example hostname can be: `xcurator.localdev`, making all URLs follow same scheme as staging/production, e.g. http://ap.xcurator.localdev/ and http://admin.xcurator.localdev/logs/

In this case, configure your `/etc/hosts`:

```sh
127.0.0.1 ap.xcurator.localdev blm.xcurator.localdev admin.xcurator.localdev
```

#### Development scripts

```sh
# Docker Compose environment (localdev/staging/production)
cd deployment
source $XCURATOR_ROOT/.env.$XCURATOR_ENVIRONMENT
sh $XCURATOR_ROOT/devscripts/1_download_enrichment_json.sh <URL to JSON with enriched dataset >
sh $XCURATOR_ROOT/devscripts/1_optional_subset_of_big_json.sh 100 # Extracts small subset of data for quick tests

sh $XCURATOR_ROOT/devscripts/3_recreate_repopulate_elastic_index.sh $ELASTIC_PASSWORD artefact
  # or step by step
  sh $XCURATOR_ROOT/devscripts/clean_index.sh $ELASTIC_PASSWORD artefact
  sh $XCURATOR_ROOT/devscripts/create_index.sh $ELASTIC_PASSWORD artefact
sh $XCURATOR_ROOT/devscripts/2_import_json_to_mongodb.sh # imports artefacts

sh $XCURATOR_ROOT/devscripts/3_recreate_repopulate_elastic_index.sh $ELASTIC_PASSWORD story
  # or step by step
  sh $XCURATOR_ROOT/devscripts/clean_index.sh $ELASTIC_PASSWORD story
  sh $XCURATOR_ROOT/devscripts/create_index.sh $ELASTIC_PASSWORD story

# You may want open administration tools to confirm the process:
# e.g. Staging:
# Kibana, https://$HOST_ADMIN/kibana/app/management/data/index_management/indices # 240663
# Mongo, https://$HOST_ADMIN/mongo-express/db/xcurator/artefact # 41757

sh $XCURATOR_ROOT/devscripts/4_full_artefact_mongo_and_elastic_import.sh $MONGODB_PASSWORD $ELASTIC_PASSWORD

# Kubernetes environment (only DEV, Kubernetes environment)
MONGODB_PASSWORD=
sh $XCURATOR_ROOT/devscripts/DEV_2_import_json_to_mongodb.sh $MONGODB_PASSWORD

ELASTIC_PASSWORD=
sh $XCURATOR_ROOT/devscripts/DEV_3_recreate_repopulate_elastic_index.sh $ELASTIC_PASSWORD artefact
```

#### M1 ARM architecture

To use ARM architecture, use official image and do following changes:

```yaml
    #image: ${ELASTIC_IMAGE}
    image: docker.elastic.co/elasticsearch/elasticsearch:8.8.0
    command: ["sh", "-c", "elasticsearch-plugin install --batch https://github.com/alexklibisz/elastiknn/releases/download/8.8.0.0/elastiknn-8.8.0.0.zip && /bin/tini -s -- /usr/local/bin/docker-entrypoint.sh eswrapper"]
```

#### MongoDB connectivity, import, synchronization with ElasticSearch

```sh
MONGODB_DATABASE=xcurator
MONGODB_USERNAME=xcurator-admin
MONGODB_PASSWORD=

# LOCALDEV Mongo URL. While connecting to ReplicaSet inside local docker, use directConnection option to avoid ENOTFOUND error
MONGO_URL=mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@localhost:27017/${MONGODB_DATABASE}?directConnection=true

# DEV cluster sharded Mongo URL
MONGO_URL=mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@kube-node-01.3pc.local:32017/${MONGODB_DATABASE}

# STAGING cluster Mongo URL
MONGO_URL=mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@xcurator.staging.3pc.local:27017/${MONGODB_DATABASE}?replicaSet=rs0&directConnection=true

# (Re-)Import data
mongoimport \
    --uri $MONGO_URL --collection artefact \
    --mode=merge --upsertFields=sourceInfo.id \
    --jsonArray --stopOnError \
    --file json/xcurator-artefact-enrichment-small.json

# Initialize Elasticsearch - create index with custom settings/mappings
ELASTIC_PASSWORD=
curl -v -u elastic:$ELASTIC_PASSWORD -X PUT https://elasticsearch.k8s.3pc.de/xcurator.artefact?pretty -H 'Content-Type: application/json' -d @init-elasticsearch/elastic-mapping-artefact.json
curl -v -u elastic:$ELASTIC_PASSWORD -X PUT https://elasticsearch.k8s.3pc.de/xcurator.story?pretty    -H 'Content-Type: application/json' -d @init-elasticsearch/elastic-mapping-story.json

# Resync ES index by restarting Monstache
```

## Day 0, greenfield installation

### Requirements
- DNS configured
- Certificates generated
- Reverse proxy configured
- SMTP server available
- Server ready
  - No GPU required
  - 4+ CPU
  - 20Gb RAM, sum of:
    - Prerequisites:
      - Redis 50 Mb
      - KeyCloak 500 Mb
      - Postgres 50 Mb
      - MongoDB 1000 Mb
      - ElasticSearch 1500 Mb
    - Runtime services:
      - graphql-gateway 100 Mb
      - xcurator-web 300 Mb
      - xcurator-web 300 Mb
      - clip-http-service 6000 Mb
    - For OS and reserve, provide 2x memory (e.g. above 10Gb x2 = 20Gb )
  - Storage hardware requirement are the sum of:
      - ~20 GB for OS, initial setup
      - ~15 Gb for docker images
      - Storage space, which depends on the size of the imported dataset, can be calculated as:
        - 100% is the size of the dataset
        - 200% is MongoDB
        - 70% is ElasticSearch
        - 170% for ES backups (depends on backup frequency and retention)
        - 40% for MongoDB backup per day (total depends on backup frequency and retention, 7 days is 280%)
      - ~200Mb for Redis, Postgres
      - 50% for caches and reserve on top

      So a 1GB dataset will result in `(20 + 15 + 1Gbx8.2 + 0.2Gb) * 1.5 ~= 70Gb`, and a 10GB dataset will require ~190Gb.
      There are no special performance requirements for storage.

  - Docker and Docker Compose plugin installed Docker Engine and Compose plugin (tested: v24.0.5 and v2.20.2 respectively)
  - `deployment` folder from this repository copied
  - XCURATOR_ROOT and XCURATOR_ENVIRONMENT variables are set (see [Startup and shutdown](#startup-and-shutdown))
  - Applications started, see [Day 1, operations](#day-1-operations)
  - Keycloak configuration adjusted (secrets, e-mail, etc)
  - JSON file imported, see [JSON file import](#json-file-import)

N.B. Dataset in form of JSON file is produced by enrichment process, that is out of scope of this repository, see https://github.com/Badisches-Landesmuseum/xcurator

### Reverse proxy

See `staging` example in [nginx/default.conf.template](nginx/default.conf.template).
Map BLM and AP hosts to respective xcurator-web ports as follows:

| URL                            | Destination port | Additional information |
| ------------------------------ | ---------------- | ---------------------- |
| https://$HOST_AP/              | 8081             | \*1, \*2               |
| https://$HOST_AP/api-gateway/  | 8071             |                        |
| https://$HOST_AP/keycloak/     | 8083             | \*1                    |
| https://$HOST_BLM/             | 8082             | \*1, \*2               |
| https://$HOST_BLM/api-gateway/ | 8071             |                        |

1. All reverse proxies in front of (e.g. included in staging setup, or any other(s)) solution must have header buffer size increased, e.g. `proxy_buffer_size   256k;` to accommodate Keycloak tokens in headers
2. WebSocket support must be enabled

#### Reverse proxy and NextJS

In `graphql-gateway`, NextJS `express-session` will not send "secure" Cookies, if `X-Forwarded-Proto` header received is `http`, and login will fail.
See `express-session` implicit logic summed up in https://stackoverflow.com/a/30803170/9993205.

This may happen, in case 2 chained proxies are present, where downstream one works via HTTP (Browser > HTTPS:proxy > HTTP:proxy >> HTTP:app),
and set it as a copy of incoming scheme, e.g `proxy_set_header X-Forwarded-Proto $scheme`.

Solution is to set `X-Forwarded-Proto` explicitely: `proxy_set_header X-Forwarded-Proto ${HTTP_SCHEME};`

Related NextJS options (see `graphql-gateway` repository for more):
- https://expressjs.com/en/guide/behind-proxies.html
- https://github.com/expressjs/session#cookiesecure
- https://github.com/expressjs/session#proxy

#### Testing endpoints via reverse proxies

```sh
# Keycloak
## Production
curl -I https://$HOST_AP/keycloak/auth/

# API gateway GraphQL endpoint
## DEV
curl --request POST  --header 'content-type: application/json' --url 'https://gateway.xcurator.3pc.de/graphql' --data '{"query":"query { __typename }"}' # Correct response: {"data":{"__typename":"Query"}}
## Staging
curl --request POST  --header 'content-type: application/json' --url 'https://$HOST_AP/api-gateway/graphql' --data '{"query":"query { __typename }"}'
## Production
curl --request POST  --header 'content-type: application/json' --url 'https://$HOST_AP/api-gateway/graphql' --data '{"query":"query { __typename }"}'
curl --request POST  --header 'content-type: application/json' --url 'https://$HOST_BLM/api-gateway/graphql' --data '{"query":"query { __typename }"}'
### test on server, without proxy
curl --request POST  --header 'content-type: application/json' --url 'http://localhost:8071/graphql' --data '{"query":"query { __typename }"}'

# API gateway WebSocket endpoint
# DEV
wscat --connect wss://gateway.xcurator.3pc.de
# Staging
wscat --connect wss://$HOST_AP/api-gateway/
# Production
wscat --connect wss://$HOST_AP/api-gateway/
wscat --connect wss://$HOST_BLM/api-gateway/
```

### Configuration

Following applications load their configuration upon startup:

- ElasticSearch, see [deployment/elasticsearch-init](deployment/elasticsearch-init)
- Keycloak - basic configuration (see below)
- MongoDB (if necessary)

#### Keycloak

Basic configuration provided, that creates realm.

However, configuration involves more bells and whistles.

Unfortunately, there is no mapping between Keycloak UI and exported realm configuration. 
That configuration is also full of default values and is inconsistent, making it hard to compare and create a full, but concise configuration, that just needs to be imported.

Instead, 2 files are provided.
1 is bootstrapping configuration, containing very basic realm configuration.
2 is export from working instance, containing everything.

## Day 1, operations

### Startup and shutdown

N.B. `xcurator-compose` is a script that is used to set up Docker Compose applications correctly for each environment.
See [xcurator-compose.sh](xcurator-compose.sh)

```sh
xcurator-compose up -d
xcurator-compose down
```

### JSON file import

```sh
# Download JSON file and import into MongoDB
sh $XCURATOR_ROOT/devscripts/1_download_import_json.sh <URL to JSON with enriched dataset >
# Resync data to elasticsearch # TODO make Monstache react on object update
sh $XCURATOR_ROOT/devscripts/2_recreate_repopulate_index.sh $ELASTIC_PASSWORD
```

### Staging/production deployment update workflow using 3pc CI/CD

Staging:

1. Solution component versions are updated in [deployment/.env.base](deployment/.env.base)
2. Changes are committed to `develop` branch (.env.base does not affect DEV environment)
3. Changes are merged from `develop` into `staging` branch, deployed by Jenkins

Production:

4. Acceptance tests passed, decision to deploy on Production is made
5. Changes are merged from `staging` into `production` branch, , deployed by Jenkins
  - Important! Old Docker image cleanup should be done manually, without using global `system prune`, as this will affect other hosted systems.

P.S. `xcurator-web` now implements "build once, deploy everywhere" approach, thus do not require special procedures.

#### Staging <> Production data copy

##### Example, staging > production

No direct database connection is possible between systems.

Using administrator computer as a medium.

TODO: MongoDB "artefact" collection may be skipped, and loaded from JSON

```sh
# On administrator computer:
SOURCE_SERVER=xcurator-staging # ssh configured host
DEST_SERVER=xcurator-production # host
DEST_PATH=/home/aleksejs/backups-from-$SOURCE_SERVER-backups_$(date +%Y%m%d)

# Transfer backups to other system
# TODO: after https://github.com/tiredofit/docker-db-backup/issues/256 is fixed, can copy latest only

## copy from SOURCE_SERVER > local system
rsync -avh --progress $SOURCE_SERVER:/home/dreipc/deployment/*backup/*$(date +%Y%m%d)* /tmp/$SOURCE_SERVER-backups_$(date +%Y%m%d)
rsync -avh --progress $SOURCE_SERVER:/home/dreipc/deployment/es-backup/                /tmp/$SOURCE_SERVER-backups_$(date +%Y%m%d)/es-backup/ # can be large. Optional?

ls -la /tmp/$SOURCE_SERVER-backups_$(date +%Y%m%d)

## copy from local system > DEST_SERVER
rsync -avh --progress /tmp/$SOURCE_SERVER-backups_$(date +%Y%m%d)/ $DEST_SERVER:$DEST_PATH
  # OR direct ssh copy?: ssh -R localhost:50000:$DEST_SERVER:22 $SOURCE_SERVER "rsync -e 'ssh -p 50000' -vuar $SOURCE_PATH localhost:$DEST_PATH" 

# On DEST_SERVER
# move existing backups aside # TODO: disk usage in a long run - as it will not be rotated
MOVED_BACKUPS=backup-from-this-system-$(date +%Y%m%d)
xcurator-compose exec mongo-backup sh    -c "mkdir -p /backup/$MOVED_BACKUPS; mv /backup/* /backup/$MOVED_BACKUPS; ls -la /backup; ls -la /backup/$MOVED_BACKUPS"
xcurator-compose exec postgres-backup sh -c "mkdir -p /backup/$MOVED_BACKUPS; mv /backup/* /backup/$MOVED_BACKUPS; ls -la /backup; ls -la /backup/$MOVED_BACKUPS"
#xcurator-compose exec elasticsearch sh   -c "mkdir -p /es-backup/$MOVED_BACKUPS; mv /es-backup/* /es-backup/$MOVED_BACKUPS; ls -la /es-backup/; ls -la /es-backup/$MOVED_BACKUPS"

# restore using tiredofit from docker compose, reusing same env variables
ssh $DEST_SERVER

# On $DEST_SERVER
SOURCE_SERVER=xcurator-staging # ssh configured host
DEST_PATH=/home/aleksejs/backups-from-$SOURCE_SERVER-backups_$(date +%Y%m%d)

# modify Postgres dump
cd $DEST_PATH; ls

for i in *pgsql*.gz; do
  rm -rvf *.modified*
  # do not overwrite password (TODO: backup "keycloak" DB only?) ALTER ROLE keycloak WITH NOSUPERUSER INHERIT NOCREATEROLE CREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD "SCRAM-SHA...."
  # redirect_url in keycloak may need to be updated
  # N.B. variables below are ad-hoc, for this specific usecase
  gunzip -c $i | \
    sed '/ALTER ROLE/d' | \
    sed "s|https://$staging_host_ap/|https://$production_host_ap/|g" | \
    sed "s|$staging_next_keycloak_secret|$production_next_keycloak_secret|g" | \
    gzip > $i.modified.sql.gz
  md5sum $i.modified.sql.gz > $i.modified.sql.gz.md5
  ls *modified*
done
  # OR use SPLIT_DB instead of sed '/ALTER ROLE/d'?

# Optional, check modified file
gunzip -c *.modified.sql.gz | less

docker exec -it deployment-postgres-backup-1 ls /backup
docker exec -it deployment-postgres-backup-1 sh -c 'rm /backup/*'
# copy files inside backup/restore container to make use of environment variables
docker cp $DEST_PATH/*pgsql*.modified.sql.gz     deployment-postgres-backup-1:/backup/
docker cp $DEST_PATH/*pgsql*.modified.sql.gz.md5 deployment-postgres-backup-1:/backup/
docker cp $DEST_PATH/*mongo*.gz  deployment-mongo-backup-1:/backup/
docker cp $DEST_PATH/*mongo*.md5 deployment-mongo-backup-1:/backup/

# postgres: brute force database removal
xcurator-compose stop postgres; xcurator-compose rm -f postgres; docker volume rm deployment_postgres-data; xcurator-compose up -d postgres
  # OR: use --clean during dump to provide DELETE statements? 

# Restore all backups
docker exec -it deployment-postgres-backup-1 restore
docker exec -it deployment-mongo-backup-1 restore
  # OR restore specific file: docker exec -it deployment-mongo-backup-1 sh -c "restore $FILENAME $DB_TYPE $DB_HOST $DB_NAME $DB_USER $DB_PASS 27017"

# necessary step after Postgres restoration
xcurator-compose restart keycloak
```

- TODO: keycloak admin password - came from staging?

### Monitoring

```sh
du -sm *-backup
docker stats
docker compose ps
docker images
```

### Maintenance

```sh
docker system prune -a # not unused images. Should be part of deployment procedure
```

### Backup restoration

Documentation: https://github.com/tiredofit/docker-db-backup#restoring-databases

#### MongoDB

```sh
# Interactive menu based script to restore your backups
docker exec -it deployment-mongo-backup-1 restore
# Non-interactive restoration
#docker exec -it deployment-mongo-backup-1 restore <filename> <db_type> <db_hostname> <db_name> <db_user> <db_pass> <db_port>
```

- Backup includes ALL collections
- MongoDB on import by default skips duplicated objects by `_id`

### Production admin access

Normally, anything except necessary endpoints is not accessible.
In case some DB changes are necessary, it is possible to work via SSH tunnel.

E.g. it is possible to start same tools under "adminui" and access them.

Example for `mongo-express`, which is configured to be available on port 9081 when started:

```sh
ssh -L 9081:127.0.0.1:9081 xcurator-production

xcurator-compose --profile adminui up -d mongo-express
xcurator-compose ps 

xcurator-compose --profile adminui stop mongo-express
xcurator-compose --profile adminui rm -f mongo-express
```

Port forwarding is done, access http://localhost:9081/mongo-express

Search, e.g.

```
{
  "images": {
    $not: {
      $elemMatch: {
        "licence": { $exists: true }
      }
    }
  }
}
```

P.S. Same approach can be done to access 27017 port directly, or any other.

#### MongoDB shell access

```sh
xcurator-compose exec mongo mongosh
use xcurator
db.auth("xcurator_mongo_user","xcurator_mongo_password")
db.story.count()

# Example: fixing absent license in objects (later fixed by  updated dataset)

db.artefact.find({ "_id": ObjectId('64e38b18ce815882ef0158ad')})

db.artefact.updateOne(
  { "_id": ObjectId('64e38b18ce815882ef0158ad'), "images.licence": { $exists: false } },
  {
    $set: { "images.$[elem].licence": {
      url: 'https://creativecommons.org/publicdomain/zero/1.0/deed.de',
      name: 'CC-0'
    } }
  },
  {
    arrayFilters: [{ "elem.licence": { $exists: false } }]
  }
)


db.artefact.update(
  { "images.licence": { $exists: false } },
  {
    $set: { "images.$[elem].licence": {
      url: 'https://creativecommons.org/publicdomain/zero/1.0/deed.de',
      name: 'CC-0'
    } }
  },
  {
    arrayFilters: [{ "elem.licence": { $exists: false } }],
    multi: true
  }
)

# Update stories to remove non-existent artifacts (necessary, if dataset shrinked)

var cursor = db.story.find({});

while (cursor.hasNext()) {
    var story = cursor.next();
    var modules = story.modules;

    if (modules != null && modules.length > 0) {
        for (var i = 0; i < modules.length; i++) {
            var module = modules[i];
            var artefactIds = module.artefactIds;
            var newArtefactIds = [];

            for (var j = 0; j < artefactIds.length; j++) {
                var artefactId = artefactIds[j];

                if (db.artefact.findOne({ _id: artefactId })) {
                    newArtefactIds.push(artefactId);
                } else {
                    // Artefact not found, perform the action to delete it from the array
                    // In MongoDB shell, you can use splice to remove the element from the array
                    artefactIds.splice(j, 1);
                    j--; // Decrement j to handle the next element after the splice
                }
            }

            // Update the document in the collection with the new artefactIds
            db.story.update(
                { _id: story._id, 'modules._id': module._id },
                { $set: { 'modules.$.artefactIds': newArtefactIds } }
            );
        }
    }
}

exit
```

# Options considered

## importing JSON

1. We prefer to remove MongoDB completely, always a fresh start
  1. Thus, `--drop` option is being used during `mongoimport`
2. Elastic Index have custom mapping.
  1. Monstache is NOT designed to create custom settings, advised to use `curl` to create index: https://github.com/rwynn/monstache/issues/472
    1. Cannot use [dropped-collections](https://rwynn.github.io/monstache-site/config/#dropped-collections), as index will be dropped by Montache and recreated by Monstache/ES with default settings.
    2. Thus using `curl` script, as advised
3. New import may contain LESS objects
  1. Redundant data may be left in index
  2. Thus, need to clean index
    1. Monstache cannot clean Index if MongoDB collection is to be removed, only possible option is dropping index, see [dropped-collections](https://rwynn.github.io/monstache-site/config/#dropped-collections), which we cannot use as described above
      1. ALTERNATIVE: rerun Monstache with full re-sync, BUT requires one-shot start with different config, then reverting to standard "resume" config. Cumbersome.
    2. Removing contents of index is inefficient, dropping is much quicker
    3. Thus, script to drop/recreate index is necessary as a part of the import
4. If Monstache runs during drop/recreate, any activity will force Elastic to create an index with default settings and auto mappings.
  1. Thus, need to stop Monstache, when recreating ES index

## Admin-friendly alias `xcurator-compose`

Goals:
1. Differentiate environment options.
2. Simplify administration task, no simple mistakes as wrong .env used.
3. Uniform name across environments. `localdev-compose`, `staging-compose`, `prod-compose` do increase bloat in documentation and scripts

Not many options are available:
- Create merged .env file during (CICD) setup
- Shell alias, but shell scripts do not natively pick them up
- Script
- Making env-specific copies of docker-compose, which is a bad idea. And cascading YAMLs just brings us back.

Decision:
- create `xcurator-compose` shell script (to be used by scripts AND also available as user-friendly alias)

# xCurator compliance to "Sicherheitskonzept nach BSI-Standard"

This report is made in **November 2023** and is based on latest BSI Technical Guidelines to date.
It focuses on externally available endpoint - i.e. Internet-exposed user frontend.

Additionally to BSI standard technical details below, a number of processes are implemented to increase security:

- Development process includes vulnerability checks against current CVE database on each build.
- Builds are also scheduled to run weekly, reporting new security vulnerabilities to a development team regularly.
- An effort is made to use latest versions of third-party software and update regularly.

### Product/application high-level view

- Reverse proxy / Ingress controller: Caddy, Nginx or similar
- Frontend: Next JS
- Internally used applications. A number of prerequisites and microservices communicating in isolated environment required ONLY during an import. Never exposed to Internet.
  - Database: MongoDB
  - Memory cache: Redis
  - Search engine: ElasticSearch
  - Identity provider: Keycloak and BLM custom IDP
  - Infrastructure: Docker Compose

### BSI documents

> Important quote from BSI documentation (e.g. BSI-TR-02102-1.pdf, but is seen in others):
> "No claim is made to completeness, that means mechanisms not listed are not necessarily considered to be insecure by the BSI"

1. [Technical Guidelines](https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/technische-richtlinien_node.html)
2. [Common Criteria (CC) and Evaluation Methodology (CEM) version 3.1](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Zertifizierung-und-Anerkennung/Zertifizierung-von-Produkten/Zertifizierung-nach-CC/IT-Sicherheiskriterien/CommonCriteria_v31/commoncriteria_v31.html) and [Common Criteria Recognition Agreement](https://www.commoncriteriaportal.org/cc/)

   N/A. "Common Criteria" is very generic; it does not directly provide a list of product security requirements or features for specific (classes of) products

### BSI Technical Guidelines applicability

| Technical Guideline                                                                                                                                                         | xCurator Solution |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| BSI TR-01201 De-Mail                                                                                                                                                        | N/A               |
| BSI TR-02102 Cryptographic Mechanisms                                                                                                                                       | Applicable        |
| BSI TR-02103 X.509-Zertifikate und Zertifizierungspfadvalidierung                                                                                                           | Related, but N/A  |
| BSI TR-03104 Technical Guideline for production data acquisition, -quality testing and transmission for official documents                                                  | N/A               |
| BSI TR-03105 Conformity Tests for Official Electronic ID Documents                                                                                                          | N/A               |
| BSI TR-03106 eHealth - Zertifizierungskonzept für Karten der Generation G2                                                                                                  | N/A               |
| BSI TR-03107 Elektronische Identitäten und Vertrauensdienste im E-Government                                                                                                | N/A               |
| BSI TR-03108 Secure E-Mail Transport                                                                                                                                        | N/A               |
| BSI TR-03109 Technische Vorgaben für intelligente Messsysteme und deren sicherer Betrieb                                                                                    | N/A               |
| BSI TR-03110 eIDAS Token Specification                                                                                                                                      | N/A               |
| BSI TR-03110 Technical Guideline Advanced Security Mechanisms for Machine Readable Travel Documents and eIDAS Token                                                         | N/A               |
| BSI TR-03111 Elliptic Curve Cryptography (ECC)                                                                                                                              | Related, but N/A  |
| BSI TR-03112 Das eCard-API-Framework                                                                                                                                        | N/A               |
| BSI TR-03114 Stapelsignatur mit dem Heilberufsausweis                                                                                                                       | N/A               |
| BSI TR-03115 Komfortsignatur mit dem Heilberufsausweis                                                                                                                      | N/A               |
| BSI TR-03116 Kryptographische Vorgaben für Projekte der Bundesregierung                                                                                                     | N/A               |
| BSI TR-03117 eCards mit kontaktloser Schnittstelle als sichere Signaturerstellungseinheit                                                                                   | N/A               |
| BSI TR-03118 Test Specifications for the Technical Guideline for production data acquisition, -quality testing and transmission for passports                               | N/A               |
| BSI TR-03119 Requirements for Smart Card Readers Supporting eID and eSign Based on Extended Access Control                                                                  | N/A               |
| BSI TR-03121 Technical Guideline Biometrics for Public Sector Applications                                                                                                  | N/A               |
| BSI TR-03122 Conformance Test Specification for Technical Guideline TR-03121 Biometrics for Public Sector Applications                                                      | N/A               |
| BSI TR-03123 XML-Datenaustauschformat für hoheitliche Dokumente                                                                                                             | N/A               |
| BSI TR-03124 eID-Client                                                                                                                                                     | N/A               |
| BSI TR-03125 Preservation of Evidence of Cryptographically Signed Documents                                                                                                 | N/A               |
| BSI TR-03126 Technical Guidelines for the Secure Use of RFID--Radio Frequency Identification                                                                                | N/A               |
| BSI TR-03127 eID-Karten mit eID- und eSign-Anwendung basierend auf Extended Access Control                                                                                  | N/A               |
| BSI TR-03128 Diensteanbieter für die eID-Funktion                                                                                                                           | N/A               |
| BSI TR-03129 PKIs for Machine Readable Travel Documents-Protocols for the Management of Certificates and CRLs                                                               | N/A               |
| BSI TR-03130 eID-Server                                                                                                                                                     | N/A               |
| BSI TR-03131 EAC--Extended Access Control-Box Architektur und Schnittstellen                                                                                                | N/A               |
| BSI TR-03132 Sichere Szenarien für Kommunikationsprozesse im Bereich hoheitlicher Dokumente                                                                                 | N/A               |
| BSI TR-03133 Prüfspezifikation zur Technischen Richtlinie BSI-TR-03132                                                                                                      | N/A               |
| BSI TR-03135 Machine Authentication of MRTDs for Public Sector Applications                                                                                                 | N/A               |
| BSI TR-03137 Digital Seal, JAB Code                                                                                                                                         | N/A               |
| BSI TR-03138 Ersetzendes Scannen (RESISCAN)                                                                                                                                 | N/A               |
| BSI TR-03139 Common Certificate Policy for the Extended Access Control Infrastructure for Passports and Travel Documents issued by EU Member States                         | N/A               |
| BSI TR-03140 Conformity assessment according to the satellite data security act (TR-SatDSiG)                                                                                | N/A               |
| BSI TR-03143 eHealth G2-COS Konsistenz-Prüftool                                                                                                                             | N/A               |
| BSI TR-03144 eHealth – Konformitätsnachweis für Karten-Produkte der Kartengeneration G2                                                                                     | N/A               |
| BSI TR-03145 Secure Certification Authority operation                                                                                                                       | N/A               |
| BSI TR-03146 Elektronische Bildübermittlung zur Beantragung hoheitlicher Dokumente (E-Bild hD)                                                                              | N/A               |
| BSI TR-03147 Vertrauensniveaubewertung von Verfahren zur Identitätsprüfung natürlicher Personen                                                                             | N/A               |
| BSI TR-03148 Secure Broadband Router                                                                                                                                        | N/A               |
| BSI TR-03150 Plan for Testing of Contactless Media and Readers for Conformance with CEN/TS 16794:2017                                                                       | N/A               |
| BSI TR-03151 Secure Element API (SE API) (tamper resistant device)                                                                                                          | N/A               |
| BSI TR-03153 Technische Sicherheitseinrichtung für elektronische Aufzeichnungssysteme                                                                                       | N/A               |
| BSI TR-03154 Technische Richtlinie – BSI TR-03154 Konnektor – Prüfspezifikation für das Fachmodul NFDM (Notfalldatenmanagement)                                             | N/A               |
| BSI TR-03155 Technische Richtlinie – BSI TR-03155 Konnektor – Prüfspezifikation für das Fachmodul AMTS (Arzneimitteltherapiesicherheit)                                     | N/A               |
| BSI TR-03156 Public Sector Identity Management in Conjunction with European Registers                                                                                       | N/A               |
| BSI TR-03157 Konnektor – Prüfspezifikation für das Fachmodul ePA (elektronische Patientenakte)                                                                              | N/A               |
| BSI TR-03158 Anwendungen des Versicherten - AdV--Anwendungen des Versicherten-App                                                                                           | N/A               |
| BSI TR-03159 Mobile Identities (eIDAS)                                                                                                                                      | N/A               |
| BSI TR-03160 Servicekonten (Portalverbund des Bundes und der Länder)                                                                                                        | N/A               |
| BSI TR-03161 Security requirements for eHealth applications                                                                                                                 | N/A               |
| BSI TR-03162 IT-sicherheitstechnische Anforderungen zur Durchführung einer Online-Wahl im Rahmen des Modellprojekts nach § 194a Fünftes Buch Sozialgesetzbuch (Online-Wahl) | N/A               |
| BSI TR-03163 Security in Telecommunications Infrastructure (critical components in public telecommunications networks)                                                      | N/A               |
| BSI TR-03170 Secure electronic transmission (digital transmission of biometric photos)                                                                                      | N/A               |
| BSI TR-03171 Optisch verifizierbarer kryptographischer Schutz von Verwaltungsdokumenten (Digitale Siegel)                                                                   | N/A               |
| BSI TR-03173 Amendments for Conformance Assessments based on ETSI EN--European Standard 303 645/TS 103 701 (IoT)                                                            | N/A               |
| BSI TR-03209 Elektromagnetische Schirmung von Gebäuden                                                                                                                      | N/A               |
| BSI-TR-03165 Trusted Service Management System                                                                                                                              | N/A               |

### Applicable Technical Guidelines

Below, the relevant guidelines for the xCurator application are compared with the technical status of the application.

#### [BSI TR-02102 Cryptographic Mechanisms](https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr02102/tr02102_node.html)

  - Additionally mentioned on [Cryptographic Specifications](https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Kryptografische-Vorgaben/kryptografische-vorgaben_node.html) chapter

  - To fill in above tables following tools were used:
    - https://www.ssllabs.com
    - openssl
      - e.g. checking signature algorithms: `openssl s_client -connect $HOST_AP:443 -sigalgs rsa_pss_rsae_sha512`
    - testssh.sh
      - `testssl $HOST_AP`


  - BSI TR-02102-1
    - N/A. Quote:
      > This Technical Guideline addresses primarily, in a recommendatory manner, developers who are planning to introduce new cryptographic systems from 2023 onwards.

      Application does NOT implement it's own new cryptographic mechanisms. TLS and SSH are used as protection mechanisms for user and administration access respectively.

  - BSI TR-02102-2 - TLS

    Below table lists all cipher suites used, together with their details. Taken from `testssl` tool, some columns added.

    ```
    Hexcode  Cipher Suite Name (OpenSSL)       KeyExch.   Encryption  Bits     Cipher Suite Name (IANA/RFC)                       || TLS version || Perfect Forward Secrecy
    ----------------------------------------------------------------------------------------------------------------------------- || ----------  || ---------------------------
    x1301   TLS_AES_128_GCM_SHA256            ECDH 253   AESGCM      128      TLS_AES_128_GCM_SHA256                              || TLS v1.3    || TLS v1.3 provides PFS by design
    x1302   TLS_AES_256_GCM_SHA384            ECDH 253   AESGCM      256      TLS_AES_256_GCM_SHA384                              || TLS v1.3    || TLS v1.3 provides PFS by design
    x1303   TLS_CHACHA20_POLY1305_SHA256      ECDH 253   ChaCha20    256      TLS_CHACHA20_POLY1305_SHA256                        || TLS v1.3    || TLS v1.3 provides PFS by design
    xc02b   ECDHE-ECDSA-AES128-GCM-SHA256     ECDH 253   AESGCM      128      TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256             || TLS v1.2    || with PFS
    xc02c   ECDHE-ECDSA-AES256-GCM-SHA384     ECDH 253   AESGCM      256      TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384             || TLS v1.2    || with PFS
    xcca9   ECDHE-ECDSA-CHACHA20-POLY1305     ECDH 253   ChaCha20    256      TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256       || TLS v1.2    || with PFS
    ```

  Cipher suite name contains:
    - Example: TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
      - Protocol: e.g. TLS
      - Key exchange: e.g. ECDHE
      - Authentication: e.g. ECDSA
      - Symmetric encryption (session block cipher and key size): e.g. AES 256
        - Type of encryption: e.g. GCM
      - Hash: e.g. SHA384

    | Source      | Topic                                                         | BSI recommended                                  | Actual                             | Additional information                                             |
    | ----------- | ------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------- | ------------------------------------------------------------------ |
    | Chapter 3.2 | SSL/TLS versions                                              | TLS 1.2, TLS 1.3                                 | TLS 1.2, TLS 1.3                   | "Protocols" at SSLLabs                                             |
    | Table 1     | Cipher suites for TLS 1.2 with Perfect Forward Secrecy        | TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256, many more | **See table above**                | Cipher Suites at SSLLabs marked as "FS". All named (EC)DHE         |
    | Table 2     | Cipher suites for TLS 1.2 without Perfect Forward Secrecy     | See the document                                 | N/A                                | Cipher Suites at SSLLabs NOT marked as "FS". E.g. named e.g. RSA   |
    | Table 3     | Cipher suites for TLS 1.2 with pre-shared key                 | See the document                                 | N/A                                | Cipher Suites named as PSK                                         |
    | Table 4     | Diffie-Hellman groups for TLS 1.2                             | secp256r1, secp384r1, secp521r1, etc             | N/A, all ciphers are EC, so no DHG | "Supported Named Groups" at SSLLabs, but is combined with TLS v1.3 |
    | Table 5     | Signature algorithms for TLS 1.2                              | rsa, dsa, ecdsa                                  | SHA256withRSA                      | "Signature algorithm" at SSLLabs                                   |
    | Table 6     | Hash functions for signature algorithms in TLS 1.2            | SHA 256/384/512                                  | SHA256/384                         | See cipher suite SHA*                                              |
    | Table 7     | Pre-shared key modes for TLS 1.3                              | psk_ke, psk_dhe_ke                               | N/A                                | Cipher Suites, marked as PSK                                       |
    | Table 8     | Diffie-Hellman groups for TLS 1.3.                            | secp256r1, secp384r1, secp521r1, etc             | secp256r1, x25519                  | "Supported Named Groups" at SSLLabs, but is combined with TLS v1.2 |
    | Table 9     | Signature algorithms for TLS 1.3 (client/server signatures)   | rsa_pss_rsae_sha256, many more                   | rsa_pss_rsae_sha512/256 and more   | can be tested via openssl -sigalgs                                 |
    | Table 10    | Signature algorithms for TLS 1.3 (signatures in certificates) | rsa_pkcs1_sha256, many more                      | SHA256withRSA                      | "Signature algorithm" at SSLLabs                                   |
    | Table 11    | Cipher suites for TLS 1.3                                     | TLS_AES_256_GCM_SHA384, few more                 | **See table above**                | "Cipher Suites" at SSLLabs, under TLS 1.2 section                  |
    | Table 12    | Minimum key lenghts for the TLS handshake protocol            | RSA >2000, RSA > 3000 up to 2029+                | Equivalent 3072 bits RSA           | See "eq. 3072 bits RSA" in "Cipher Suites" at SSLLabs              |

  - BSI TR-02102-3 - IPsec
    - N/A

  - BSI TR-02102-4 - SSH

    SSH connection is used for administration access only.

    Following commands can be used to obtain information:
      - `sshd --help`, shows SSH server version
      - `ssh -vvv localhost`, e.g.on the server itself, showing SSH protocol details
      - `ssh -Q kex` - client supported Key Exchange methods

    | Source        | Topic                             | BSI recommended                                                                                         | Actual Beta                                                                                                                                                                                                                                                               |
    | ------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | Chapter 3.2   | SSH versions                      | SSH-2                                                                                                   | SSH-2.0-OpenSSH_9.0p1                                                                                                                                                                                                                                                     |
    | Table 1       | Key Exchange methods              | diffie-hellman-group-exchange-sha256, diffie-hellman-group1[4,5,6]-sha256, rsa2048-sha256, ecdh-sha2-\* | sntrup761x25519-sha512@openssh.com,curve25519-sha256,curve25519-sha256@libssh.org,ecdh-sha2-nistp256,ecdh-sha2-nistp384,ecdh-sha2-nistp521,diffie-hellman-group-exchange-sha256,diffie-hellman-group16-sha512,diffie-hellman-group18-sha512,diffie-hellman-group14-sha256 |
    | Chapter 3.3.1 | Key re-exchange                   | 1 hour or 1 gigabyte transmitted                                                                        | OpenSSH: The default is between ‘1G’ and ‘4G’, depending on the cipher. No time based rekeying is done. See [RekeyLimit](https://man.openbsd.org/sshd_config#RekeyLimit)                                                                                                  |
    | Table 2       | Encryption algorithms             | AEAD_AES_[128,256]_GCM, aes[128,192,256]-[cbc,ctr]                                                      | ciphers ctos: chacha20-poly1305@openssh.com,aes128-ctr,aes192-ctr,aes256-ctr,aes128-gcm@openssh.com,aes256-gcm@openssh.com                                                                                                                                                |
    | Table 3       | Function for MAC protection       | hmac-sha2-256, hmac-sha2-512                                                                            | umac-64-etm@openssh.com,umac-128-etm@openssh.com,hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com,hmac-sha1-etm@openssh.com,umac-64@openssh.com,umac-128@openssh.com,hmac-sha2-256,hmac-sha2-512,hmac-sha1                                                     |
    | Table 4       | Methods for server authentication | pgp-sign-dss, ecdsa-sha2-[nistp256,nistp384,nistp521], x509v3-ecdsa-sha2-[nistp256,nistp384,nistp521]   | rsa-sha2-512,rsa-sha2-256,ecdsa-sha2-nistp256,ssh-ed25519                                                                                                                                                                                                                 |
    | Chapter 3.7   | Client authentication             | public key authentication with methods from Table 4                                                     | yes, public key authentication (not a password authentication) is used                                                                                                                                                                                                    |

- [BSI TR-02103 X.509-Zertifikate und Zertifizierungspfadvalidierung](https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr02103/tr02103_node.html)

  - Relates to BSI TR-02102 Cryptographic Mechanisms
  - Describes an implementation of ceritificate verification. Xcurator solution does not implement such functionality on it's own.

    Instead it relies on a well-proven applications, such as LetsEncrypt for certificate issuance and reverse proxies for serving TLS endpoint.

#### Summary

To sum up, best practice are followed and mostly state-of-the-art technology is used. Next step in future-proofing could be getting A+ on SSLLabs test, adding HSTS and increasing "Key Exchange" results.

### Additional notes

- AI, Artificial Intelligence and BSI. BSI as of now does not define any _specific_ guidelines.
  - There are some publications available though: https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Kuenstliche-Intelligenz/KI.html
  - One of notable documents is [AI Cloud Service Compliance Criteria Catalogue (AIC4)](https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/CloudComputing/AIC4/AI-Cloud-Service-Compliance-Criteria-Catalogue_AIC4.pdf?__blob=publicationFile&v=4)
- AI services used in `xCurator`. AI is represented in a form of API services.
  These API are being used only during data enrichment, thus is completely decoupled from actual running web application. As a consequence, these APIs are never exposed to Internet.
  Moreover, the data processed by AI services does not contain personal data, which is one of the main focuses of BSI standard.

- Clouds. When used, following BSI document can be applied: [Cloud Computing Compliance Criteria Catalogue](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Empfehlungen-nach-Angriffszielen/Cloud-Computing/Kriterienkatalog-C5/kriterienkatalog-c5_node.html)
