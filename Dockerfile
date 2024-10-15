# Step 1: Build the React application
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application’s source code
COPY . .

# Build the application for production
RUN npm run build

# Step 2: Serve the React app with nginx
FROM nginx:stable-alpine

# Remove the default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the React build files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port nginx is running on
EXPOSE 80

# Start nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
