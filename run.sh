#!/bin/bash
cd data &&
docker run -t -i -p 5000:5000 -v "${PWD}:/data" osrm/osrm-backend osrm-routed --algorithm mld /data/australia-latest.osrm