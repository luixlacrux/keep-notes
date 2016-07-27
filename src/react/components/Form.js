import React from 'react'
import NoteActions from '../actions/NoteActions'

export default class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = { open: false }
    this.close = this.close.bind(this)
  }

  open () {
    document.addEventListener('click', this.close)
    this.setState({ open: true })
  }

  close () {
    document.removeEventListener('click', this.close)
    this.setState({ open: false })
  }

  save (e) {
    e.preventDefault()

    let note = {
      id: new Date().getTime(),
      title: this.refs.title.value,
      text: this.refs.text.value
    }

    NoteActions.create(note.title, note.text)

    this.clean() // empty form
    this.close() // close form
  }

  clean () {
    this.refs.title.value = ''
    this.refs.text.value = ''
  }

  render () {
    return (
      <form 
        className={`addnote ${this.state.open ? 'open' : ''}`}
        onFocus={this.open.bind(this)}
        onSubmit={this.save.bind(this)}
        ref="form">

        <input className="addnote-title" type="text" placeholder="Titulo" ref="title"/>
        <textarea className="addnote-text" placeholder="Añadir nota" ref="text"></textarea>
        <div className="addnote-toolbar">
          <button>Hecho</button>
          <a className="addnote-btn-list"></a>
        </div>

      </form>
    )
  }

  componentDidMount () {
    this.refs.form.addEventListener('click', e => e.stopPropagation())
  }
}
