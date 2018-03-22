import { IRequestContext } from "../common/request-context";

export class HomeController {
    constructor(private context: IRequestContext) {

    }

    async index() {
        this.context.response.render("home/index", { title: "Home" });
    }
}
