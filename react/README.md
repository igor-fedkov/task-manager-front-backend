# Описание проекта

Приложение состоит из трех страниц: страница аутентификации, страница досок проектов и страница выбранной доски. 
При первом запуске программы или после удаления данных с localStorage первоначальные данные будут загружены автоматически.

# Описание функционала

В проекте поддерживается маршрутизация, что позволяет переходить непосредственно на нужную доску, если пользователь ранее прошел аутентификацию. Приложение поддерживает публичные и приватные маршруты, т.е. аутентифицированный пользователь при попытке зайти на страницу для ввода логина и пароля - будет переадресован на страницу с досками проектов. И наоборот, не аутентифицированный будет переадресовываться на страницу аутентификации. Все данные сохраняются в локальное хранилище localStorage.
При загрузке данных по умолчанию, дата и время событий будут сгенерированы случайным образом с разбросом до года. При этом могут возникнуть такие моменты, когда карточка будет "создана" ранее списка, в котором она находится и раньше доски. Все созданные пользователем события будут сохраняться реальной датой.
Для выхода из системы, пользователь подводит мышку к пользовательскому меню (сверху справа) и в выпадающем меню выбирает выход.
Удаление доски доступно только тому пользователю, который создал эту доску.
Удаление списка может выполнить или пользователь, который создал этот список или пользователь, который создал доску.
Удаление карточки доступно: владельцу карточки; владельцу списка, в котором на данный момент находится карточка или владельцу доски.
Активность логируется при выполнении следующих действий: 
- добавление карточки;
- удаление карточки;
- добавление комментария в конкретную карточку;
- редактирование описания карточки;
- перенос карточки из одного списка в другой;
- удаление списка;
- переименование списка;
- создание доски;
- удаление доски;
Для ускорения загрузки, приложение разбито на части по страницам, каждая страница загружается отдельно.
Данные для начальной загрузки находятся в src\redux\db.json

# Сборка и запуск
Для запуска клонированного с GitHub проекта нужно установить зависимости:
npm install
после чего запустить проект:
npm start

или перейти по ссылке: https://if-task-manager.netlify.app

В системе есть 3 пользователя:
- user@mail.com, пароль: user;
- test@mail.com, пароль: test;
- admin@mail.com, пароль: admin;
