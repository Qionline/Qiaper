import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { Button, Switch } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

import { stores } from "@/stores"
import ChromeMethods from '@/utils/chrome_methods';

const PanelHeader = ({ requestItem, idx, refreshList }) => {
  const navigate = useNavigate()

  const [switchLoading, setSwitchLoading] = useState(false)
  const [mockState, setmMockState] = useState(!!requestItem.mock)

  // 删除 mock item
  const toDeleteRequestItem = () => {
    ChromeMethods.ChromeGetMockRequestList(list => {
      list.splice(idx, 1)
      ChromeMethods.ChromeSetMockRequestList(JSON.stringify(list), () => {
        refreshList()
      })
    })
  }
  // 编辑 mock item
  const toEditRequestItem = () => {
    ChromeMethods.ChromeSetLocalStorge('reqFormData', JSON.stringify(requestItem), () => {
      navigate('/createRequest')
      console.log(idx);
      stores.stateStore.handleSetEditIdx(idx)
    })
  }

  // 开关mock
  const switchMockState = (val) => {
    setSwitchLoading(true)
    ChromeMethods.ChromeGetMockRequestList(list => {
      const data = [...list]
      data[idx].mock = val
      ChromeMethods.ChromeSetMockRequestList(JSON.stringify(data), () => {
        setmMockState(val)
        setSwitchLoading(false)
      })
    })
  }

  return (
    <div className="panel-header">
      <div className="panel-header-left">
        {requestItem.url}
      </div>
      <div className="panel-header-right" onClick={e => e.stopPropagation()}>
        <Switch style={{ marginRight: "3px" }} size="small" loading={switchLoading} checked={mockState} onClick={switchMockState} />
        <Button style={{ marginRight: "3px" }} icon={<EditOutlined />} size="small" onClick={toEditRequestItem} />
        <Button icon={<CloseOutlined />} size="small" onClick={toDeleteRequestItem} />
      </div>
    </div>
  )
}

export default observer(PanelHeader)
