FROM node:latest 
ENV MONGO_URL mongodb://db:27017/oj
WORKDIR /dist
COPY package.json /dist
RUN npm install
COPY . /dist
EXPOSE 9000
CMD ["npm", "start"] 