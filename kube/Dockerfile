# Create a container with all the tools required to do a deployment.

FROM quay.io/ukhomeofficedigital/kb8or:v0.6.12

WORKDIR /var/lib/app_deploy
ADD ./ ./
ENTRYPOINT ["./scripts/deploy.sh"]
