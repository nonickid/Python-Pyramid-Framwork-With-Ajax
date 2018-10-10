FROM python:3.7-alpine

RUN mkdir /app

EXPOSE 6543

WORKDIR /app

RUN apk update \
    && apk upgrade \
    && apk add git \
    && apk add gcc \
    && apk add g++ \
    && apk add make \
    && apk add python3-dev

RUN python -m venv venv && source /app/venv/bin/activate \
    && git clone https://github.com/nonickid/pyramid_ajax_example.git web \
    && cd web \
    && python setup.py develop

CMD [ "/app/venv/bin/pserve", "/app/web/development.ini" ]
