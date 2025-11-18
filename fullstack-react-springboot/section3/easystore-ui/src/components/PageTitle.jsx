import React from 'react'

export default function PageTitle(props) {  /// instead of props, we could only pass {title}
  return (
    <h1 className='page-title'>{props.title}</h1> /// then we could access title here without writing {props.title}, but just {title}
  )
}

