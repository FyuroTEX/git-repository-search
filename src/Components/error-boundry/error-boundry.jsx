import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hasError } from '../../redux/actions/loading';
import ErrorIndicator from '../error-indicator';

class ErrorBoundry extends Component {
  componentDidCatch() {
    this.props.changeError(true);
    };

  render() {
    return this.props.hasError ? <ErrorIndicator /> : this.props.children;
  }
};

const mapStateToProps = (state) => {
  return { hasError: state.utils.error };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeError: (state) => dispatch(hasError(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundry);
