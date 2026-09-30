import { test } from '../../fixtures';
import { expect } from '@playwright/test';
import { TodosBuilder } from '../../builders/index';

let body, headers, token;
test.beforeAll('Получаем токен', async ({ api }) => {
    headers = await api.challenger.post();
    token = headers ['x-challenger'];
});

test.describe ('API Challenges', () => {

    test ('GET /api/challenges (200)', async ({ api }) => {
        const response = await api.challenges.get(token);
        body = await response.json();
        expect (response.status()).toBe(200);
        expect(body.challenges.length).toEqual(99);
    });

    test ('POST /api/todos (201)', async ({ api }) => {
        const randomTodo = new TodosBuilder().generateTodosTitle().generateTodosStatus().generateTodosDescription().generate();
        const response = await api.todos.post(token, {
            "title": randomTodo.title,
            "doneStatus": randomTodo.status,
            "description": randomTodo.description
    });
        body = await response.json();
        expect(response.status()).toBe(201);
        expect(body.title).toBe(randomTodo.title);
        expect(body.doneStatus).toBe(randomTodo.status);
        expect(body.description).toBe(randomTodo.description);
    });

    test ('GET /api/todos (200)', async ({ api }) => {
        const response = await api.todos.get(token);
        body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.todos.length).not.toBe(0);
    });

    test ('GET /api/todo (404)', async ({ api }) => {
        const response = await api.todos.getNotFound(token);
        expect(response.status()).toBe(404);
    });

    test ('GET /api/todos/{id} (200)', async ({ api }) => {
        const randomTodo = new TodosBuilder().generateTodosTitle().generateTodosStatus().generateTodosDescription().generate();
        const todos = await api.todos.post(token, {
            "title": randomTodo.title,
            "doneStatus": randomTodo.status,
            "description": randomTodo.description
        });
        const createdBody = await todos.json();
        const id = createdBody.id;
        const response = await api.todos.getId(token, id);
        const getBody = await response.json();
        expect(response.status()).toBe(200);
        const foundTodo = getBody.todos[0];
        expect(foundTodo.id).toBe(id);
        expect(foundTodo.title).toBe(randomTodo.title);
        expect(foundTodo.doneStatus).toBe(randomTodo.status);
        expect(foundTodo.description).toBe(randomTodo.description)
    });

   test ('PUT /api/todos/{id} full (200)', async ({ api }) => {
       const randomTodo = new TodosBuilder().generateTodosTitle().generateTodosStatus().generateTodosDescription().generate();
       const todos = await api.todos.post(token, {
           "title": randomTodo.title,
           "doneStatus": randomTodo.status,
           "description": randomTodo.description
       });
       const createdBody = await todos.json();
       const id = createdBody.id;
       const newTodo = new TodosBuilder().generateTodosTitle().generateTodosStatus().generateTodosDescription().generate();
       const response = await api.todos.put(token, id, {
           "title": newTodo.title,
           "doneStatus": newTodo.status,
           "description": newTodo.description
       });
       expect(response.status()).toBe(200);
       const getBody = await response.json();
       expect(getBody.id).toBe(id);
       expect(getBody.title).toBe(newTodo.title);
       expect(getBody.doneStatus).toBe(newTodo.status);
       expect(getBody.description).toBe(newTodo.description)
   });

   test ('DELETE /api/todos/{id} (200)', async ({ api }) => {
       const randomTodo = new TodosBuilder().generateTodosTitle().generateTodosStatus().generateTodosDescription().generate();
       const todos = await api.todos.post(token, {
           "title": randomTodo.title,
           "doneStatus": randomTodo.status,
           "description": randomTodo.description
       });
       const createdBody = await todos.json();
       const id = createdBody.id;
       const response = await api.todos.delete(token, id);
       expect(response.status()).toBe(204);
       const del = await api.todos.getId(token, id);
       expect(del.status()).toBe(404);
   });
});
