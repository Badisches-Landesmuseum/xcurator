#!/bin/bash

source nexus_repository.sh

MODEL_DIR="rel_wiki_2019"
ARCHIVE_FILE="rel_wiki_2019.tar.lz4"
WIKIMAPPER_DB_FILE="index_enwiki-20190420.db"

if [ ! -d "$MODEL_DIR" ]
then
  curl -o $ARCHIVE_FILE https://nextcloud.3pc.de/s/4gtAB5HCwDc3sJX/download
  unpack_lz4 $ARCHIVE_FILE
fi

if [ ! -f "$WIKIMAPPER_DB_FILE" ]
then
  curl -o ./index_enwiki-20190420.db  https://public.ukp.informatik.tu-darmstadt.de/wikimapper/index_enwiki-20190420.db
fi