#!/bin/bash
mkdir data && cd data &&
wget http://download.geofabrik.de/australia-oceania/australia-latest.osm.pbf &&
docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-extract -p /opt/foot.lua /data/australia-latest.osm.pbf &&
docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-extract -p /opt/bike.lua /data/australia-latest.osm.pbf &&
docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-extract -p /opt/drive.lua /data/australia-latest.osm.pbf &&
docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-partition /data/australia-latest.osrm &&
docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-customize /data/australia-latest.osrm
