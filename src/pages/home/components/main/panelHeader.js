import React from "react"
import { observer } from "mobx-react-lite"
import { Button, Switch } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

import ChromeMethods from '@/utils/chrome_methods';

const PanelHeader = ({ requestItem, idx, refreshList }) => {

  const toDeleteRequestItem = () => {
    ChromeMethods.ChromeGetMockRequestList(list => {
      list.splice(idx, 1)
      ChromeMethods.ChromeSetMockRequestList(JSON.stringify(list), () => {
        refreshList()
      })
    })
  }

  return (
    <div className="panel-header">
      <div className="panel-header-left">
        {requestItem.url}
      </div>
      <div className="panel-header-right" onClick={e => e.stopPropagation()}>
        <Switch style={{ marginRight: "3px" }} size="small" />
        <Button style={{ marginRight: "3px" }} icon={<EditOutlined />} onClick={toDeleteRequestItem} size="small" />
        <Button icon={<CloseOutlined />} onClick={toDeleteRequestItem} size="small" />
      </div>
    </div>
  )
}

export default observer(PanelHeader)
