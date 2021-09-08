import App from "next/app";
import Head from "next/head";

// 全局引入antdesight.css
import "antd/dist/antd.less";

import "../styles/comm.css";
import Title from "antd/lib/skeleton/Title";

class MyApp extends App {
  static async getInitialProps({Component,ctx}) {
    let pageProps;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps,
    };
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <Head>
          <title>NingBlog个人博客</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* 请求不会带上referrer信息，对方服务器也就无法拦截 */}
          <meta name="referrer" content="no-referrer" />
          <meta name="description" content="NingBlog个人博客网站" />
          <link
            rel="stylesheet"
            href="http://at.alicdn.com/t/font_1823201_slkzuxy9rl.css"
          />
          <link rel="stylesheet" type="text/css" href="assets/waifu.css" />
          <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
          <script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>

          <script>window.cheng = returnCitySN;</script>

          <script src="assets/utils.js"></script>

          
        </Head>
        <canvas id="anomalyBg"></canvas>
        <Component {...pageProps}></Component>
        <div className="waifu">
          <div className="waifu-tips"></div>
          <canvas
            id="live2d"
            width="280"
            height="250"
            className="live2d"
          ></canvas>
          <div className="waifu-tool">
            <span className="fui-eye"></span>
            <span className="fui-user"></span>
            <span className="fui-photo"></span>
            <span className="fui-cross"></span>
          </div>
        </div>
        <script src="assets/waifu-tips.js"></script>
        <script src="assets/live2d.js"></script>
        <script
          type="text/javascript"
          src="assets/background-canvas.js"
        ></script>
        　<div style={{ marginLeft: "500px" }}></div>
        <script
          type="text/javascript"
          src="assets/background-music2.js"
        ></script>
      </div>
    );
  }
}

export default MyApp;
