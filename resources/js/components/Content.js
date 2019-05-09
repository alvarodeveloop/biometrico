import React, { Component } from 'react';
import PropTypes from 'prop-types'

const Content = ({body}) => {

    return (
      <div className="container">
        { body }
      </div>
    );

}

Content.propTypes = {
  body: PropTypes.object.isRequired
}


export default Content
