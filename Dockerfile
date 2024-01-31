# Use the official Node.js image from Docker Hub with the specified version and Alpine Linux as the base.
FROM node:18-alpine

# Set the working directory inside the container to /app.
WORKDIR /app

# Copy package.json and package-lock.json (if exists) into the container at /app.
COPY package*.json ./

# Install Python, make, and g++ in order to build native dependencies for Node.js packages.
# Then, remove the package cache to reduce the image size.
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

# Install Node.js dependencies using npm.
RUN npm install -f

# Copy all files from the current directory into the container at /app.
COPY . .

# Expose port 8000 to the outside world. This doesn't actually publish the port, but documents the intended purpose.
EXPOSE 8000

# Specify the command to run when the container starts.
CMD ["npm", "start"]