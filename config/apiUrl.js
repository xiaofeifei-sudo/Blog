let baseUrl = "http://127.0.0.1:7001/default/"

let servicePath = {
    getArticleList:`${baseUrl}getArticleList`,// 首页文章接口
    getArticleById:`${baseUrl}getArticleById/`,//文章详情页内容接口,需要接收参数
    getTypeInfo:`${baseUrl}getTypeInfo`,//文章类型接口
    getListById:`${baseUrl}getListById/`,//文章列表
    getTypeById:`${baseUrl}getTypeById/`,//获取类型详情
}
export default servicePath
