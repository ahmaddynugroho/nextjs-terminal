FROM node:22-alpine as base
WORKDIR /app
COPY package.json .
RUN ["npm", "install"]
COPY . .

FROM base as dev
CMD ["npm", "run", "dev"]
