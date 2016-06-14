FROM quay.io/ukhomeofficedigital/nodejs-base:v4.4.2

COPY . /app

RUN npm install -g npm@3

RUN yum clean all && \
  yum update -y && \
  yum install -y git && \
  yum clean all && \
  rpm --rebuilddb && \
  rm -rf node_modules && \
  npm --production=false install --unsafe-perm --no-optional && \
  npm test && \
  npm prune --production && \
  chown -R nodejs:nodejs .

RUN npm install -g nodemon

USER nodejs

EXPOSE 8080
CMD /app/run.sh
