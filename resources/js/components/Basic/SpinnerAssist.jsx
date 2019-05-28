import React from 'react';
import { css } from '@emotion/core';
import { DotLoader } from 'react-spinners';

import PropTypes from 'prop-types'

const SpinnerAssist = ({loading,size,color}) => {

  return (
    <div className='sweet-loading'>
      <DotLoader
        sizeUnit={"px"}
        size={150}
        color={'#0CE4E0'}
        loading={loading}
      />
    <br/>
    <p className="">Cargando Librerias y los Trabajadores...</p>
    </div>
  )

}

SpinnerAssist.propTypes = {
    loading: PropTypes.bool.isRequired,
    size: PropTypes.string,
    color: PropTypes.string,
}

export default SpinnerAssist
