import { test as base } from '@playwright/test';
import { AppPage } from '../pages/app.page';

export const uiTest = base.extend({
    app: async ({ page }, use) => {
        const app = new AppPage(page);
        await use(app);
    }
});