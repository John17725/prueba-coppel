# pull official base image
FROM node:19-alpine3.16

# create project directory
WORKDIR /app

# copy package
COPY package.json /app/

# install dependencies
RUN yarn

# copy project
COPY . /app/

# assign permission users
RUN chmod 777 node_modules/

# run project
CMD [ "yarn" , "dev"]