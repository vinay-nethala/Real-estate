FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache curl
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache curl
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3006
CMD ["serve", "-s", "dist", "-l", "3006"]
