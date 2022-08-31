docker build . -t mlvp_backend
docker run --rm --name mlvp_backend -p 127.0.0.1:8000:8000 mlvp_backend