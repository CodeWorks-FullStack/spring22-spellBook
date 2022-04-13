export class Spell {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    // NOTE make sure to check properties on both apis to see how you should handle it
    this.description = data.description || data.desc.join('\n')
    this.level = data.level
    this.range = data.range
    this.duration = data.duration
    this.components = data.components
    this.prepared = data.prepared || false
  }

  get Template() {
    return /*html*/ `
    <div class="bg-light shadow rounded p-3">
      <h1>${this.name}</h1>
      <p>${this.description}</p>
      <div class="d-flex justify-content-between">
        <h6>Level: ${this.level}</h6>
        <h6>Duration: ${this.duration}</h6>
        <h6>Range: ${this.range}</h6>
      </div>
        ${this.Buttons}
      </div>
      `
  }

  get Buttons() {
    if (this.id) {
      return /*html*/ `
      <div class="d-flex align-items-center justify-content-between p-2">
        <button class="btn btn-danger" onclick="app.mySpellsController.removeSpell('${this.id}')">Remove Spell</button>
        <div>
          <input class="form-check-input" type="checkbox" value="" id="mySpell" ${this.prepared ? 'checked' : ''}  onclick="app.mySpellsController.prepareSpell()">
          <label class="form-check-label" for="mySpell">Prepared</label>
        </div>
      </div>

      `
    }
    return /*html*/ `<button class="btn btn-success" onclick="app.mySpellsController.addSpell()">Add Spell</button>`

  }
}