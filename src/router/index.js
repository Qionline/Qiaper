import React from "react"
import { HashRouter, Route, Routes } from "react-router-dom"

import routerConfig from "./routerConfig"

const handerRouters = (routers) => {
  return (
    <Routes>
      {routers.map((router) => {
        return (
          <Route exact={router.exact} key={router.path} path={router.path} element={<router.component />}>
            {router.routers && handerRouters(router.routers)}
          </Route>
        )
      })}
    </Routes>
  )
}

const BaseRouter = () => <HashRouter>{handerRouters(routerConfig)}</HashRouter>

export default BaseRouter
