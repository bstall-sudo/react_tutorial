import React from 'react'

export default function PageTitle(props) {  /// instead of props, we could only pass {title}
  return (
    <h1 className="text-3xl font-primary font-extrabold text-center text-primary mt-4 py-2">{props.title}</h1> /// then we could access title here without writing {props.title}, but just {title}
  )
}

