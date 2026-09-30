import { CreateArticlePage, MainPage, RegisterPage, YourfeedPage} from "./index";

export class AppPage {
    constructor(page) {
        this.page = page;
        this.createArticle = new CreateArticlePage(page);
        this.main = new MainPage(page);
        this.register = new RegisterPage(page);
        this.yourfeed = new YourfeedPage(page);
    }
}