import React from 'react';
import { connect } from 'react-redux';

import Home from 'containers/Home';
import AboutMe from 'containers/AboutMe';
import Works from 'containers/Works';
import Contact from 'containers/Contact';
import * as sectionActions from 'actions/spaceScroll';
import SpaceScroll from 'utils/SpaceScroll';

// import d from 'utils/';

class SpaceScrollWrapper extends React.Component {
  componentDidMount() {
    SpaceScroll.initialize(this.bgWrapper);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scrollToSection !== false) SpaceScroll.scrollToSection(nextProps.scrollToSection);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="page-container">
        <div className="background" ref={(c) => { this.bgWrapper = c; }} />
        <Home />
        <AboutMe />
        <Works />
        <Contact />
      </div>
    );
  }
}

SpaceScrollWrapper.propTypes = {
  setActiveSection: React.PropTypes.func.isRequired,
  resetScrollToSection: React.PropTypes.func.isRequired,
  scrollToSection: React.PropTypes.oneOfType([ // eslint-disable-line
    React.PropTypes.number.isRequired,
    React.PropTypes.bool.isRequired,
  ]),
};

const mapStateToProps = state => ({
  scrollToSection: state.spaceScroll.scrollToSection,
});

const mapDispatchToProps = dispatch => ({
  setActiveSection: sectionId => dispatch(sectionActions.setAciveSection(sectionId)),
  resetScrollToSection: () => dispatch(sectionActions.scrollToSection(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpaceScrollWrapper);
