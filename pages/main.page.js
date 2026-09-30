import {expect} from "@playwright/test";

export class MainPage {
    constructor(page) {
        this.page = page;
        this.signupButton = page.getByRole('link', { name: 'Sign up' });
        this.profilenameButton = page.locator(`.nav-item.dropdown`);
        this.logoutButton = page.locator(`.dropdown-item`).nth(2);
        this.articleLinks = page.getByRole('link').filter({ has: page.locator('h1') });
        this.articleTitles = this.articleLinks.locator('h1');
        this.firstTag = page.locator('//button[@class="tag-pill tag-default"][1]');
        this.activeTag = page.locator('//button[@class="nav-link active"]');
    }

    async openPage() {
        await this.page.goto("/");
    };

    async gotoRegister(){
        await this.signupButton.click();
    }

    async logout(){
        await this.profilenameButton.click();
        await this.logoutButton.click();
    }

    async getArticleTitles() {
        return await this.articleTitles.allTextContents();
    }

    async getFirstTagText() {
        return await this.firstTag.textContent();
    }

    async clickFirstTag() {
        await this.firstTag.click();
    }
}