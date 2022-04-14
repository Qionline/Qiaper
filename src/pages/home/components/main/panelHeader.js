import React from "react"
import { observer } from "mobx-react-lite"
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import ChromeMethods from '@/utils/chrome_methods';

const PanelHeader = ({ requestItem, idx, refreshList }) => {

  const toDeleteRequestItem = (e) => {
    e.stopPropagation();

    ChromeMethods.ChromeGetMockRequestList(list => {
      list.splice(idx, 1)
      ChromeMethods.ChromeSetMockRequestList(JSON.stringify(list), () => {
        refreshList()
      })
    })
  }

  return (
    <div>
      {requestItem.url}
      <Button shape="circle" icon={<CloseOutlined />} onClick={toDeleteRequestItem} />
    </div>
  )
}

export default observer(PanelHeader)
