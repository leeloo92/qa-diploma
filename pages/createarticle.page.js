export class CreateArticlePage {
    constructor(page) {
        this.page = page;
        this.newArticleButton = page.locator('a[href="#/editor"]');
        this.articleTitle = page.getByRole('textbox', { name: 'Article Title' });
        this.articleDescription = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.articleContent = page.getByRole('textbox', { name: 'Write your article (in' });
        this.articleTag = page.getByRole('textbox', { name: 'Enter tags' });
        this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });
        this.editArticleButton = page.locator('button:has-text("Edit Article")').first();
        this.deleteArticleButton = page.locator('button:has-text("Delete Article")').first();
        this.likeArticleButton = page.locator('button:has-text("(")').first();

    }
    async createArticle(articleTitle, articleDescription, articleContent, articleTag) {
        await this.newArticleButton.waitFor({ state: 'visible' });
        await this.newArticleButton.click();
        await this.articleTitle.click();
        await this.articleTitle.fill(articleTitle);
        await this.articleDescription.click();
        await this.articleDescription.fill(articleDescription);
        await this.articleContent.click();
        await this.articleContent.fill(articleContent);
        await this.articleTag.click();
        await this.articleTag.fill(articleTag);
        await this.publishArticleButton.click();
    }

    getEditButton() {
        return this.editArticleButton;
    }

    getArticleTitle(articleTitle) {
        return this.page.getByRole('heading', { name: articleTitle });
    }

    getDeleteButton() {
        return this.deleteArticleButton;
    }

    getLikeButton() {
        return this.likeArticleButton;
    }
}
