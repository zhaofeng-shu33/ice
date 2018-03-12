/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import { Icon } from '@icedesign/base';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { Link } from 'react-router';
import FoundationSymbol from 'foundation-symbol';
import { enquire } from 'enquire-js';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import Logo from './../../components/Logo';
import { asideNavs } from './../../navs';
import './scss/light.scss';
import './scss/dark.scss';

const theme = typeof THEME === 'undefined' ? 'dark' : THEME;

export default class HeaderAsideFooterResponsiveLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    const openKeys = this.getOpenKeys();
    this.state = {
      collapse: false,
      openDrawer: false,
      isScreen: undefined,
      openKeys,
      theme,
    };
    this.openKeysCache = openKeys;
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const isMobile = 'screen and (max-width: 720px)';
    const isTablet = 'screen and (min-width: 721px) and (max-width: 1199px)';
    const isDesktop = 'screen and (min-width: 1200px)';

    enquire.register(isMobile, this.enquireScreenHandle('isMobile'));
    enquire.register(isTablet, this.enquireScreenHandle('isTablet'));
    enquire.register(isDesktop, this.enquireScreenHandle('isDesktop'));
  };

  enquireScreenHandle = (type) => {
    let collapse;
    if (type === 'isMobile') {
      collapse = false;
    } else if (type === 'isTablet') {
      collapse = true;
    } else {
      collapse = this.state.collapse;
    }

    const handler = {
      match: () => {
        this.setState({
          isScreen: type,
          collapse,
        });
      },
      unmatch: () => {
        // handler unmatched
      },
    };

    return handler;
  };

  toggleTheme = () => {
    this.setState({
      theme: this.state.theme === 'dark' ? 'light' : 'dark',
    });
  };

  toggleCollapse = () => {
    const { collapse } = this.state;
    const openKeys = !collapse ? [] : this.openKeysCache;

    this.setState({
      collapse: !collapse,
      openKeys,
    });
  };

  toggleMenu = () => {
    const { openDrawer } = this.state;
    this.setState({
      openDrawer: !openDrawer,
    });
  };

  onOpenChange = (openKeys) => {
    this.setState({
      openKeys,
    });
    this.openKeysCache = openKeys;
  };

  onMenuClick = () => {
    this.toggleMenu();
  };

  // 当前打开的菜单项
  getOpenKeys = () => {
    const { routes } = this.props;
    const matched = routes[0].path;
    let openKeys = [];

    asideNavs &&
      asideNavs.length > 0 &&
      asideNavs.map((item, index) => {
        if (item.to === matched) {
          openKeys = [`${index}`];
        }
      });

    return openKeys;
  };

  render() {
    const { location = {} } = this.props;
    const { pathname } = location;

    return (
      <Layout
        style={{ minHeight: '100vh' }}
        className={cx(
          `ice-design-header-aside-footer-responsive-layout-${
            this.state.theme
          }`,
          {
            'ice-design-layout': true,
          }
        )}
      >
        <Header
          theme={this.state.theme}
          isMobile={this.state.isScreen !== 'isDesktop' ? true : undefined}
        />
        <Layout.Section>
          {this.state.isScreen === 'isMobile' && (
            <a className="menu-btn" onClick={this.toggleMenu}>
              <Icon type="category" size="small" />
            </a>
          )}
          {this.state.openDrawer && (
            <div className="open-drawer-bg" onClick={this.toggleMenu} />
          )}
          {this.state.isScreen === 'isDesktop' && (
            <a className="theme-btn" onClick={this.toggleTheme}>
              切换主题
            </a>
          )}
          <Layout.Aside
            width="auto"
            theme={this.state.theme}
            className={cx('ice-design-layout-aside', {
              'open-drawer': this.state.openDrawer,
            })}
          >
            {/* 侧边菜单项 begin */}
            {this.state.isScreen !== 'isMobile' && (
              <a className="collapse-btn" onClick={this.toggleCollapse}>
                <Icon
                  type={this.state.collapse ? 'arrow-right' : 'arrow-left'}
                  size="small"
                />
              </a>
            )}
            {this.state.isScreen === 'isMobile' && <Logo />}
            <Menu
              style={{ width: this.state.collapse ? 60 : 200 }}
              inlineCollapsed={this.state.collapse}
              mode="inline"
              selectedKeys={[pathname]}
              openKeys={this.state.openKeys}
              defaultSelectedKeys={[pathname]}
              onOpenChange={this.onOpenChange}
              onClick={this.onMenuClick}
            >
              {asideNavs &&
                asideNavs.length > 0 &&
                asideNavs.map((nav, index) => {
                  if (nav.children && nav.children.length > 0) {
                    return (
                      <SubMenu
                        key={index}
                        title={
                          <span>
                            {nav.icon ? (
                              <FoundationSymbol size="small" type={nav.icon} />
                            ) : null}
                            <span className="ice-menu-collapse-hide">
                              {nav.text}
                            </span>
                          </span>
                        }
                      >
                        {nav.children.map((item) => {
                          const linkProps = {};
                          if (item.newWindow) {
                            linkProps.href = item.to;
                            linkProps.target = '_blank';
                          } else if (item.external) {
                            linkProps.href = item.to;
                          } else {
                            linkProps.to = item.to;
                          }
                          return (
                            <MenuItem key={item.to}>
                              <Link {...linkProps}>{item.text}</Link>
                            </MenuItem>
                          );
                        })}
                      </SubMenu>
                    );
                  }
                  const linkProps = {};
                  if (nav.newWindow) {
                    linkProps.href = nav.to;
                    linkProps.target = '_blank';
                  } else if (nav.external) {
                    linkProps.href = nav.to;
                  } else {
                    linkProps.to = nav.to;
                  }
                  return (
                    <MenuItem key={nav.to}>
                      <Link {...linkProps}>
                        <span>
                          {nav.icon ? (
                            <FoundationSymbol size="small" type={nav.icon} />
                          ) : null}
                          <span className="ice-menu-collapse-hide">
                            {nav.text}
                          </span>
                        </span>
                      </Link>
                    </MenuItem>
                  );
                })}
            </Menu>
            {/* 侧边菜单项 end */}
          </Layout.Aside>
          {/* 主体内容 */}
          <Layout.Main>{this.props.children}</Layout.Main>
        </Layout.Section>
        <Footer />
      </Layout>
    );
  }
}
