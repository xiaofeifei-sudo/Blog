import React, { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import {
  Button,
  Row,
  Col,
  List,
  icon,
  Icon,
  BackTop,
  Tooltip,
  Spin,
} from "antd";

import "../static/styles/pages/index.css";

import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";

import axios from "axios";
import servicePath from "../config/apiUrl";

import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

// 导入阿里巴巴图标库
import Iconfont from "../config/icon/alibaba.js";

const Home = (props) => {
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,//启动类似Github样式的Markdown,填写true或者false
    pedantic: false,//只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
    tables: true,//支持Github形式的表格，必须打开gfm选项
    breaks: true,//支持Github换行符，必须打开gfm选项，填写true或者false
    smartLists: true,//优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
    smartypants: false,
    sanitize: false,//原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  const [mylist, setMylist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 异步获取数据
    const getList = async () => {
      const result = await axios(servicePath.getArticleList).then(
        (resolve, reject) => {
          setIsLoading(false);
          return resolve.data.data;
        }
      );
      setMylist(result);
    };
    getList();
  }, []);

  return (
    <Fragment>
      <Head>
        <title>首页 | NingBlog个人博客</title>
      </Head>

      {/* 返回顶部 */}
      <BackTop>
        <div className="ant-back-top-inner">
          <Iconfont type="icon-huojian" spin></Iconfont>
        </div>
      </BackTop>

      <Header></Header>

      <Row
        className="comm-main"
        type="flex"
        justify="center"
      >
        <Col
          className="comm-left"
          xs={24}
          sm={24}
          md={16}
          lg={18}
          xl={14}
        >
          <Spin tip="加载中" spinning={isLoading}>
            <div>
              <List
                header={
                  <div
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#A020F0",
                      paddingLeft: "0.5rem",
                      fontFamily: "YouYuan",
                    }}
                  >
                    最新日志<span style={{ color: "#00FF00" }}> 32 </span>篇
                  </div>
                }
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={(item,index) => (
                  <List.Item key={index} className="cssnicehover">
                    <div className="list-title">
                      <Link
                        href={{ pathname: "/detailed", query: { id: item.id } }}
                      >
                        <a>{item.title}</a>
                      </Link>
                    </div>
                    <div className="list-icon">
                      <span>
                        <Iconfont type="icon-rili"></Iconfont>
                        {item.addTime}
                      </span>
                      <span>
                        <Iconfont type="icon-shujufenxi"></Iconfont>
                        {item.typeName}
                      </span>
                      <span>
                        <Iconfont type="icon-huo"></Iconfont>
                        {item.view_count}人
                      </span>
                    </div>
                    <div
                      className="list-context"
                      dangerouslySetInnerHTML={{
                        __html: marked(item.introduce),
                      }}
                    ></div>
                  </List.Item>
                )}
              />
            </div>
          </Spin>
        </Col>

        <Col
          className="comm-box"
          xs={0}
          sm={0}
          md={7}
          lg={5}
          xl={4}
        >
          <Author></Author>
          <Advert></Advert>
        </Col>
      </Row>

      <Footer></Footer>
    </Fragment>
  );
};

// 服务端获取初始化数据
// Home.getInitialProps = () => {
//   const promise = new Promise((resolve) => {
//     axios(servicePath.getArticleList).then((res) => {
//       resolve(res.data);
//     });
//   });

//   return null;
// };

export default Home;
