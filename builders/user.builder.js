import { faker } from '@faker-js/faker';

export class UserBuilder {
    generateUserName() {
        this.userName = faker.person.fullName();
        return this;
    };
    generateUserEmail() {
        this.userEmail = `qa_${Date.now()}_${faker.string.alphanumeric(8)}@robot.dev`;
        return this;
    };
    generateUserPassword() {
        this.userPassword = faker.internet.password();
        return this;
    };
    generate() {
        return {
            name: this.userName,
            email: this.userEmail,
            password: this.userPassword
        }
    }
}
