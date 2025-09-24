# Step 1: Use an official Node image as the build environment
FROM node:16 AS build

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the app source code
COPY . .

# Step 6: Accept API key as build argument and set it as an environment variable for React
ARG TMDB_V3_API_KEY
ENV REACT_APP_TMDB_API_KEY=$TMDB_V3_API_KEY

# Step 7: Build the React app
RUN npm run build

# Step 8: Use a lightweight web server to serve the build (Nginx)
FROM nginx:alpine

# Step 9: Copy the built React app to Nginx's public folder
COPY --from=build /app/build /usr/share/nginx/html

# Step 10: Expose port 80
EXPOSE 80

# Step 11: Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
