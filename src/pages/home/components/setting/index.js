import React, { useState, useEffect } from "react"
import { Switch } from "antd"
import { observer } from "mobx-react-lite"

import ChromeMethods from '@/utils/chrome_methods';
import GlobalSettingItem from './globalSettingItem';
import "./index.less"

const Setting = () => {
  const [gobalMockState, setGlobalMockState] = useState(false)

  // 全局mock切换
  const handleSwitchMock = (val) => {
    console.log(val);
    ChromeMethods.ChromeSetGlobalSetting('mock', val, () => {
      setGlobalMockState(val)
    })
  }
  useEffect(() => {
    ChromeMethods.ChromeGetAppGlobalSetting((res) => {
      setGlobalMockState(res.mock)
    })
  }, [])

  return (
    <div className="setting-cls">
      <GlobalSettingItem label="全局Mock: " form={<Switch size="small" onClick={handleSwitchMock} checked={gobalMockState} />} />
    </div>
  )
}

export default observer(Setting)
