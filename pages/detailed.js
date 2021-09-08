import React, { Fragment, useState } from "react";
import Head from "next/head";

import ReactMarkdown from "react-markdown";
import MarkNav from "markdown-navbar";

import "markdown-navbar/dist/navbar.css";

import { Button, Row, Col, List, icon, Icon, Breadcrumb, Affix ,BackTop} from "antd";

import axios from "axios";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import "../static/styles/pages/detailed.css";

import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

import Tocify from "../components/tocify.tsx";

import servicePath from "../config/apiUrl";

import Iconfont from "../config/icon/alibaba";

const Detailed = (details) => {
  const renderer = new marked.Renderer();

  const tocify = new Tocify();

  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  let html = marked(details.article_content);

  return (
    <Fragment>
      <Head>
        <title>详细页 | NingBlog个人博客</title>
      </Head>
      <Header />
      <BackTop>
        <div className="ant-back-top-inner">
          <Iconfont type="icon-huojian" spin></Iconfont>
        </div>
      </BackTop>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb
                separator={
                  <span>
                    <Iconfont type="icon-V"></Iconfont>
                  </span>
                }
              >
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{details.typeName}</Breadcrumb.Item>
                <Breadcrumb.Item>{details.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">{details.title}</div>

              <div className="list-icon center">
                <span>
                  <Iconfont type="icon-rili"></Iconfont>
                  {details.addTime}
                </span>
                <span>
                  <Iconfont type="icon-shujufenxi"></Iconfont>
                  {details.typeName}
                </span>
                <span>
                  <Iconfont type="icon-huo"></Iconfont> {details.view_count}人
                </span>
              </div>

              <div
                className="detailed-content"
                dangerouslySetInnerHTML={{ __html: html }}
              ></div>
            </div>
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />

          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {/*<MarkNav
                                className="article-menu"
                                source={html}
                                ordered={false}
                            />*/}
              <div className="toc-list">{tocify && tocify.render()}</div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </Fragment>
  );
};

Detailed.getInitialProps = async (context) => {
  console.log(context.query.id);
  let id = context.query.id;
  const promise = new Promise((resolve) => {
    axios(`${servicePath.getArticleById}${id}`).then((res) => {
      resolve(res.data.data[0]);
    });
  });
  return await promise;
};

export default Detailed;
