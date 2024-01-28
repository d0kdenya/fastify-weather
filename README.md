## Перед запуском

Перед запуском важно заполнить конфиг (.development.env)<br>
P.S. можно использовать поля из example.env<br>
P.P.S. ВАЖНО, чтобы переменная POSTGRES_HOST совпадала с container_name приложения, т.к. оно запускается в среде докера.

```bash
$ npm install
```

## Запуск приложения

```bash
# development
$ docker compose up -d
```

Документацию можно получить по ссылке: localhost:${PORT}/api