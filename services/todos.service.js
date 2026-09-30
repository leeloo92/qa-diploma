import { test, expect } from "@playwright/test";
import {request} from "node:http";

export class TodosService {
    constructor(request) {
        this.request = request;
    }
    async post(token, todo){
        return test.step('post /todos', async() => {
            return await this.request.post(` /todos`, {
                headers: {
                    'x-challenger': token
                },
                data: todo
            });
        });
    }

    async get(token){
        return await this.request.get(` /todos`, {
            headers: {
                'x-challenger': token
            }
        });
    }

    async getNotFound(token){
        return await this.request.get(` /todo`, {
            headers: {
                'x-challenger': token
            }
        });
    }

    async getId(token, id){
        return await this.request.get(` /todos/${id}`, {
            headers: {
                'x-challenger': token
            }
        });
    }

    async put(token, id, todo){
        return test.step('put /todos', async() => {
            return await this.request.put(` /todos/${id}`, {
                headers: {
                    'x-challenger': token
                },
                data: todo
            });
        });
    }

    async delete(token, id){
        return await this.request.delete(` /todos/${id}`, {
            headers: {
                'x-challenger': token
            }
        });
    }
}

