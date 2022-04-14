import React from "react"
import { observer } from "mobx-react-lite"

const PanelBody = ({ requestItem }) => {

  return (
    <div>{requestItem.url}</div>
  )
}

export default observer(PanelBody)
