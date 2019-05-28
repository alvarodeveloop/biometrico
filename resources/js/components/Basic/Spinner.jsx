import React from 'react';
import { css } from '@emotion/core';
// First way to import
import { DotLoader } from 'react-spinners';

import PropTypes from 'prop-types'

const Spinner = ({loading,size,color}) => {

  return (
    <div className='sweet-loading'>
      <DotLoader
        sizeUnit={"px"}
        size={150}
        color={'#0CE4E0'}
        loading={loading}
      />
    <br/>
    <p className="">Cargando...</p>
    </div>
  )

}

Spinner.propTypes = {
    loading: PropTypes.bool.isRequired,
    size: PropTypes.string,
    color: PropTypes.string,
}

export default Spinner
