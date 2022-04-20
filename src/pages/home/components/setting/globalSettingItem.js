import React from 'react';

import { observer } from "mobx-react-lite"

import "./index.less"

const GlobalSettingItem = ({ label, form }) => {

    return (
        <div>
            <span>{label}</span>
            {form}
        </div>
    )
}

export default observer(GlobalSettingItem)
