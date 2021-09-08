import React, { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import { Button, Row, Col, List, Breadcrumb } from "antd";

import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";

import "../static/styles/pages/list.css";

import axios from "axios";

import servicePath from "../config/apiUrl";

import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

import Iconfont from "../config/icon/alibaba";

const ArticleList = (initData) => {
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  const [mylist, setMylist] = useState(initData.listData);
  const [mytype,setMytype] = useState(initData.typeData);

  useEffect(() => {
    setMylist(initData.listData)
    setMytype(initData.typeData)
  },[initData]);

  return (
    <Fragment>
      <Head>
        <title>Home</title>
      </Head>

      <Header></Header>

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item>学习记录</Breadcrumb.Item>
                <Breadcrumb.Item>{mytype.typeName}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <List
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={(item) => (
                <List.Item className="cssnicehover">
                  <div className="list-title">
                    <Link
                      href={{ pathname: "/detailed", query: { id: item.id } }}
                    >
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span>
                      <Iconfont type="icon-rili" />
                      {item.addTime}
                    </span>
                    <span>
                      <Iconfont type="icon-shujufenxi"/> {item.typeName}
                    </span>
                    <span>
                      <Iconfont type="icon-huo" /> {item.view_count}人
                    </span>
                  </div>
                  <div
                    className="list-context"
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                  ></div>
                </List.Item>
              )}
            />
          </div>
        </Col>

        <Col className="comm-box" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author></Author>

          <Advert></Advert>
        </Col>
      </Row>

      <Footer></Footer>
    </Fragment>
  );
};

ArticleList.getInitialProps = async (context) => {
  let id = context.query.id;
  const promise = new Promise((resolve) => {
    axios.all([
        axios.get(servicePath.getListById + id).then(res=>res.data),
        axios.get(servicePath.getTypeById + id).then(res=>res.data)
    ]).then(
        axios.spread((data1,data2)=>{
            let initData = {listData:data1.data,typeData:data2.data}
            resolve(initData)
        })
    )
  });
  return await promise;
};

export default ArticleList;
