import React, { PropTypes } from 'react';

// TODO: multiLine

class TextField extends React.Component {
  constructor() {
    super();

    this.state = {
      isValid: true,
    };
  }

  validField = () => {
    const regExp = new RegExp(this.props.regExp);
    const inputLenght = this.input.value.trim().length;

    this.setState({
      isValid: !this.props.regExp ? inputLenght > 0 : regExp.test(this.input.value),
      displayError: inputLenght > 0 ? this.props.errorMsg : "This field can't be blank",
    });
  }

  render() {
    return (
      <div className={`field-wrapper ${this.props.multiLine ? 'is-multiline' : ''}`}>
        <input
          id={this.props.id}
          ref={(i) => { this.input = i; }}
          className={`text-field ${!this.state.isValid ? 'invalid' : ''}`}
          type="text" onBlur={this.validField}
          required
        />
        <label htmlFor={this.props.id} className="floating-label">{ this.props.label }</label>
        <div className="focus-bar" />
        <div className={`validation-error ${!this.state.isValid ? 'invalid' : ''}`}>Error: { this.state.displayError }</div>
      </div>
    );
  }
}

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  regExp: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  errorMsg: PropTypes.string.isRequired,
  multiLine: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default TextField;
