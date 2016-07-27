import AppDispatcher from '../dispatcher/AppDispatcher'
import {EventEmitter} from 'events'

class NoteStore extends EventEmitter {

  get (id) {
    _notes.map(note => {
      if (note.id === id) return note
    })

    return false
  }

  getAll () {
    return _notes.slice()
  }
}

const _NoteStore = new NoteStore()
let _notes = new Array()

// El callback será siempre ejecutado pasandole el mensaje como primer argumento
function callback (payload) {
  // Basándonos en la propiedad type del mensaje, podemos inferir qué datos
  // contiene el mensaje y qué debemos hacer con ellos
  switch (payload.type) {
    case 'READ':
      _notes.push.apply(_notes, payload.notes)
      break
    case 'CREATE':
      _notes.unshift(payload.note)
      break
    case 'DELETE':
      for (let idx of Object.keys(_notes)) {
        if (_notes[idx].id === payload.id) {
          _notes.splice(idx, 1)
          break
        }
      }
      break

    // Si se ignora el mensaje, directamente termina 
    default: return false
  }

  _NoteStore.emit('change')

  return true
}

AppDispatcher.register(callback)
export default _NoteStore










