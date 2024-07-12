import mock from "mockjs";
import user from './user'

//定义mock请求拦截
// mock.mock('/api/home/getData',user.getStatisticalData)


//用户列表的数据
mock.mock('/api/user/map','get',user.getMap)