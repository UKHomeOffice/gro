FROM quay.io/ukhomeofficedigital/nodejs-base:v8

RUN mkdir /public

COPY package.json /app/package.json
RUN npm --loglevel warn install --production --no-optional
COPY . /app
RUN npm --loglevel warn run postinstall

USER 999

CMD ["/app/run.sh"]
