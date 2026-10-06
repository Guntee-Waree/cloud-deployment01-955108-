FROM node:24

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

# dist/ is only partly tracked in git, so compile the TypeScript inside the image
RUN npm run build && npm prune --omit=dev

EXPOSE 3000

CMD ["npm", "start"]
