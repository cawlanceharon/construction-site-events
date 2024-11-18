# Use a Node.js base image
FROM node:18-alpine
RUN mkdir /app
WORKDIR /app
COPY . .

RUN yarn install
RUN yarn add --dev tsx

EXPOSE 3000
CMD ["yarn", "start"]

# CMD
# docker build -t construction-site-events .
# docker run -p 3000:3000 construction-site-events
