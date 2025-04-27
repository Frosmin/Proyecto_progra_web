FROM golang:1.21-alpine AS build

WORKDIR /app

# Copiar archivos de dependencias y descargarlas
COPY go.mod go.sum ./
RUN go mod download

# Copiar el código fuente
COPY . .

# Compilar la aplicación
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Crear una imagen final más pequeña
FROM alpine:latest

WORKDIR /app

# Instalar certificados para HTTPS
RUN apk --no-cache add ca-certificates

# Copiar el binario compilado desde la etapa anterior
COPY --from=build /app/main .

# Puerto que expondrá la aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["/app/main"]