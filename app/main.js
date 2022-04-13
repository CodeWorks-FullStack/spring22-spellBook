import { ApiSpellsController } from "./Controllers/ApiSpellsController.js";
import { MySpellsController } from "./Controllers/MySpellsController.js";

class App {
  mySpellsController = new MySpellsController()
  apiSpellsController = new ApiSpellsController()
}

window["app"] = new App();
