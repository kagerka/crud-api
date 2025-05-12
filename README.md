# crud-api

### Prerequisites

1. Fork this repository: `https://github.com/kagerka/crud-api.git`
2. To install all dependencies use `npm install`.
3. Rename file `.env.example` to `.env`.
4. Run scripts `npm run start:dev` or `npm run start:prod` in command line.
5. Use Postman to check the server works properly.

### Implemented endpoint `api/users`:

1. **GET** `api/users` is used to get all persons.
2. **GET** `api/users/{userId}` is used to get a person with current id.
3. **POST** `api/users` is used to create record about new user and store it in database.
4. **PUT** `api/users/{userId}` is used to update existing user.
5. **DELETE** `api/users/{userId}` is used to delete existing user from database.
