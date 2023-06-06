FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#installs dependencies
# * means install all files that start with package
COPY ./package*.json ./

RUN npm install

#copies from source to workdir
COPY . .

EXPOSE 3001

# CMD ["npm", "start"]

# Start the custom entrypoint script when the container starts
ENTRYPOINT ["/app/entrypoint.sh"]

# Copy the entrypoint.sh script to the container
COPY entrypoint.sh /app/entrypoint.sh

# Set the execution permissions for the entrypoint script
RUN chmod +x /app/entrypoint.sh

