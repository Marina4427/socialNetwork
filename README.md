# SocialNetwork 📱
Marina4427/socialNetwork

Функциональная социальная сеть с возможностью регистрации, добавления друзей, публикации постов с эмодзи и загрузкой фото. Интерфейс поддерживает локализацию и сохраняет состояние сессии между перезапусками.

## ⚙️ Использование
- Регистрация / вход: создайте аккаунт или войдите в существующий

- Лента: создавайте посты, добавляйте эмоджи, просматривайте посты других

- Профиль: редактируйте информацию о себе, меняйте язык

- Подписки: добавляйте друзей и просмативайте уведомления

- Фтографии: загружайте изображения на свою страницу

## 🌐 Демо
[Демо страницы входа на сайт/регистрации](https://social-network-tau-one.vercel.app/login)

## 📌 Скриншоты
#### 🏠 Мой профиль
[Мой профиль](./screenshots/MyProfile.png)

#### 👤 Друзья и поиск друзей
[Друзья и поиск друзей](./screenshots/friends.png)

#### 🖼️ Фото
[Фото](./screenshots/photos.png)

#### ⏱️ Запросы
[Запросы](./screenshots/requests.png)


## 🚀 Возможности

- 🔐 Регистрация и вход (поддержка i18n на формах входа/регистрации)
  
- 👤 Редактирование личного профиля (имя, дата рождения и другая информация о себе)

- 🧑‍🤝‍🧑 Отправка и принятие запросов в друзья

- 🔔 Уведомления о входящих заявках и действиях

- 📃 Создание, удаление, просмотр постов
  
- ⏱️ Отображение времени публикации с помощью timeago.js

- 😊 Вставка эмодзи в посты с помощью EmojiPicker

- 🖼️ Загрузка фотографий

- 🌍 Просмотр страниц других пользователей

- 🌐 Переключение языка интерфейса (формы login/register) через i18n

- ♻️ Хранение состояния приложения между перезапусками с помощью redux-persist

## 🧩 Стек технологий

-  Frontend: React

- UI-библиотека: [Chakra UI](https://chakra-ui.com/) — адаптивные и доступные компоненты

-  State Management: Redux + Redux Toolkit + redux-persist

-  i18n: react-i18next

-  Emoji: emoji-picker-react

-  Дата и время: timeago.js

-  Стилизация: SCSS

-  Backend: json-server-auth + Express

-  База данных: db.json с использованием json-server

## 🔧 Установка
```bash
git clone https://github.com/Marina4427/socialNetwork.git
cd socialNetwork
npm install
npm run dev
```

## Планы по развитию

- Внедрить чат в реальном времени
- Лайки, репосты, комметарии к постам
- Страница "Избранное" (последняя активность пользователя)
- Фотоальбомы
- На всем сайте сделать смену языка (сейчас поодерживается на формах регистрации и входа)
- Добавить светлую тему



