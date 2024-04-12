# Build stage
FROM node:alpine 
WORKDIR /front-end
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# # Runtime stage
# FROM node:alpine
# WORKDIR /front-end
# COPY --from=builder /cache/node_modules ./node_modules
# COPY --from=builder /cache/.next ./.next
# COPY --from=builder /cache/package.json ./package.json

EXPOSE 3000

CMD ["sh", "-c", "npm install && npm run dev"]