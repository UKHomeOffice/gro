kubectl create secret generic redis --from-literal=session_secret=${SESSION_SECRET}
kubectl create secret generic hof-notify-key --from-literal=hof-notify-key=${NOTIFY_KEY}
