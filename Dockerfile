FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/
EXPOSE 90
CMD ["nginx", "-g", "daemon off;"]