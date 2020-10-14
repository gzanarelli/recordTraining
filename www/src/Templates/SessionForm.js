import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import GlobalForm from '../Components/GlobalForm'

class SessionForm extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { history, action, match } = this.props
    console.log('action form note: ', this.props)
    const initialValues = {
      label: '',
      tag: '',
      colorTag: ''
    }
    if (action === 'post') {
      initialValues.noteId = _.get(match, 'params.noteId')
    }
    return (
      <div className='login'>
        <h1>{action === 'put' ? 'Editer' : 'Ajouter'} une session</h1>
        <GlobalForm
          initialValues={initialValues}
          url='session/'
          putId={_.get(match, 'params.sessionId')}
          backUrl={'/session/' + _.get(match, 'params.noteId')}
          verb={action}
          history={history}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(SessionForm)
