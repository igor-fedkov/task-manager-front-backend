# Берем в качестве родительского образа node:8-apline и назовем эту ступень сборки "build-stage"
FROM node:14-alpine as build-stage
# Устанавливаем рабочую директорию
WORKDIR /app
# Копируем файлы package.json yarn.lock в рабочую директорию
COPY package.json /app/
# Устаналиваем зависимости
RUN npm install
# Копируем исходники в рабочую директорию
COPY . /app/
# Собираем проект
RUN npm run build

# Вторая ступень сборки, поднимем nginx для раздачи статики
FROM nginx:stable-alpine
# Копируем билд из ступени сборки "build-stage" в директорию образа /usr/share/nginx/html
COPY --from=build-stage /app/build /usr/share/nginx/html
# Копируем конфиг nginx в директорию образа /etc/nginx/nginx.conf (Напишем его позже)
COPY nginx.conf /etc/nginx/nginx.conf
# Открываем 80 порт
EXPOSE 80
# Указываем команду, поднимающую nginx при запуске контейнера
CMD ["nginx", "-g", "daemon off;"]