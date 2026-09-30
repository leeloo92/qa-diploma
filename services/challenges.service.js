import { test, expect } from "@playwright/test";
import {request} from "node:http";

export class ChallengesService {
    constructor(request) {
        this.request = request;
    }
    async get(token){
        return test.step('get /challenges', async() => {
            let response = await this.request.get(`/challenges`, {
                headers: {
                    'x-challenger': token
                }
            });
            const headers = await response.headers();
            const body = await response.json();
            return response;
        });
    }
}