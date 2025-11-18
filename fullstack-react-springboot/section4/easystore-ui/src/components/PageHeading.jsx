import React from 'react'
import PageTitle from './PageTitle'

/*
Here PageHeading receives to props-objects, one containing the title and one containing the paragraph text.
the title is passed using "title = {props.title}", the text is passed using "{props.children}"
if the <p> tag had been included in the props, instead of using "<p className='page-heading-paragraph'>{props.children}</p>"
we would only write:
    <div className='page-heading-container'>
      <PageTitle title = {props.title}/>
      {props.children}
    </div>

using destructuring, we could use the {} to avoid having to write props.
 
function PageHeading({title, children}) {
  return (
    <div className='page-heading-container'>
      <PageTitle title = {title}/>
      <p className='page-heading-paragraph'>{children}</p>
    </div>
  );

*/
function PageHeading(props) {
  return (
    <div className='page-heading-container'>
      <PageTitle title = {props.title}/>
      <p className='page-heading-paragraph'>{props.children}</p>
    </div>
  );
}

 export default PageHeading

