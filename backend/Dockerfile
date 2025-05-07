<<<<<<< HEAD
FROM golang:1.24-alpine AS build
=======
FROM golang:1.24
>>>>>>> 97093be799ecb0570257270bfdb1675fe8466cf2

WORKDIR /usr/src/app

# Copiar archivos de dependencias y descargarlas
COPY go.mod go.sum ./
RUN go mod tidy && go mod download

# Copiar el código fuente
COPY . .

# Compilar la aplicación
<<<<<<< HEAD
RUN go mod tidy && CGO_ENABLED=0 GOOS=linux go build -o main .

# Crear una imagen final más pequeña
FROM alpine:latest

WORKDIR /app

# Instalar certificados para HTTPS
RUN apk --no-cache add ca-certificates

# Copiar el binario compilado desde la etapa anterior
COPY --from=build /app/main .
=======
RUN go build -v -o /usr/local/bin/app
>>>>>>> 97093be799ecb0570257270bfdb1675fe8466cf2

# Puerto que expondrá la aplicación
EXPOSE 8081

# Comando para ejecutar la aplicación
CMD ["/usr/local/bin/app"]


# Crear una imagen final más pequeña
# FROM alpine:latest

# WORKDIR /app

# Instalar certificados para HTTPS
# RUN apk --no-cache add ca-certificates

# Copiar el binario compilado desde la etapa anterior
# COPY --from=build /app/main .