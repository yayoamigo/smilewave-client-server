# Use Node.js as the base image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json file to the working directory
COPY package.json .

# Install the dependencies
RUN npm install

# Copy the rest of the source code to the working directory
COPY . .

# Expose the default port 3000
EXPOSE 3000

# Define the command to run the server
CMD [ "node", "server.js" ]