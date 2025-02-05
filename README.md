# CUCM Phone Updater

Docker container to bulk update Cisco CUCM phone descriptions from CSV data.

## Prerequisites
- Docker
- CSV file with `name` and `description` columns

## CSV Format
```csv
name,description
SEP0038DFB50658,Reception Phone
SEP0038DFB50659,Conference Room A
```

## Usage

### Build Locally
```bash
docker build -t cucm-phone-update .
```

### Run Container
```bash
docker run -v /data/phones.csv:/app/data/phones.csv \
  -e CUCM_HOST=your-cucm-server \
  -e CUCM_USER=your-username \
  -e CUCM_PASS=your-password \
  -e CUCM_VERSION=15.0 \
  cucm-phone-update
```

### Using GitHub Container Registry
```bash
docker pull ghcr.io/sieteunoseis/cucm-phone-update:latest

docker run -v /data/phones.csv:/app/data/phones.csv \
  -e CUCM_HOST=your-cucm-server \
  -e CUCM_USER=your-username \
  -e CUCM_PASS=your-password \
  -e CUCM_VERSION=15.0 \
  ghcr.io/sieteunoseis/cucm-phone-update:latest
```

## Environment Variables
- `CUCM_HOST`: CUCM server hostname/IP
- `CUCM_USER`: AXL username
- `CUCM_PASS`: AXL password
- `CUCM_VERSION`: CUCM version (e.g. 15.0)