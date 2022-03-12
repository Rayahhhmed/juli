#!/bin/bash
cd data &&
docker run -t -i -p 9595:9595 -v "${PWD}:/data" osrm/osrm-backend osrm-routed --algorithm mld /data/australia-latest.osrm