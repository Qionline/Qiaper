import React, { useState } from "react"
import { useNavigate  } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { useAsyncEffect } from "use-async-effect"
import { Menu } from "antd"
import { RadarChartOutlined, SettingOutlined } from '@ant-design/icons';

import ChromeMethods from "@/utils/chrome_methods"

import Main from './components/main';
import Setting from './components/setting';
import "./index.less"

const Home = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState("main") // 当前tab

  useAsyncEffect(async () => {
    ChromeMethods.ChromeGetPageIdx(path => {
      if (path !== '/') {
        navigate(path)
      }
    })
    ChromeMethods.ChromeGetTabIdx(tab => {
      setCurrent(tab)
    })
  }, [])

  // 顶部切换
  const handleCurrent = ({ key }) => {
    if (key === current) return
    setCurrent(key)
    ChromeMethods.ChromeSetLocalStorge('tab', key, function () {
      setCurrent(key)
    })
  }

  return (
    <div className="page-container main-container">
      <Menu className="menu-cls" onClick={handleCurrent} selectedKeys={[current]} mode="horizontal">
        <Menu.Item className="menu-cls-item" key="main" icon={<RadarChartOutlined />} ></Menu.Item>
        <Menu.Item className="menu-cls-item" key="setting" icon={<SettingOutlined />} ></Menu.Item>
      </Menu>

      <div className="content">
        {current === "main" && (<Main />)}
        {current === "setting" && (<Setting />)}
      </div>
    </div>
  )
}

export default observer(Home)
