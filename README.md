Heroes Admin Panel 🦸‍♂️

React-приложение для управления списком супергероев с возможностью фильтрации и CRUD-операций. Построено на современном стеке технологий с использованием Redux Toolkit Query (RTK Query) и Formik.

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-1.9.7-purple?logo=redux)
![Formik](https://img.shields.io/badge/Formik-2.4.5-blue?logo=formik)
![Yup](https://img.shields.io/badge/Yup-1.4.0-green)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-purple?logo=bootstrap)
![JSON Server](https://img.shields.io/badge/JSON_Server-0.17.4-gray?logo=json)

✨ Особенности
Полный CRUD функционал: Добавление, просмотр и удаление героев

Умная фильтрация: Фильтрация героев по стихиям (огонь, вода, воздух, земля)

Валидация форм: Robust валидация с помощью Formik + Yup

Оптимизированные запросы: Кэширование и автоматическое обновление данных через RTK Query

Адаптивный дизайн: Чистый и современный UI с Bootstrap

Типизация: Полная типизация PropTypes для компонентов

🛠 Технологический стек
Frontend
React 18 (Функциональные компоненты + хуки)

Redux Toolkit (управление состоянием)

RTK Query (fetching данных и кэширование)

Formik + Yup (формы и валидация)

Bootstrap 5 (стилизация)

UUID (генерация уникальных id)

Backend (имитация)

JSON-server (REST API на базе mock-данных)

📦 Установка и запуск

1. Клонируйте репозиторий:

git clone https://github.com/1Swiftkill1/hero_admin_panel_react-reduxjs-toolkit-RTK-Query
cd heroes-admin-panel

2. Установите зависимости:

npm install

3. Запустите приложение:

npm run dev

🎯 Основной функционал

📋 Страница героев

Просмотр списка всех героев

Фильтрация по стихиям (огонь, вода, воздух, земля)

Удаление героев с подтверждением

➕ Добавление героя

Интуитивная форма с валидацией:

Имя (обязательное, 2-50 символов)

Описание (обязательное, 5-200 символов)

Выбор стихии (обязательное поле)

Валидация в реальном времени

Визуальная обратная связь

🌟 Особенности разработки

Кастомные хуки для HTTP-запросов

Мемоизация для оптимизации рендеринга

Деструктуризация пропсов для чистоты кода

Error Boundaries для обработки ошибок

Правильная структура Redux с адаптерами
