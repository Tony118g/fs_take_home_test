FROM node:20-alpine

WORKDIR /app

# Force dev mode so vite gets installed
ENV NODE_ENV=development

COPY package*.json ./
RUN npm install --include=dev

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
