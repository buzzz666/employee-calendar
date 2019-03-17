<template>
  <v-app id="inspire">
    <v-navigation-drawer
            :clipped="$vuetify.breakpoint.lgAndUp"
            v-model="drawer"
            fixed
            app
            style="padding-top: 10px"
            width="220"
    >
      <v-list dense>
        <template v-for="item in navigation">
          <v-list-group
                  v-if="item.children"
                  v-model="item.model"
                  :key="item.text"
                  :prepend-icon="item.model ? item.icon : item['icon-alt']"
                  append-icon=""
                  ripple
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                    v-for="(child, i) in item.children"
                    :disabled="disableNav"
                    :key="i"
                    :to="child.to"
                    ripple
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else-if="item.header" :disabled="disableNav" :key="item.text">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.header }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-else :disabled="disableNav" :key="item.text" :to="item.to" ripple>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            color="blue darken-3"
            dark
            app
            fixed
    >
      <v-toolbar-title style="width: 70%" class="ml-0 pl-0">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down" style="display: inline-flex; align-items: center">
                    <h3 style="margin-left: 10px; transition: all 375ms ease; opacity: 0;" :class="[{
                        'visible': currentPageLabelVisible
                    }]">{{currentPage}}</h3>
                </span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <h3>Hello, {{user.name}}</h3>

      <v-tooltip bottom>
        <v-btn icon large href="#" slot="activator">
          <v-avatar size="32px" tile>
            <i class="v-icon material-icons">logout</i>
          </v-avatar>
        </v-btn>
        <span>Logout</span>
      </v-tooltip>

    </v-toolbar>
    <v-content>
      <v-container fluid style="min-height: 100%">
        <transition name="router">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-content>

    <v-dialog
            v-model="modal.show"
            width="460"
    >
      <v-card>
        <v-card-title class="headline light-blue darken-2">
          <p style="color: white; font-size: 20px; margin: 0">{{modal.header}}</p>
        </v-card-title>
        <v-card-text style="justify-content: flex-end">
          <p>{{modal.text}}</p>
          <v-layout align-right>
            <v-flex md12 text-xs-right>
              <v-btn
                      dark
                      color="light-blue darken-2"
                      @click="modal.show = false"
              >
                OK
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>

    </v-dialog>
  </v-app>
</template>

<script>
  import {bus} from './services/bus';

  export default {
    name: "App",
    props: {
      startPage: {
        default: 'Reports',
      }
    },
    data(){
      return {
        drawer: true,

        user: {name: 'Admin'},

        currentPage: 'Home',
        currentPageLabelVisible: true,

        disableNav: false,

        navigation: [
          { icon: 'home', text: 'Home', to: '/' },
        ],

        modal: {
          header: '',
          text: '',
          show: false
        }
      };
    },
    created(){
      if(localStorage.getItem('drawerState')){
        this.drawer = localStorage.getItem('drawerState') === 'true';
      }

      this.$parent.$on('change-page', (name) => {
        this.setCurrentPage(name);
      });

      bus.$on('loading', (state) => {
        this.disableNav = state;
      });

      bus.$on('info', (params) => {
        this.modal.header = params.header;
        this.modal.text = params.text;
        this.modal.show = true;
      });
    },
    mounted(){
      this.$parent.$emit('get-page');
    },
    watch: {
      drawer(val){
        localStorage.setItem('drawerState', val);
      }
    },
    methods: {
      setCurrentPage(name){
        this.currentPageLabelVisible = false;
        setTimeout(() => {
          this.currentPage = name;
          this.currentPageLabelVisible = true;
        }, 375);
      }
    }
  }
</script>

<style scoped>
  .router-enter-active{
    transition: opacity .25s, transform .25s;
    transition-delay: .25s;
  }

  .router-leave-active{
    transition: opacity .25s, transform .25s;
  }

  .router-enter{
    position: absolute;
    right: 0;
    transform: translateY(5px);
    opacity: 0;
  }

  .router-leave-to{
    right: 0;
    transform: translateY(5px);
    opacity: 0;
  }
</style>

<style>
  h3.visible{
    opacity: 1 !important;
  }

  .v-toolbar__title{
    display: flex;
  }

  .v-toolbar.v-toolbar--fixed{
    z-index: 5;
  }

  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,.el-table__body tr.current-row>td,.el-table__body tr.hover-row.current-row>td,.el-table__body tr.hover-row.el-table__row--striped.current-row>td,.el-table__body tr.hover-row.el-table__row--striped>td,.el-table__body tr.hover-row>td {
    background-color:#eee
  }

  .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #ebeef5 !important;
  }

  th .cell{
    display: flex !important;
    word-break: break-word !important;
    align-items: center;
  }

  th.is-center .cell{
    justify-content: center;
  }

  th.is-right .cell{
    justify-content: flex-end;
  }
</style>