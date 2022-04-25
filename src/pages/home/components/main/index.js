import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { Collapse, Button } from 'antd';

import { BASE_REQUEST_FORM } from '@/utils/constant';
import ChromeMethods from '@/utils/chrome_methods';
import PanelHeader from './panelHeader';
import PanelBody from './panelBody';
import "./index.less"

const Main = () => {
  const navigate = useNavigate()
  // 接口列表
  const [requestList, setRequestList] = useState([])

  const toCreateRequestForm = () => {
    ChromeMethods.ChromeSetLocalStorge('reqFormData', JSON.stringify(BASE_REQUEST_FORM), () => {
      ChromeMethods.ChromeSetLocalStorge('page', '/createRequest', () => {
        navigate('/createRequest')
      })
    })
  }

  // 刷新列表
  const refreshList = () => {
    ChromeMethods.ChromeGetMockRequestList(list => {
      setRequestList(list)
    })
  }

  useEffect(() => {
    refreshList()
  }, [])

  return (
    <div className="main-cls">
      <div className="main-cls-container">
        <Collapse accordion>
          {
            requestList.map((item, idx) => (
              <Collapse.Panel header={<PanelHeader idx={idx} requestItem={item} refreshList={refreshList} />} key={idx} showArrow={false}>
                <PanelBody idx={idx} requestItem={item} refreshList={refreshList} />
              </Collapse.Panel>
            ))
          }
        </Collapse>
      </div>
      <footer className="footer">
        <Button size="small" style={{ flex: 1 }} type="primary" onClick={toCreateRequestForm}>创建请求</Button>
        <Button size="small">抓取请求</Button>
      </footer>
    </div>
  )
}

export default observer(Main)
