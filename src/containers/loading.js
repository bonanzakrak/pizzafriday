import React from 'react'

const Loading = ({text}) => {

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <div className="panel-title pull-left">{text}</div>
        <div className="clearfix"></div>
      </div>
      <div className="panel-body text-center">
        <img src="/images/hourglass.svg"/>
      </div>
    </div>
  )
}

export default Loading