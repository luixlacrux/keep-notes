import firebase from 'firebase'
import AppDispatcher from '../dispatcher/AppDispatcher'
import config from '../config'

const mainApp = firebase.initializeApp(config)
const noteRef = mainApp.database().ref('notes')

class NoteActions {

  read () {
    noteRef.on('child_added', snapshot => {
      let note = snapshot.val()
      note.id = snapshot.key

      AppDispatcher.dispatch({ type: 'CREATE', note })
    })

    noteRef.on('child_removed', snapshot => {
      let id  = snapshot.key

      AppDispatcher.dispatch({ type: 'DELETE', id })
    })
  }

  create (title, text) {
    noteRef.push({ title, text })
  }

  remove (id) {
    noteRef.child(id).set(null)
  }
}

const _NoteActions = new NoteActions()

export default _NoteActions