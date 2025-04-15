# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Expose the port the app runs on (customize if needed)
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
