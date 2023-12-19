if [ -z "$1" ]
  then
    echo "ERROR: no password for user 'elastic' supplied"
    exit 1
fi

if [ -z "$2" ]
  then
    echo "ERROR: no index name supplied"
    exit 1
fi

echo "### Removing ES index '$2'" # TODO naming, remove vs clean
curl -u elastic:$1 -XDELETE "http://localhost:9200/xcurator.$2"
echo