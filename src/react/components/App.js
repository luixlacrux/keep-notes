import React from 'react'
import Form from './Form'
import Grid from './Grid'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initState()
    this.onSave = this.onSave.bind(this)
  }

  initState () {
    let notes = window.localStorage.getItem('notes')

    if (!notes) notes = new Array()
    else notes = JSON.parse(notes)

    debugger

    return { notes }  
  }

  onSave (note) {
    let notes = this.state.notes.slice()

    notes.unshift(note) // insert new note
    this.setState({ notes }) // change state
    notes = JSON.stringify(notes) // encode notes

    window.localStorage.setItem('notes', notes) // save note in localStorage
  }

  render () {
    return (
      <div id="wrapper">
        <Form onSave={this.onSave}/>
        <Grid notes={this.state.notes}/>
      </div>
    )
  }
}