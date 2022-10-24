################
# Build Step 1 #
################

# Use
FROM trion/ng-cli-karma:14.0.0 as builder

# Create app directory
WORKDIR /app

# Copy project files into the docker image
COPY . ./

# Install dependencies
RUN npm install

# build for environment
RUN npm run build




################
# Build Step 2 #
################

# Use lightweight version of nginx.
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# From node 'builder' copy website to default nginx public folder
COPY --from=builder /app/dist/angular-boilerplate /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# expose port 80
EXPOSE 8080

# run the nginx server
CMD ["nginx", "-g", "daemon off;"]
