import {ChallengerService, ChallengesService, TodosService} from './index';

export class ApiService {
    constructor(request) {
        this.request = request;
        this.challenger = new ChallengerService(request);
        this.challenges = new ChallengesService(request);
        this.todos = new TodosService(request);
    }
}