import { expect } from '@playwright/test';
import { uiTest as test } from '../../fixtures/ui.fixture';
import { UserBuilder, ArticleBuilder } from '../../builders/index';

test('Пользователь может просмотреть 3 статьи на Главной', async ({ app }) => {
    await app.main.openPage();

    await expect(app.main.articleLinks.first()).toBeVisible();

    const titles = await app.main.getArticleTitles();
    console.log(titles);
    expect(titles.length).toBe(3);
});

test('Пользователь может найти статью по тегу', async ({ app }) => {

    await app.main.openPage();

    const expectedTag = await app.main.getFirstTagText();
    await app.main.clickFirstTag();
    await expect(app.main.activeTag).toContainText(expectedTag);
});

test('Пользователь может добавить свою статью', async ({ app }) => {

    await app.main.openPage();
    await app.main.gotoRegister();
    const user = new UserBuilder().generateUserName().generateUserEmail().generateUserPassword().generate();
    await app.register.signup(user.name, user.email, user.password);
    await expect(app.yourfeed.profileName).toContainText(user.name);
    const randomArticle = new ArticleBuilder().generateArticleTitle().generateArticleDescription().generateArticleContent().generateArticleTag().generate();
    await app.createArticle.createArticle(randomArticle.title, randomArticle.description, randomArticle.content, randomArticle.tag);
    await expect(app.createArticle.getEditButton()).toBeVisible();
    await expect(app.createArticle.getArticleTitle(randomArticle.title)).toContainText(randomArticle.title);
});

test('Пользователь может удалить свою статью', async ({ app, page }) => {

    await app.main.openPage();
    await app.main.gotoRegister();
    const user = new UserBuilder().generateUserName().generateUserEmail().generateUserPassword().generate();
    await app.register.signup(user.name, user.email, user.password);
    await expect(app.yourfeed.profileName).toContainText(user.name);
    const randomArticle = new ArticleBuilder().generateArticleTitle().generateArticleDescription().generateArticleContent().generateArticleTag().generate();
    await app.createArticle.createArticle(randomArticle.title, randomArticle.description, randomArticle.content, randomArticle.tag);
    await expect(app.createArticle.getDeleteButton()).toBeVisible();

    await Promise.all([
        page.waitForEvent('dialog').then(dialog => dialog.accept()),
        page.waitForResponse(response =>
            response.request().method() === 'DELETE' &&
            response.url().includes('/api/articles/') &&
            response.ok(),
        ),
        app.createArticle.getDeleteButton().click(),
    ]);
    const authorName = user.name;
    await app.yourfeed.gotoProfile();
    await expect(page).toHaveURL(/#\/profile\//);
    await expect(app.yourfeed.getNoArticlesMessage(authorName)).toBeVisible();
});

test('Пользователь может поставить лайк статье', async ({ app }) => {

    await app.main.openPage();
    await app.main.gotoRegister();
    const user = new UserBuilder().generateUserName().generateUserEmail().generateUserPassword().generate();
    await app.register.signup(user.name, user.email, user.password);
    await expect(app.yourfeed.profileName).toContainText(user.name);
    const randomArticle = new ArticleBuilder().generateArticleTitle().generateArticleDescription().generateArticleContent().generateArticleTag().generate();
    await app.createArticle.createArticle(randomArticle.title, randomArticle.description, randomArticle.content, randomArticle.tag);
    await expect(app.createArticle.getEditButton()).toBeVisible();

    await app.yourfeed.gotoProfile();

    await app.createArticle.getLikeButton().click();
    await expect(app.createArticle.getLikeButton()).toContainText('( 1 )');

});
