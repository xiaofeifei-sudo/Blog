import React, { useState, useEffect, Fragment } from "react";
import Router from "next/router";

import Link from "next/link";

import axios from "axios";

// 导入apiUrl
import servicePath from "../config/apiUrl";

// 导入头部css样式
import "../static/styles/components/Header.module.css";

// 导入antd的组件
import { Row, Col, Menu, Affix, Drawer, message, Modal, Tooltip } from "antd";

// 导入图标库
import {
  HomeOutlined,
  FileAddOutlined,
  CameraOutlined,
  CoffeeOutlined,
  WechatOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";

// 解构confirm,submenu
const { confirm } = Modal;

const { SubMenu } = Menu;

// 导入symbol图标
import Iconfont from "../config/icon/alibaba.js";

//使用antd进行页面编辑
//xs<576px sm≥576px md≥768px lg≥992px xl≥1200px xxl≥1600px
//antd是24栅格化布局 给它24意味着占满

const Header = () => {
  const [navArr, setNavArr] = useState([]); //导航菜单数组
  const [deftheme, setDefTheme] = useState(true); //默认主题
  const [isOpen, setIsOpen] = useState(false); //折叠菜单
  const [musicPlay, setMusicPlay] = useState(false); //音乐播放

  useEffect(() => {
    // 异步获取数据
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then((res) => {
        setNavArr(res.data.data);
        return res.data.data;
      });
      setNavArr(result);
    };
    fetchData();

    // 渲染旋律条
    renderMusic();

    // 滚动条监听导航滑动和消失
    let scrollHeight = 0;
    window.onscroll = function () {
      //变量t是滚动条滚动时，距离顶部的距离
      let t = document.documentElement.scrollTop || document.body.scrollTop;
      let header = document.getElementById("scrolldisplay");

      // 防止抖动
      if (t >= 200) {
        if (t - header < 0) {
          header.style.marginTop = "0";
          scrollHeight = t;
        } else {
          header.style.marginTop = "-3.8rem";
          scrollHeight = t;
        }
      } else {
        // 恢复正常
        header.style.marginTop = "0";
        scrollHeight = t;
      }
    };
  }, []);

  //跳转到列表页
  const handleClick = (e) => {
    if (e.key == "homePage") {
      // 当前页为主页
      Router.push("/");
    } else if(e.key == "record"){
      Router.push("/list?id=" + e.key);
    } else{
      Router.push("/list?id=" + e.key);
    }
  };

  //音乐控制
  const playMusic = () => {
    let audio = document.getElementById("bg_music");
    if (musicPlay) {
      setMusicPlay(false);
      audio.pause();
    } else {
      setMusicPlay(true);
      audio.play();
    }
  };

  return (
    <div
      className="header"
      id="scrolldisplay"
      style={deftheme ? { backgroundColor: "rgba(138,43,226,.5)" } : null}
    >
      <Row type="flex" justify="center">
        <Col md={9} lg={15} xl={musicPlay ? 5 : 10}>
          <audio src="assets/旧人叹(圈9).mp3" id="bg_music" loop></audio>

          <div style={musicPlay ? { display: "block" } : { display: "none" }}>
            <Tooltip title="背景音乐控制" placement="bottom" color="#6a11cb">
              <canvas
                className="musicCanvas"
                onClick={() => {
                  playMusic();
                }}
              ></canvas>
            </Tooltip>
          </div>

          <div style={musicPlay ? { display: "none" } : null}>
            <Tooltip
              title="背景音乐控制:(PS:显示音乐旋律条)"
              onClick={() => {
                playMusic();
              }}
              placement="bottom"
              color="#6a11cb"
            >
              <span className="header-logo">NingBlog</span>
              <span className="header-txt">热爱前端开发,每天GET一个新知识</span>
            </Tooltip>
          </div>
        </Col>

        

        <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={8}>
          <Menu
            mode="horizontal"
            onClick={handleClick}
            selectable={false}
            overflowedIndicator={
              isOpen ? (
                <CaretUpOutlined theme="filled" />
              ) : (
                <CaretDownOutlined theme="filled" />
              )
            }
            theme={deftheme ? "light" : "dark"}
            style={
              deftheme
                ? { backgroundColor: "rgba(241, 131, 181,0)" }
                : { backgroundColor: "rgba(40,54,70,0)" }
            }
            onOpenChange={() => {
              setIsOpen(!isOpen);
            }}
          >
            <Menu.Item key="homePage" icon={<HomeOutlined />}>
              首页
            </Menu.Item>

            <SubMenu key="record" title="学习记录" icon={<FileAddOutlined />}>
              {navArr.map((item, index) => {
                return <Menu.Item key={item.id}>{item.typeName}</Menu.Item>;
              })}
            </SubMenu>

            <Menu.Item key="live" icon={<CoffeeOutlined />}>
              生活
            </Menu.Item>

            <Menu.Item key="photography" icon={<CameraOutlined />}>
              摄影
            </Menu.Item>
            <Menu.Item key="charHome" icon={<WechatOutlined />}>
              聊天室
            </Menu.Item>
          </Menu>
        </Col>

        <Col
          xl={musicPlay ? 5 : 0}
          xs={0}
          lg={0}
          sm={0}
          style={{ position: "relative" }}
        >
          <canvas
            className="musicCanvas"
            onClick={() => {
              playMusic();
            }}
            style={
              musicPlay
                ? { display: "block", float: "right" }
                : { display: "none" }
            }
          ></canvas>
        </Col>
      </Row>

      
    </div>
  );
};
export default Header;
