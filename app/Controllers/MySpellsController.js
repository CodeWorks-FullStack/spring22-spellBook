import { ProxyState } from "../AppState.js";
import { mySpellsService } from "../Services/MySpellsService.js";
import { Pop } from "../Utils/Pop.js";

function _drawMySpells() {
  let template = ''
  ProxyState.mySpells.forEach(s => template += /*html*/ `<li class="selectable" onclick="app.mySpellsController.setActiveSpell('${s.id}')">${s.name} ${s.prepared ? '<i class="mdi mdi-star"></i>' : ''} </li>`)
  document.getElementById('my-spells').innerHTML = template
}

function _drawPrepared() {
  let total = ProxyState.mySpells.length
  let preparedTotal = ProxyState.mySpells.filter(s => s.prepared).length
  document.getElementById('total').innerText = total.toString()
  document.getElementById('prepared').innerText = preparedTotal.toString()
}


export class MySpellsController {
  constructor() {
    this.getMySpells()
    ProxyState.on('mySpells', _drawMySpells)
    ProxyState.on('mySpells', _drawPrepared)
  }

  async removeSpell(spellId) {
    try {
      const removedSpell = await mySpellsService.removeSpell(spellId)
      Pop.toast(`${removedSpell.name} has been removed!`, 'success')
    } catch (error) {
      Pop.toast(error.message, 'error')
      console.log(error);
    }
  }

  async prepareSpell() {
    try {
      let preparedSpell = await mySpellsService.prepareSpell()
      Pop.toast(`${preparedSpell.name} was prepared for battle!`, 'success')
    } catch (error) {
      Pop.toast(error.message, 'error')
      console.log(error);
    }
  }

  setActiveSpell(spellId) {
    try {
      mySpellsService.setActiveSpell(spellId)
      // @ts-ignore
      // Closing offcanvas after active spell has been set
      bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('my-spells-offcanvas')).toggle()
    } catch (error) {
      Pop.toast(error.message, 'error')
      console.log(error);
    }
  }

  async getMySpells() {
    try {
      await mySpellsService.getMySpells()
    } catch (error) {
      Pop.toast(error.message, 'error')
      console.log(error);
    }
  }

  async addSpell() {
    try {
      const newSpell = await mySpellsService.addSpell()
      Pop.toast(`${newSpell.name} was added!`, 'success')
    } catch (error) {
      Pop.toast(error.message, 'error')
      console.log(error);
    }
  }
}