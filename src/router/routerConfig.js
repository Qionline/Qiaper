import Home from "@/pages/home"
import CreateRequest from '@/pages/createRequest';

const routerConfig = [
  {
    component: Home,
    path: "/",
    exact: true,
  },
  {
    component: CreateRequest,
    path: "/createRequest",
  },
]

export default routerConfig
