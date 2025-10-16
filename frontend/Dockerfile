FROM oven/bun:1 AS build
WORKDIR /app

COPY package*.json bun.lockb* ./
RUN bun install

COPY . .

RUN bun run build

FROM oven/bun:1 AS production
WORKDIR /app

COPY --from=build /app ./

EXPOSE 80

# Запуск продакшн сервера
CMD ["bun", "run", "start"]
