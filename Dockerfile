FROM quay.io/ukhomeofficedigital/nodejs:v1.0.1

RUN npm install -g nodemon

USER nobody
EXPOSE 8080
CMD /app/run.sh
