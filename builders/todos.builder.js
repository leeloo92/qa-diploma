import { faker } from '@faker-js/faker';

export class TodosBuilder {
    generateTodosTitle() {
        this.todosTitle = faker.lorem.sentence(4);
        return this;
    };
    generateTodosStatus() {
        this.todosStatus = faker.datatype.boolean();
        return this;
    };
    generateTodosDescription() {
        this.todosDescription = faker.lorem.sentences(2);
        return this;
    };
    generate() {
        return {
            title: this.todosTitle,
            status: this.todosStatus,
            description: this.todosDescription
        }
    }

}