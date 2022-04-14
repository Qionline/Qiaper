import React from "react"
import { Button } from "antd"
import { observer } from "mobx-react-lite"
import QueueAnim from "rc-queue-anim"

import "./index.less"

const Setting = () => {

  return (
    <div className="setting-cls">
      <div className="setting-p">
        <QueueAnim className="setting-btn" type="bottom">
          <div key="btn">
            <Button block type="primary">
              setting
                        </Button>
          </div>
        </QueueAnim>
      </div>
    </div>
  )
}

export default observer(Setting)
