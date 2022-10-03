import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, PageHeader, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { messages } from "../../translations/messages";
import { setLocale } from "../../helpers/localization/index";

export default function PersistentDrawerLeft(props) {
  let navigate = useNavigate();
  const intl = useIntl();

  const [collapsed, setCollapsed] = useState(false);
  const { Content, Sider } = Layout;

  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: intl.formatMessage(messages.TASKS),
      children: [
        {
          key: "1.1",
          label: intl.formatMessage(messages.TASKS),
          onClick: () => navigate("/tasks"),
        },
      ],
    },
  ];

  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              alignContent: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Avatar style={{ marginTop: 8, marginBottom: 8 }} size={75}>
              Birtan Dinçer
            </Avatar>
          </div>
          <Menu
            theme="dark"
            mode="vertical"
            items={items}
            style={{ marginTop: 5 }}
          />
        </Sider>
        <Layout className="site-layout">
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <PageHeader
              className="site-page-header"
              extra={[
                localStorage.getItem("lang"),
                <Switch  onChange={() => setLocale()} />,
              ]}
            />
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              {props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
