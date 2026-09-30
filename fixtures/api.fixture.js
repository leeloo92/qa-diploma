import { test as base } from '@playwright/test';
import { ApiService } from '../services/api.service';

export const test = base.extend({
    api: async ({ request }, use) => {
        const api = new ApiService(request);
        await use(api);
    },
});