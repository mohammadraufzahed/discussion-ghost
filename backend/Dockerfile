FROM golang:1.19-alpine as builder

RUN apk update && \
    apk upgrade && \
    apk add gcc g++ make

ENV HTTPS_PROXY="http://fodev.org:8118"

WORKDIR /src/app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN GOMAXPROCS=8 GOOS=linux GOARCH=amd64 go build

FROM alpine:latest

# ENV HTTPS_PROXY="http://fodev.org:8118"

WORKDIR /app

COPY --from=builder /src/app/discussion-ghost .

CMD [ "./discussion-ghost" ]

EXPOSE 8000
