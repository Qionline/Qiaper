import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { Button, message, Switch } from 'antd';
import { CloseOutlined, EditOutlined, CopyOutlined } from '@ant-design/icons';

import { stores } from "@/stores"
import ChromeMethods from '@/utils/chrome_methods';
import genApiTemp from '@/custom/genApiTemp';

const PanelHeader = ({ requestItem, idx, refreshList }) => {
  const navigate = useNavigate()

  const [switchLoading, setSwitchLoading] = useState(false)
  const [mockState, setmMockState] = useState(!!requestItem.mock)

  // delete mock item
  const toDeleteRequestItem = () => {
    ChromeMethods.ChromeGetMockRequestList(list => {
      list.splice(idx, 1)
      ChromeMethods.ChromeSetMockRequestList(JSON.stringify(list), () => {
        refreshList()
      })
    })
  }
  // edit mock item
  const toEditRequestItem = () => {
    ChromeMethods.ChromeSetLocalStorge('reqFormData', JSON.stringify(requestItem), () => {
      navigate('/createRequest')
      stores.stateStore.handleSetEditIdx(idx)
    })
  }

  // copy mock item
  const toCopyRequestItem = () => {
    const input = document.createElement('textarea');
    input.value = genApiTemp(requestItem);
    document.body.appendChild(input);
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
      message.success("已复制到剪切板");
    }
    document.body.removeChild(input);
  }

  // switch mock
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
        {requestItem.comment ? requestItem.comment : requestItem.url}
      </div>
      <div className="panel-header-right" onClick={e => e.stopPropagation()}>
        <Switch style={{ marginRight: "3px" }} size="small" loading={switchLoading} checked={mockState} onClick={switchMockState} />
        <Button style={{ marginRight: "3px" }} icon={<EditOutlined />} size="small" onClick={toEditRequestItem} />
        <Button style={{ marginRight: "3px" }} icon={<CopyOutlined />} size="small" onClick={toCopyRequestItem} />
        <Button icon={<CloseOutlined />} size="small" onClick={toDeleteRequestItem} />
      </div>
    </div>
  )
}

export default observer(PanelHeader)
