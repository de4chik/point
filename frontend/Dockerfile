FROM oven/bun:1
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
EXPOSE 80
 
# Define the command to run your app
CMD ["bun", "run", "dev"]
