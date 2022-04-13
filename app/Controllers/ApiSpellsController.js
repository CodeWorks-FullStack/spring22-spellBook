import { ProxyState } from "../AppState.js";
import { apiSpellsService } from "../Services/ApiSpellsService.js";
import { Pop } from "../Utils/Pop.js"

function _drawSpells() {
  let template = ''
  ProxyState.spells.forEach(s => template += /*html*/ `<li onclick="app.apiSpellsController.setActiveSpell('${s.index}')" class="selectable">${s.name}</li>`)
  document.getElementById('api-spells').innerHTML = template
}

function _drawActiveSpell() {
  // NOTE setting in html the template of the active spell in appstate
  if (!ProxyState.activeSpell) {
    document.getElementById('active-spell').innerHTML = ''
  } else {
    document.getElementById('active-spell').innerHTML = ProxyState.activeSpell.Template
  }
}

export class ApiSpellsController {
  constructor() {
    this.getApiSpells()
    ProxyState.on('spells', _drawSpells)
    ProxyState.on('activeSpell', _drawActiveSpell)
  }

  async getApiSpells() {
    try {
      await apiSpellsService.getApiSpells()
    } catch (error) {
      Pop.toast(error.message, 'error')
      console.log(error);
    }
  }

  async setActiveSpell(spellIndex) {
    try {
      // NOTE spell index is how we are going to hit the dnd api again to get more specific data
      await apiSpellsService.setActiveSpell(spellIndex)
    } catch (error) {
      Pop.toast(error.message, 'error')
      console.log(error);
    }
  }
}