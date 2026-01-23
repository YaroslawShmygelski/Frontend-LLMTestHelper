FROM node:22-alpine AS base

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS dev

CMD ["npm", "run", "dev", "--", "--host"]

FROM base AS builder

COPY . .

RUN npm run build

FROM nginx:alpine AS prod

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html4

CMD ["nginx", "-g", "daemon off;"]