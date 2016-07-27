import AppDispatcher from '../dispatcher/AppDispatcher'

function loadDataBase () {
  let notes = window.localStorage.getItem('notes')

  if(!notes) notes = new Array()
  else notes = JSON.parse(notes)

  return notes
}

function saveDataBase (notes) {
  window.localStorage.setItem('notes', JSON.stringify(notes))
}

class NoteActions {

  read () {
    let notes = loadDataBase()
    AppDispatcher.dispatch({ type: 'READ', notes })
  }

  create (title, text) {
    let id = new Date().getTime()

    let note = { id, title, text }

    let notes = loadDataBase()

    notes.unshift(note)
    saveDataBase(notes)

    AppDispatcher.dispatch({ type: 'CREATE', note })
  }

  remove (id) {
    let notes = loadDataBase()

    for (let idx of Object.keys(notes)) {
      if (notes[idx].id === id) {
        notes.splice(idx, 1)

        saveDataBase(notes)
        break
      }
    }

    AppDispatcher.dispatch({ type: 'DELETE', id })
  }
}

const _NoteActions = new NoteActions()

export default _NoteActions