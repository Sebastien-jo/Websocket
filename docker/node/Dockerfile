# pull official base image
FROM node:19-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN chown node:node  . -R


## install app dependencies
WORKDIR /app/react
RUN yarn install
RUN yarn add npm@latest expo-cli@latest react-scripts -g --silent
## install global packages
CMD ["yarn", "start"]
##
#WORKDIR /app/react_native_app
#RUN yarn install
#
#ENTRYPOINT ["yarn", "web"]