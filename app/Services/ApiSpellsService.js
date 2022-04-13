import { ProxyState } from "../AppState.js";
import { Spell } from "../Models/Spell.js";
import { dndApi } from "./AxiosService.js"

class ApiSpellsService {
  async setActiveSpell(spellIndex) {
    const res = await dndApi.get('spells/' + spellIndex)
    ProxyState.activeSpell = new Spell(res.data)
  }
  async getApiSpells() {
    const res = await dndApi.get('spells')
    // NOTE ALWAYS LOG THE RES AND LOOK AT THE DATA
    console.log('api spells res', res.data);
    ProxyState.spells = res.data.results
  }

}

export const apiSpellsService = new ApiSpellsService()