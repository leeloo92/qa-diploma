import { faker } from '@faker-js/faker';

export class ArticleBuilder {
    generateArticleTitle() {
        this.articleTitle = faker.commerce.productName();
        return this;
    };
    generateArticleDescription() {
        this.articleDescription = faker.commerce.productDescription();
        return this;
    };
    generateArticleContent() {
        this.articleContent = faker.lorem.sentences(3);
        return this;
    };
    generateArticleTag() {
        this.articleTag = faker.lorem.word({ length: { min: 3, max: 7 }, strategy: 'closest' });
        return this;
    };
    generate() {
        return {
            title: this.articleTitle,
            description: this.articleDescription,
            content: this.articleContent,
            tag: this.articleTag
        }
    }
}
