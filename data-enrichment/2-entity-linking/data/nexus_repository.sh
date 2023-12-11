#!/bin/bash

: ' ########################################
Download and unpack lz4 archive_files. This is used by devs as well as ci pipelines
to handle larger archive_files in projects.

Author: Sören Räuchle | 3pc GmbH
######################################### '

download() {
  url=$1
  target_dir=$(pwd)
  archive_filename=$(basename -- "$url")

  wget -P "$target_dir" --no-clobber "$url"
  echo "$target_dir/$archive_filename"
}

unpack_lz4() {
  target_dir=$(pwd)
  archive_file=$1

  lz4 -dc < "$archive_file" | tar xvf  - -C "$target_dir"
  rm "$archive_file"
}

compress_lz4() {
  target_dir=$(pwd)
  archive_file_or_directory=$1
  name=$(basename -- "$archive_file_or_directory")

  tar -cvf - "$archive_file_or_directory" | lz4 -c > "$name".tar.lz4
  echo "$name".tar.lz4
}

upload(){
  lz4_archive_file=$1
  user=$2
  password=$3

  # shellcheck disable=SC1073
  if [[ "$lz4_archive_file" == *tar.lz4 ]]
  then
    echo "upload $lz4_archive_file -> https://nexus.3pc.de/repository/raw-repo/model/"
    curl --progress-bar --fail -u "$user":"$password" --upload-file "$lz4_archive_file" "https://nexus.3pc.de/repository/raw-repo/model/$lz4_archive_file"
  else
    echo "no lz4 archive_file ($lz4_archive_file). Did you used the correct lz4 archive_file (*.tar.lz4)?"
  fi
}