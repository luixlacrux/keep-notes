import React from 'react'
import Form from './Form'
import Grid from './Grid'
import NoteActions from '../actions/NoteActions'
import NoteStore from '../stores/NoteStore'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { notes: [] }
  }

  componentDidMount () {
    NoteStore.on('change', () => {
      this.setState({ notes: NoteStore.getAll() })
    })

    NoteActions.read()
  }
 
  render () {
    return (
      <div id="wrapper">
        <Form />
        <Grid notes={this.state.notes}/>
      </div>
    )
  }
}