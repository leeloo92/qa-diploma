export class YourfeedPage {
    constructor(page) {
        this.page = page;
        this.profileName = page.getByRole('navigation');
        this.profileNameButton = page.locator(`.nav-item.dropdown`);
        this.profileButton = page.locator(`.dropdown-item`).first();
    }

    async gotoProfile() {
        await this.profileNameButton.click();
        await this.profileButton.click();
    }

    getNoArticlesMessage(authorName) {
        const text = `${authorName} doesn't have articles.`;
        return this.page.getByText(text, { exact: false });
    }
}
