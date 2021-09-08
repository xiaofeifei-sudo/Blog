import { Avatar, Divider, Tooltip } from "antd";

import ReactDynamicImport from "react-dynamic-import";

const loader = () => import("react-zmage");
// const Zmage = dynamic(
//     import("react-zmage"),
//     {ssr:false}
// )
const Zmage = ReactDynamicImport({ loader });
import "../static/styles/components/Author.module.css";
import Iconfont from "../config/icon/alibaba";

const Author = () => {
  return (
    <div className="author-div">
      <div>
        <Avatar
          className="mylight"
          size={100}
          src="../static/images/author.jpg"
        />
      </div>

      <div className="myname">NingBlog</div>
      <div className="author-introduction" style={{ color: "rgb(0,216,255)" }}>
        软件技术
      </div>
      <div
        className="author-introduction myname1"
        style={{ color: "rgb(0,216,255)" }}
      >
        2019-2022级学生
      </div>
      <div className="author-introduction position">
        <Iconfont type="icon-dingwei" /> 广东-广州
        <br />
        前端: Next.js + AntDesign
        <br />
        后端: Node + MySql
        <br />
        <Iconfont type="icon-shuangsechangyongtubiao-" /> 1700805832@qq.com
        <br />
        <div className="author-introduction"></div>
        <Divider>社交账号</Divider>
        <Tooltip placement="top" title="Github">
          <a
            href="https://github.com/xiaofeifei-sudo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Avatar
              size="large"
              icon={<Iconfont type="icon-github"></Iconfont>}
              className="account"
            />
          </a>
        </Tooltip>
        <Tooltip placement="top" title="Gitee">
          <a
            href="https://gitee.com/wu-zhining"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Avatar
              size="large"
              icon={<Iconfont type="icon-gitee2"></Iconfont>}
              className="account"
            />
          </a>
        </Tooltip>
        <Tooltip
          placement="top"
          title={
            // <img src="../static/images/wechat.jpg"/>
            <div>
              <Zmage
                width="100px"
                zIndex="99999"
                src="../static/images/wechat.jpg"
              />
              <span
                style={{
                  display: "block",
                  textAlign: "center",
                  fontWeight: "both",
                }}
              >
                VK93237943
              </span>
            </div>
          }
        >
          <Avatar
            size="large"
            icon={<Iconfont type="icon-wechat"></Iconfont>}
            className="account"
          />
        </Tooltip>
        <Tooltip
          placement="top"
          title={
            // <img src="../static/images/wechat.jpg"/>
            <div>
              <Zmage
                width="100px"
                zIndex="99999"
                src="../static/images/qq.jpg"
              />
              <span
                style={{
                  display: "block",
                  textAlign: "center",
                  fontWeight: "both",
                }}
              >
                QQ:1700805832
              </span>
            </div>
          }
        >
          <Avatar
            size="large"
            icon={<Iconfont type="icon-QQ"></Iconfont>}
            className="account"
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default Author;
