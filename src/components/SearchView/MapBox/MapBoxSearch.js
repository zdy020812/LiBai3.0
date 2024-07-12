import mapboxgl from 'mapbox-gl';
import store from '../../../store/index.js';
mapboxgl.accessToken = 'pk.eyJ1Ijoid3p5YW5ndXN0IiwiYSI6ImNsZ21iemNrdzAzN2gzaHM5ZnIxcmZzOWoifQ.gFp9hXXjG9vBdd2K-Wv2fw';

const start = {
    center: [118.824, 31.976], // 初始显示坐标 [经度, 维度]
    zoom: 10, // 放大倍数
    antialias: true, // 是否抗锯齿, 默认False
    pitch: 60, // 设置倾斜程度
    bearing: 0, //设置地图朝向,0为朝北,90为西,180为南,270为东
    style: 'mapbox://styles/wzyangust/clg0pedu5000k01qoqmoovo90',
};
export const text2 = () => {
    // 调用mapbox地图,命名为map
    const map = new mapboxgl.Map({
        container: 'map', // 容器名字为map
        ...start
    });
    map.on('load', async() => {
        `addControl(组件对象: obj, 位置: str)`
        // 向地图添加缩放和旋转控件, 默认为右上角
        map.addControl(new mapboxgl.NavigationControl());
        // 向地图添加比例尺, 默认左下角
        map.addControl(new mapboxgl.ScaleControl({ maxWidth: 75, unit: 'metric' }));
        // 向地图添加全屏按钮,默认右上角
        map.addControl(new mapboxgl.FullscreenControl());
        map.setFog({
            'color': 'rgb(220, 159, 159)', // Pink fog / lower atmosphere
            'high-color': 'rgb(36, 92, 223)', // Blue sky / upper atmosphere
            'horizon-blend': 0.4 // Exaggerate atmosphere (default is .1)
        });
        map.setTerrain({
            'source': 'mapbox-dem',
            'exaggeration': 1.5
        });

        var marker = new mapboxgl.Marker({ color: '#008000', });
        var point = []
        if (document.getElementById("my_search_icon")) {
            my_search_icon.onclick = function() {
                marker = new mapboxgl.Marker({ color: '#008000' });
                // 添加标记
                point = store.state.经纬度;
                if (point.length != 0) {
                    marker.setLngLat(point).addTo(map); // 将标记添加到地图的结果坐标处
                    marker.setPopup(new mapboxgl.Popup({ closeOnClick: false, offset: [0, -15] }).setHTML("<div>" + store.state.place + "</div>"));
                    map.flyTo({
                        center: point,
                        speed: 1,
                        curve: 1,
                        zoom: 10,
                        pitch: 60,
                    });
                }
            }
        }
        if (document.getElementById("delete_icon")) {
            delete_icon.onclick = function() {
                if (point.length != 0) {
                    marker.remove();
                }
            }
        }
    });
}