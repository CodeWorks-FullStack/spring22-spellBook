import { ProxyState } from "../AppState.js"
import { Spell } from "../Models/Spell.js";
import { sandboxApi } from "./AxiosService.js"

class MySpellsService {
  async prepareSpell() {
    let spellToEdit = ProxyState.activeSpell
    // flip a bool the easy mode way
    spellToEdit.prepared = !spellToEdit.prepared
    // NOTE ***MAKE SURE TO USE YOUR NAME WHEN USING THE SANDBOX*****
    const res = await sandboxApi.put('harrison/spells/' + spellToEdit.id, spellToEdit)
    // Finding the index of the thing we are replacing
    const editedSpellIndex = ProxyState.mySpells.findIndex(s => s.id == res.data.id)
    const newSpell = new Spell(res.data)
    // using splice to deleted the object at the index we pass, delete 1, and replace with new spell
    ProxyState.mySpells.splice(editedSpellIndex, 1, newSpell)
    ProxyState.mySpells = ProxyState.mySpells
    // returning new spell for the pop toast in the controller
    return newSpell
  }
  async removeSpell(spellId) {
    await sandboxApi.delete('harrison/spells/' + spellId)
    // NOTE this is for the toast notification in the controller
    ProxyState.activeSpell = null
    return ProxyState.mySpells.find(s => s.id == spellId)
  }
  setActiveSpell(spellId) {
    const activeSpell = ProxyState.mySpells.find(s => s.id == spellId)
    ProxyState.activeSpell = activeSpell
  }
  async getMySpells() {
    const res = await sandboxApi.get('harrison/spells')
    console.log('my spells res', res.data);
    ProxyState.mySpells = res.data.map(s => new Spell(s)).sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    })

  }
  async addSpell() {
    const foundSpell = ProxyState.mySpells.find(s => s.name == ProxyState.activeSpell.name)
    if (foundSpell) {
      throw new Error("You already have that spell BRUH")
    }
    // NOTE on a post request, make sure to separate the url and the payload by a ,
    const res = await sandboxApi.post('harrison/spells', ProxyState.activeSpell)
    // Local refresh - much better - we take what was already there, and also add in the newly created spell
    ProxyState.mySpells = [...ProxyState.mySpells, new Spell(res.data)].sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    })

    // NOTE below works, but is bad. 
    // this.getMySpells()
    return res.data
  }

}

export const mySpellsService = new MySpellsService()