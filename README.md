# [SubKeeper](https://subkeeper-b64b3.web.app/)

Это приложение для учета подписок пользователя. Пользователь сам добавляет подписки и на главной может видеть все свои активные и не активные подписки в визуально удобном представлении.

У приложения нет собственного сервера, для аутентификации и хранения базы данных используется Google Firebase. Аутентификация происходит через аккаунт Google.

Приложение написано на фреймворке React, за состояние приложения отвечает Redux, за асинхронные запросы отыечает ReduxThunk. Для удобства работы со слайсам, использован redux toolkit, роутинг приложения реализован с помощью библиотеки React Router, за стили отвечает SCSS. Верстка адаптивная(responsive) для десктопов, планшетов и телефонов.

В приложении использованы следующие библиотеки:
- moment.js для работы с датами
- material ui, из нее взяты элементы Tooltip(обозначение функционала кнопки) и DatePicker(выбор даты в форме)
- bootstrap, хедер и сендвич меню для мобильной версии
- react google charts, из нее взят элемент Chart(диаграмма на главной)
- randomColor, цвет каждой иконки подписки рендерится заново каждый раз

Материалы и сервисы, использованные при создании

- Иконки для карточки подписки взяты из библотеки [Google Material Icons](https://fonts.google.com/icons).
- Иконки githhub, telegram, email из Bootstrap.
- Иконка Google из официального [гайда](https://developers.google.com/identity/sign-in/web/build-button) создания кнопки аутентификации Google.
- Курс валют ЦБ запрашивается с сервиса [cbr-xml-daily](https://www.cbr-xml-daily.ru/).

Тестовый аккаунт google для проверки приложения

- логин testsubkeeper@gmail.com
- пароль Qwerty12345!

Если вдруг найдете баг, то сообщите, пожалуйста мне в телеграм =)
@Cherry_pinya
