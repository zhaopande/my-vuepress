const createItemObj = {
    /**
     * 生成侧边栏导航路由结构
     * @param {*} title 
     * @param {*} children 
     * @param {*} collapsable 
     * @param {*} sidebarDepth 
     */
    getSidebar: function (title, children = [''], collapsable = true, sidebarDepth = 2) {
        var arr = new Array();
        arr.push({
            title,
            collapsable,
            sidebarDepth,
            children
        })
        return arr;
    }
};

module.exports = createItemObj;