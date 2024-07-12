import { createStore } from 'vuex';
import mutations from './mutations';
import actions from './actions';
import data from '@/assets/json/古诗译文.json';
import total from '@/assets/json/总数据.json'
export default createStore({
    state: {
        data,
        total,
        display:true,
        currentRouter: 1,
        title: "《将进酒》",
        time: 715,
        year:"武则天长安元年",
        timeline: 715,
        place: "河南省郑州市登封市嵩山",
        经纬度: [
            112.94882812622069,
            34.48320011099861
        ],
        isMessageDisplay: false,
        province: "全国",
        currentProgress: 0,
        things:"李白正值少年,已有诗赋多首,并得到一些社会名流的推崇",
        isPause: true,
        isclose: false,
        kilometer: 0
    },
    computed: {},
    mutations,
    actions,
    getters: {
        //place
        search(state)
        {
            return total.filter((item)=>item[0]===state.title)
        },
        //段落
        paragraphs(state) {
            return data[state.title]["paragraphs"]
        },
        //赏析
        appreciation(state) {
            return data[state.title]["appreciation"]
        },
        //背景
        ackground(state) {
            return data[state.title]["background"]
        },
        //单纯翻译
        mergedArray1(state) {
            let translation = data[state.title]["translation"]
            let paragraphs = data[state.title]["paragraphs"]
            return paragraphs.reduce((acc, val, index) => {
                acc.push(val);
                acc.push(translation[index]);
                return acc;
            }, []);
        },
        //单纯注释
        mergedArray2(state) {
            let paragraphs = data[state.title]["paragraphs"]
            let annotate = data[state.title]["annotate"]
            return paragraphs.reduce((acc, val, index) => {
                acc.push(val);
                acc.push(annotate[index]);
                return acc;
            }, []);
        },
        //注释和翻译都有
        mergedArray3(state) {
            let paragraphs = data[state.title]["paragraphs"]
            let translation = data[state.title]["translation"]
            let annotate = data[state.title]["annotate"]
            return paragraphs.reduce((acc, val, index) => {
                acc.push(val);
                acc.push(translation[index]);
                acc.push(annotate[index]);
                return acc;
            }, []);
        }
    }
});