# CUCM Directory Updater

Docker container to bulk update Cisco CUCM directory descriptions from CSV data.
This is a fork and modification to sieteunoseis/cucm-phone-updater

## Prerequisites
- Docker
- CSV file with `pattern`, `description`, and 'alertingname' columns

## CSV Format
```csv
pattern,description,alertingname
1000,Reception Phone,B1-Reception Phone
1001,Conference Room A,B2-Conference Room A
```

## Usage

### Build Locally
```bash
docker build -t cucm-directory-updater .
```

### Run Container
```bash
docker run -v ./data/phones.csv:/app/data/phones.csv \
  -e CUCM_HOST=your-cucm-server \
  -e CUCM_USER=your-username \
  -e CUCM_PASS=your-password \
  -e CUCM_VERSION=15.0 \
  cucm-directory-updater
```
If your CUCM has a self-signed certificate
```bash
docker run -v ./data/phones.csv:/app/data/phones.csv \
  -e CUCM_HOST=your-cucm-server \
  -e CUCM_USER=your-username \
  -e CUCM_PASS=your-password \
  -e CUCM_VERSION=15.0 \
  -e NODE_TLS_REJECT_UNAUTHORIZED=0 \
  cucm-directory-updater
```

### Using GitHub Container Registry

This has not been pushed to the container registry yet.

## Environment Variables
- `CUCM_HOST`: CUCM server hostname/IP
- `CUCM_USER`: AXL username
- `CUCM_PASS`: AXL password
- `CUCM_VERSION`: CUCM version (e.g. 15.0)
