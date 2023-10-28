<template>
    <div id="container"></div>
</template>
<script>
import AMapLoader from "@amap/amap-jsapi-loader";

export default {
    name: "map-view",
    mounted() {
        this.initAMap();
    },
    unmounted() {
        this.map?.destroy();
    },
    methods: {
        initAMap() {
            AMapLoader.load({
                key: "4f766f1931a3affd1d2b29c16fdbab1a", // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            })
                .then((AMap) => {
                    this.map = new AMap.Map("container", {
                        // 设置地图容器id
                        viewMode: "3D", // 是否为3D地图模式
                        zoom: 11, // 初始化地图级别
                        center: [116.397428, 39.90923], // 初始化地图中心点位置
                    });
                    const marker = new AMap.Marker({
                        position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        title: '北京'
                    });
                    this.map.add(marker);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
};
</script>
<style scoped>
#container {
    width: 100%;
    height: 800px;
}
</style>
  