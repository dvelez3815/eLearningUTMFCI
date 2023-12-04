FROM node:14.21.3-alpine as build-stage
 
WORKDIR /elearningfront

COPY package.json .
RUN npm install
COPY . .

 


ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ARG REACT_APP_SECRET_TOKEN
ENV REACT_APP_SECRET_TOKEN=$REACT_APP_SECRET_TOKEN
ARG SKIP_PREFLIGHT_CHECK
ENV SKIP_PREFLIGHT_CHECK=$SKIP_PREFLIGHT_CHECK
ARG REACT_APP_SECRET_KEY
ENV REACT_APP_SECRET_KEY=$REACT_APP_SECRET_KEY
ARG REACT_APP_SITE_KEY
ENV REACT_APP_SITE_KEY=$REACT_APP_SITE_KEY

RUN npm run build

# Stage 2
FROM nginx:1.17.0-alpine

COPY --from=build-stage /elearningfront/build /usr/share/nginx/html
EXPOSE 3000

CMD nginx -g 'daemon off;'