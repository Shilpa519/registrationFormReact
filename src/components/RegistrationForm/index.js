import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    onFormSubmit: false,
    firstName: '',
    firstNameErrorMsg: false,
    lastNameErrorMsg: false,
    lastName: '',
  }

  validateFirstName = () => {
    const {firstName} = this.state

    return firstName !== ''
  }

  validateLastName = () => {
    const {lastName} = this.state

    return lastName !== ''
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validateFirstName()
    console.log(isValidFirstName)

    this.setState({firstNameErrorMsg: !isValidFirstName})
  }

  onBlurLastName = () => {
    const isValidLastName = this.validateLastName()

    this.setState({lastNameErrorMsg: !isValidLastName})
  }

  renderFormContainer = () => {
    const {firstNameErrorMsg, lastNameErrorMsg} = this.state
    return (
      <form className="form-container" onSubmit={this.submitForm}>
        <div className="input-element">{this.renderFirstName()}</div>
        {firstNameErrorMsg && <p className="error-message">Required</p>}
        <div className="input-element">{this.renderLastName()}</div>
        {lastNameErrorMsg && <p className="error-message">Required</p>}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    )
  }

  submitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.validateFirstName()
    const isValidLastName = this.validateLastName()

    if (isValidFirstName && isValidLastName) {
      this.setState({onFormSubmit: true})
    } else {
      this.setState({
        firstNameErrorMsg: !isValidFirstName,
        lastNameErrorMsg: !isValidLastName,
        onFormSubmit: false,
      })
    }
  }

  renderFirstName = () => {
    const {firstName, firstNameErrorMsg} = this.state
    const showError = firstNameErrorMsg ? 'error-field' : ''

    return (
      <>
        <label className="label-text" htmlFor="first_name">
          FIRST NAME
        </label>
        <input
          id="first_name"
          className={`user-input ${showError}`}
          type="text"
          value={firstName}
          onChange={this.onChangeFirstName}
          onBlur={this.onBlurFirstName}
        />
      </>
    )
  }

  renderLastName = () => {
    const {lastName, lastNameErrorMsg} = this.state
    const showError = lastNameErrorMsg ? 'error-field' : ''

    return (
      <>
        <label className="label-text" htmlFor="last_name">
          LAST NAME
        </label>
        <input
          id="last_name"
          className={`user-input ${showError}`}
          type="text"
          value={lastName}
          onChange={this.onChangeLastName}
          onBlur={this.onBlurLastName}
        />
      </>
    )
  }

  onChangeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  renderSuccessForm = () => (
    <div className="success-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-image"
      />
      <p className="success-heading">Submitted Successfully</p>
      <button type="button" className="resubmit" onClick={this.onClickResubmit}>
        Submit Another Response
      </button>
    </div>
  )

  onClickResubmit = () => {
    this.setState({onFormSubmit: false, firstName: '', lastName: ''})
  }

  render() {
    const {onFormSubmit} = this.state

    return (
      <div className="app-container">
        <h1 className="heading">Registration</h1>
        <div className="box-container">
          {onFormSubmit ? this.renderSuccessForm() : this.renderFormContainer()}
        </div>
      </div>
    )
  }
}
export default RegistrationForm
