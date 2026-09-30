import { test, expect } from "@playwright/test";
import {request} from "node:http";


export class ChallengerService {
    constructor(request) {
        this.request = request;
    }
    async post(){
        return test.step('post /challenger', async() => {
            let response = await this.request.post(` /challenger`);
            const headers = await response.headers();
            return headers;
        });
    };

}