# Frontend part of Digital School 72

## Изменения от 04.10.2023 (A0.2.0.1):

- Создан синглтон класс ApiTools (lib/apiRequests.js):
    * Обёртка для axios, корректирующая и изменяющая запросы под наши требования;
    * Метод post отправляет POST-запрос на url с телом body;
    * Метод getCsrfToken возвращает (при отсутствии получает) CSRF токен с бэкэнда;
- Переписана на функцию страница входа
- Переработка регистрации в процессе
