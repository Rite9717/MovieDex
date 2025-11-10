# Docker Build Instructions

## Build the Docker Image

```bash
docker build -t movieflix:latest .
```

## Test Locally

```bash
docker run -p 8080:8080 movieflix:latest
```

Then open http://localhost:8080 in your browser.

## Tag for Cloud Run

Replace `YOUR_PROJECT_ID` with your GCP project ID:

```bash
docker tag movieflix:latest gcr.io/YOUR_PROJECT_ID/movieflix:latest
```

## Push to Google Container Registry

```bash
docker push gcr.io/YOUR_PROJECT_ID/movieflix:latest
```

## Deploy to Cloud Run

Use the Google Cloud Console or gcloud CLI to deploy the pushed image to Cloud Run.
Make sure to set the port to 8080.
