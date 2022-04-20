import React from "react"
import { observer } from "mobx-react-lite"

const PanelBody = ({ requestItem }) => {

  return (
    <div className="panel-body">
      <div className="panel-body-url">
        <b>{requestItem.method}</b>
        <span>{requestItem.url}</span>
      </div>
    </div>
  )
}

export default observer(PanelBody)
