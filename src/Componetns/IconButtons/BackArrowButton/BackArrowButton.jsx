import React from 'react';
import ArrowLeftSvg from '../../../Svg/ArrowLeftSvg';


function BackArrowButton({click, text, color, w, h}) {   
  return (
      <div className='d-flex flex-row flex-nowrap align-content-center'>
        <div className='d-flex' onClick={click}>
          <ArrowLeftSvg w={w} h={h} color={color}/>
          <span className='d-flex mx-2'>{text || "Назад"}</span>
        </div>
      </div>
  );
}


export default BackArrowButton;
