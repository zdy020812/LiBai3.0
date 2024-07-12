import mainCity from '@/assets/json/Locus/去重地点李白.json'
import Chronology from '@/assets/json/Locus/李白年谱(跑图).json'
import data3 from '@/assets/json/Locus/李白路径数据(次版).json'

export default{
  getMap:config => {
    return{
      mainCity:mainCity,
      Chronology:Chronology,
      data3:data3
    }
},

}