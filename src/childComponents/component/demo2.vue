<template>
  <div class="layout">
    <Layout :style="{height: '100vh'}">
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="60" v-model="isCollapsed">
        <div class="logo-left">
          <img v-show="isCollapsed" src="../assets/img/logo-min.png" key="min-logo" class="logomin"/>
          <img v-show="!isCollapsed" src="../assets/img/logo.png" key="max-logo" class="logo"/>
        </div>

        <!-- <Menu theme="light" width="auto" :class="menuitemClasses" :style="{height: sideHeight + 'px'}" accordion
              v-show=" isCollapsed">
          <MenuItem v-for="(item,index) in menuData" :key="index" :name="item.id +''" v-if="item.isShow==1"
          v-show="menuListLeft">
            <Dropdown>
              <a href="javascript:void(0)">
                <Icon :type="item.lcon"/>
                <span>{{item.resourceName}}</span>
              </a>
              <DropdownMenu slot="list" class="dropdown">
                <DropdownItem v-for="(mi,index) in item.childrenList" :key="index" :name="mi.id +''"  v-if="mi.isShow==1"
                              @click.native="changetab(mi.resourceUrl,mi)"
                              v-show="menuListLeft">{{mi.resourceName}}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </MenuItem>

        </Menu> -->
        <com-menu-collapsed
          v-show="isCollapsed"
          theme="light"
          width="auto"
          :accordion="true"
          mode="vertical"
          :subMenus="menuData"
          :menuConfig="{child:'childrenList',name:'id',label:'resourceName',url:'resourceUrl',visible:'isShow'}"/>
        <!-- <Menu theme="light" width="auto" :class="menuitemClasses" :style="{height: sideHeight + 'px'}" accordion
              v-show="!isCollapsed">
          <Submenu v-for="(item,index) in menuData" :key="index" :name="item.id +''"  v-if="item.isShow==1"
                   v-show="menuListLeft">
            <template slot="title">
              <Icon :type="item.lcon"></Icon>
              <span>{{item.resourceName}}</span>
            </template>
            <menu-item v-for="(mi,index) in item.childrenList" :key="index" :name="mi.id +''" v-if="mi.isShow==1"
                       @click.native="changetab(mi.resourceUrl,mi)"
                       v-show="menuListLeft">{{mi.resourceName}}
            </menu-item>
          </Submenu>
        </Menu> -->
        <com-menu
          theme="light"
          v-show="!isCollapsed"
          width="auto"
          :accordion="true"
          mode="vertical"
          :subMenus="menuData"
          :eventOpts="eventOptsMenu"
          :menuConfig="{child:'childrenList',name:'id',label:'resourceName',url:'resourceUrl',visible:'isShow'}">
        </com-menu>
      </Sider>
      <Layout>
        <Header class="layout-header-bar header-position" :class="{'header-position-collapse': isCollapsed}">
          <div class="header cl">
            <div class="menu-btn fl">
              <Icon type="md-menu" size="23" color="rgba(0,0,0,0.65)" @click.native="collapsedSider"
                    :class="rotateIcon"/>
            </div>
            <div class="font fl">
              <span>营收中心</span><span>Revenue Center</span>
            </div><!--头部左侧 end-->
            <!--头部右侧 start-->
            <Button type="text" class="esc fr" @click="loginOut">退出</Button>
            <Dropdown class="pull-down-list fr" @on-click="dropdownClick">
              <a href="javascript:void(0)">
                角色
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem v-for="(DropdownItem,index) in DropdownItemList" :key="index"
                >{{DropdownItem.roleName}}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <div class="user fr">
              <img :src="avatarUrl" class="head-icon"/>
              <!--../assets/img/headIcon.jpg-->
              <span>{{userName}}</span>
            </div><!--头部右侧 end-->

          </div>
        </Header>
        <Content class="right-cont content-position">
          <!-- v-if="forbbidens"-->
          <div v-if="forbbidens">
            <!-- <Tabs @on-click="click" @on-tab-remove="remove" type="card" :closable="true" :animated="false"
                  :value="activeTab">
              <TabPane :label="tab.resourceName" :name="tab.id +''" v-for="(tab,index) in tabs" :key="tab.id"></TabPane>
            </Tabs> -->
            <com-tabs
              type="card"
              :value="activeTab"
              :closable="true"
              :animated="false"
              :eventOpts="eventOptsTabs"
              :tabList="tabs"
              :tabConfig="{label:'resourceName',name:'id',id:'id'}">
            </com-tabs>
            <!--切换路由缓存，页面不刷新-->
            <keep-alive :include="keepaliveInclude">
              <router-view></router-view>
            </keep-alive>
          </div>
          <!--无权限页面-->
          <!--v-else-->
          <div v-else>
            <compentence></compentence>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  import ComTabs from 'components/me/tabs/ComTabs.vue'
  import ComMenu from 'components/me/menu/ComMenu.vue'
  import ComMenuCollapsed from 'components/me/menu/ComMenuCollapsed.vue'
  import compentence from "../view/qx/compentence.vue";
  import {userList, queryByUser} from "../api";
  import Cookie from 'js-cookie';
  import {baseURL} from '../util/axios'

  export default {
    // name: 'test',
    data() {
      return {
        DropdownItemList: [],
        menuData: [],
        keepaliveInclude: '',
        activeTab: '',
        mainHeight: 0,
        frameHeight: 0,
        tabs: [],
        mainTabs: [],
        i1: false,
        isCollapsed: false,
        userName: Cookie.get('name'),
        avatarUrl: Cookie.get('avatarUrl') || require('../assets/img/headIcon.svg'),
        sideHeight: document.documentElement.clientHeight - 64,
        forbbidens: true,
        menuListLeft: true,
      }
    },
    components: {
      ComMenu,
      ComMenuCollapsed,
      ComTabs,
      compentence
    },
    computed: {
      eventOptsTabs() {
        return {
          onClick: this.click,
          onTabRemove: this.remove
        }
      },
      eventOptsMenu() {
        return {
          onSelect: function (val) {
            console.log('onselect', val)
          },
          onOpenChange: function (val) {
            console.log('onchange', val)
          },
        }
      },
      rotateIcon() {
        return [
          'menu-icon',
          this.isCollapsed ? 'rotate-icon' : ''
        ];
      },
      menuitemClasses() {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      }
    },
    mounted: function () {

    },
    beforeDestroy() {
      eventBus.$off('changetab');
      eventBus.$off('forbiddenFun');
    },
    created() {
      // console.log(window.sessionStorage.getItem('forbbiden'));
      this.getUserList();
      this.getRoleList();
      let that = this;
      eventBus.$on('changetab', function (path, active, param) {
        that.changetab(path, active, param);
      });
      //获取路由传递过来的无权限状态
      eventBus.$on('forbiddenFun', function (flag) {
        that.forbbidens = flag;
      });
    },
    methods: {
      //登出
      loginOut() {
        sessionStorage.removeItem("topTabs");
        sessionStorage.removeItem("topTabName");
        sessionStorage.removeItem("menuList");
        window.location.href = baseURL + '/web/callback/loginOut';
      },
      loadTab() {
        var tabJson = sessionStorage.getItem("topTabs");
        if (tabJson) {
          this.tabs = JSON.parse(tabJson);
        }
        var tabName = sessionStorage.getItem("topTabName");
        if (tabName) {
          this.activeTab = tabName;
          this.tabs.forEach(value => {
            if (tabName == value.id) {
              this.gotoAddress(value.resourceUrl);
              return false;
            }
          })
        }
      },
      //获取角色列表
      getRoleList() {
        let data = {
          userId: Cookie.get('id')
        }
        queryByUser(data).then(res => {
          if (res.data.code === 200) {
            this.DropdownItemList = res.data.data;
          }
        })
      },
      //点击角色
      dropdownClick() {
        this.getUserList();
      },
      //获取左侧列表
      getUserList() {
        let param = {};
        param.userId = Cookie.get("id");
        userList(param).then(res => {
          if (res.data.code === 200) {
            this.loadTab();
            this.menuData = res.data.data;

            if (this.menuData.every(item => item.isShow == 0)) {
              this.menuListLeft = false;
            }
            let menuList = [];

            this.menuData.forEach(value => {
              if (value.childrenList && value.childrenList.length > 0) {
                value.childrenList.forEach((value2, index) => {
                  value2.clickCallback = this.changetab //绑定callback
                  if (value2.resourceName === "收款管理") {
                    let target = {
                      id: 111,
                      childrenList: [
                        {
                          id: 1231,
                          resourceUrl: '/other1',
                          resourceName: '测试child1',
                          clickCallback: this.changetab,
                          isShow: 1
                        },
                        {
                          id: 1232,
                          resourceUrl: '/other2',
                          resourceName: '测试child2',
                          clickCallback: this.changetab,
                          isShow: 1
                        }
                      ],
                      resourceUrl: '/other',
                      resourceName: '测试',
                      isShow: 1
                    }
                    value2.childrenList.push(target)
                  }
                  menuList.push(value2);
                })
              }
            });
            // console.log('数据',this.menuData)
            sessionStorage.setItem("menuList", JSON.stringify(menuList));
            if (menuList.length == 0) {
              this.$router.push('/compentence');
              return
            }
          }
        })
      },
      remove(name) {
        var index = 0;
        var flag = false;
        if (name == this.activeTab) {
          flag = true;
        }
        for (var i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i].id + '' == name) {
            index = i;
            break;
          }
        }
        this.tabs.splice(index, 1);
        this.keepaliveInclude = this.tabs.map(item => {
          return item.menuCode;
        }).toString();
        sessionStorage.setItem("topTabs", JSON.stringify(this.tabs));
        if (flag) {
          if (index == 0) {
            if (this.tabs.length > 0) {
              sessionStorage.setItem("topTabName", this.tabs[0].id + '');
              this.activeTab = this.tabs[0].id + '';
              this.gotoAddress(this.tabs[0].resourceUrl);
            } else {
              sessionStorage.removeItem("topTabName");
              sessionStorage.removeItem("topTabs");
              this.gotoAddress("/");
            }
          } else {
            sessionStorage.setItem("topTabName", this.tabs[index - 1].id + '');
            this.activeTab = this.tabs[index - 1].id + '';
            this.gotoAddress(this.tabs[index - 1].resourceUrl);
          }
        }
      },
      click(name) {
        this.tabs.forEach(value => {
          if (name == value.id + '') {
            this.activeTab = name;
            sessionStorage.setItem("topTabName", this.activeTab);
            this.gotoAddress(value.resourceUrl);
            return false;
          }
        })
      },
      collapsedSider() {
        this.$refs.side1.toggleCollapse();
      },
      gotoAddress(path, param) {
        if (param) {
          this.$router.push({path: path, query: param});
        } else {
          this.$router.push(path);
        }

      },
      changetab(path, active, param) {
        var flag = true;
        this.tabs.forEach(value => {
          if (value.id + '' == active.id + '') {
            flag = false;
          }
        });
        if (flag) {
          this.tabs.push(active);
          this.keepaliveInclude = this.tabs.map(item => {
            return item.menuCode;
          }).toString();
          sessionStorage.setItem("topTabs", JSON.stringify(this.tabs));
        }
        this.activeTab = active.id + '';
        sessionStorage.setItem("topTabName", this.activeTab);
        this.gotoAddress(path, param);
      },
    }
  }
</script>
<style scoped lang='less'>
  .header-position {
    padding: 0px;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1000;
    width: calc(100% - 200px);
    transition: width .2s;
  }

  .header-position-collapse {
    width: calc(100% - 60px);
    transition: width .4s;
  }

  .content-position {
    margin-top: 64px;
  }

  .dropdown {
    position: absolute;
    left: 0.35rem;
    top: -0.4rem;
    background: white;
    z-index: 100;
  }

  .menu-icon {
    transition: all .3s;
  }

  .rotate-icon {
    transform: rotate(-90deg);
  }

  .header-logo {
    width: 77px;
    background: #1f2e54;
    transition: width .2s ease .2s;
  }

  .header-logo-max {
    width: 203px;
    background: #1f2e54;
  }

  .collapsed-menu .header-logo {
    width: 0px;
    transition: width .2s ease .2s;
  }

  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 70%;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i {
    transform: translateX(0rem);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 0.14rem;
  }

  .collapsed-menu span {
    width: 0rem;
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 0.22rem;
  }


</style>
