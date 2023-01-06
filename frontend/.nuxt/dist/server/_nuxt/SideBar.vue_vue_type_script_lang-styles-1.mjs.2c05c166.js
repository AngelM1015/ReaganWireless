const vueSidebarMenu = '.v-sidebar-menu{-webkit-box-orient:vertical;-webkit-box-direction:normal;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;left:0;position:fixed;text-align:left;top:0;-webkit-transition:max-width .3s ease;transition:max-width .3s ease;width:100%;z-index:999}.v-sidebar-menu,.v-sidebar-menu *{-webkit-box-sizing:border-box;box-sizing:border-box}.v-sidebar-menu .vsm--scroll-wrapper{-webkit-box-flex:1;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;min-height:0;position:relative}.v-sidebar-menu .vsm--scroll-wrapper:active .vsm--scroll-bar,.v-sidebar-menu .vsm--scroll-wrapper:focus .vsm--scroll-bar,.v-sidebar-menu .vsm--scroll-wrapper:hover .vsm--scroll-bar{opacity:1}.v-sidebar-menu .vsm--scroll-overflow{height:100%;overflow:hidden;width:100%}.v-sidebar-menu .vsm--scroll{-ms-overflow-style:none;height:100%;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none}.v-sidebar-menu .vsm--scroll::-webkit-scrollbar{display:none;height:0;width:0}.v-sidebar-menu .vsm--scroll>.vsm--menu{position:static!important;-webkit-transition:width .3s ease;transition:width .3s ease}.v-sidebar-menu .vsm--scroll-bar{bottom:2px;opacity:0;position:absolute;right:2px;top:2px;width:6px;z-index:5}.v-sidebar-menu .vsm--scroll-bar,.v-sidebar-menu .vsm--scroll-thumb{border-radius:4px;-webkit-transition:opacity .3s ease;transition:opacity .3s ease}.v-sidebar-menu .vsm--scroll-thumb{background-color:#aaa;cursor:pointer;display:block;opacity:.5;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-sidebar-menu .vsm--scroll-thumb:hover{opacity:1}.v-sidebar-menu .vsm--dropdown,.v-sidebar-menu .vsm--menu{list-style:none;margin:0;padding:0}.v-sidebar-menu .vsm--dropdown{padding:5px}.v-sidebar-menu .vsm--item{display:block;position:static!important;white-space:nowrap;width:100%}.v-sidebar-menu .vsm--link{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;font-size:16px;font-weight:400;line-height:30px;padding:10px 15px;position:static!important;text-decoration:none;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-sidebar-menu .vsm--link_active{font-weight:600}.v-sidebar-menu .vsm--link_disabled{opacity:.4;pointer-events:none}.v-sidebar-menu .vsm--link_level-1 .vsm--icon{-ms-flex-negative:0;border-radius:3px;flex-shrink:0;height:35px;width:35px}.v-sidebar-menu .vsm--icon{-webkit-box-pack:center;-ms-flex-pack:center;height:25px;justify-content:center;margin-right:15px;width:25px;z-index:20}.v-sidebar-menu .vsm--icon,.v-sidebar-menu .vsm--title{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex}.v-sidebar-menu .vsm--title{-webkit-box-flex:1;-ms-flex:1;flex:1}.v-sidebar-menu .vsm--title>span:first-child{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}.v-sidebar-menu .vsm--title_hidden{clip:rect(0,0,0,0);border:0;height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.v-sidebar-menu .vsm--arrow{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;font-size:14px;height:30px;justify-content:center;text-align:center;width:30px}.v-sidebar-menu .vsm--arrow_default{height:12px;position:relative;-webkit-transition:-webkit-transform .3s ease;transition:-webkit-transform .3s ease;transition:transform .3s ease;transition:transform .3s ease,-webkit-transform .3s ease;width:12px}.v-sidebar-menu .vsm--arrow_default:before{border-bottom:2px solid;border-left:2px solid;-webkit-box-sizing:content-box;box-sizing:content-box;content:"";display:inline-block;height:6px;left:0;position:absolute;top:2px;-webkit-transform:rotate(-135deg);transform:rotate(-135deg);width:6px}.v-sidebar-menu .vsm--arrow_open .vsm--arrow_default{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.v-sidebar-menu .vsm--header{font-size:14px;font-weight:600;padding:10px 15px;text-transform:uppercase;white-space:nowrap}.v-sidebar-menu .vsm--badge_default{border-radius:3px;font-size:12px;font-weight:600;height:20px;line-height:20px;padding:0 6px;text-transform:uppercase}.v-sidebar-menu .vsm--toggle-btn{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border:none;cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;font-size:18px;height:65px;justify-content:center;text-align:center;width:100%}.v-sidebar-menu .vsm--toggle-btn_default{height:12px;position:relative;width:12px}.v-sidebar-menu .vsm--toggle-btn_default:before{border-left:2px solid;content:"";display:inline-block;height:12px;left:0;position:absolute;top:0}.v-sidebar-menu .vsm--toggle-btn_default:after{border-bottom:2px solid;border-left:2px solid;-webkit-box-sizing:content-box;box-sizing:content-box;content:"";display:inline-block;height:6px;left:4px;position:absolute;top:2px;-webkit-transform:rotate(45deg);transform:rotate(45deg);width:6px}.v-sidebar-menu.vsm_collapsed .vsm--link_level-1.vsm--link_hover,.v-sidebar-menu.vsm_collapsed .vsm--link_level-1:hover{background-color:transparent!important}.v-sidebar-menu.vsm_collapsed .vsm--toggle-btn_default{-webkit-transform:scaleX(-1);transform:scaleX(-1)}.v-sidebar-menu.vsm_collapsed.vsm_rtl .vsm--toggle-btn_default{-webkit-transform:scaleX(1);transform:scaleX(1)}.v-sidebar-menu.vsm_collapsed .vsm--scroll-wrapper{width:calc(100% + 8px)}.v-sidebar-menu.vsm_rtl{direction:rtl;left:inherit;right:0;text-align:right}.v-sidebar-menu.vsm_rtl .vsm--icon{margin-left:15px;margin-right:0}.v-sidebar-menu.vsm_rtl .vsm--arrow_default{-webkit-transform:scaleX(-1);transform:scaleX(-1)}.v-sidebar-menu.vsm_rtl .vsm--arrow_open .vsm--arrow_default{-webkit-transform:rotate(-90deg) scaleX(-1);transform:rotate(-90deg) scaleX(-1)}.v-sidebar-menu.vsm_rtl .vsm--toggle-btn_default{-webkit-transform:scaleX(-1);transform:scaleX(-1)}.v-sidebar-menu.vsm_rtl .vsm--scroll-bar{left:2px;right:inherit}.v-sidebar-menu.vsm_relative{height:100%;position:relative}.v-sidebar-menu .expand-enter-active,.v-sidebar-menu .expand-leave-active{overflow:hidden;-webkit-transition:height .3s ease;transition:height .3s ease}.v-sidebar-menu .expand-enter-from,.v-sidebar-menu .expand-leave-to{height:0!important}.v-sidebar-menu .slide-animation-enter-active,.v-sidebar-menu .slide-animation-leave-active{-webkit-transition:width .3s ease;transition:width .3s ease}.v-sidebar-menu .slide-animation-enter-from,.v-sidebar-menu .slide-animation-leave-to{width:0!important}.v-sidebar-menu{background-color:#2a2a2e}.v-sidebar-menu .vsm--link{color:#fff}.v-sidebar-menu .vsm--link_level-1.vsm--link_active{-webkit-box-shadow:inset 3px 0 0 0 #4285f4;box-shadow:inset 3px 0 0 0 #4285f4}.v-sidebar-menu .vsm--link_level-1 .vsm--icon{background-color:#1e1e21}.v-sidebar-menu .vsm--link_hover{background-color:rgba(30,30,33,.5)}.v-sidebar-menu .vsm--link_mobile{color:#fff}.v-sidebar-menu.vsm_expanded .vsm--link_level-1.vsm--link_open{background-color:#4285f4;color:#fff}.v-sidebar-menu.vsm_expanded .vsm--link_level-1.vsm--link_open .vsm--icon{background-color:#4285f4}.v-sidebar-menu.vsm_collapsed .vsm--link_level-1.vsm--link_hover .vsm--icon{background-color:#4285f4;color:#fff}.v-sidebar-menu .vsm--dropdown{background-color:#36363b}.v-sidebar-menu .vsm--mobile-bg{background-color:#4285f4}.v-sidebar-menu.vsm_rtl .vsm--link_level-1.vsm--link_active{-webkit-box-shadow:inset -3px 0 0 0 #4285f4;box-shadow:inset -3px 0 0 0 #4285f4}.v-sidebar-menu .vsm--header{color:hsla(0,0%,100%,.7)}.v-sidebar-menu .vsm--badge_default,.v-sidebar-menu .vsm--toggle-btn{background-color:#1e1e21;color:#fff}.v-sidebar-menu.vsm_white-theme{background-color:#fff}.v-sidebar-menu.vsm_white-theme .vsm--link{color:#262626}.v-sidebar-menu.vsm_white-theme .vsm--link_level-1.vsm--link_active{-webkit-box-shadow:inset 3px 0 0 0 #4285f4;box-shadow:inset 3px 0 0 0 #4285f4}.v-sidebar-menu.vsm_white-theme .vsm--link_level-1.vsm--link_active .vsm--icon{background-color:#262626;color:#fff}.v-sidebar-menu.vsm_white-theme .vsm--link_level-1 .vsm--icon{background-color:#bbc5d6}.v-sidebar-menu.vsm_white-theme .vsm--link_hover{background-color:hsla(0,0%,95%,.5)}.v-sidebar-menu.vsm_white-theme .vsm--link_mobile{color:#fff}.v-sidebar-menu.vsm_white-theme.vsm_expanded .vsm--link_level-1.vsm--link_open{background-color:#4285f4;color:#fff}.v-sidebar-menu.vsm_white-theme.vsm_expanded .vsm--link_level-1.vsm--link_open .vsm--icon{background-color:#4285f4}.v-sidebar-menu.vsm_white-theme.vsm_collapsed .vsm--link_level-1.vsm--link_hover .vsm--icon{background-color:#4285f4;color:#fff}.v-sidebar-menu.vsm_white-theme .vsm--dropdown{background-color:#e3e3e3}.v-sidebar-menu.vsm_white-theme .vsm--mobile-bg{background-color:#4285f4}.v-sidebar-menu.vsm_white-theme.vsm_rtl .vsm--link_level-1.vsm--link_active{-webkit-box-shadow:inset -3px 0 0 0 #4285f4;box-shadow:inset -3px 0 0 0 #4285f4}.v-sidebar-menu.vsm_white-theme .vsm--header{color:rgba(38,38,38,.7)}.v-sidebar-menu.vsm_white-theme .vsm--badge_default,.v-sidebar-menu.vsm_white-theme .vsm--toggle-btn{background-color:#f2f2f2;color:#262626}\n/*# sourceMappingURL=vue-sidebar-menu.css?inline&used.map */';
export {
  vueSidebarMenu as default
};
//# sourceMappingURL=SideBar.vue_vue_type_script_lang-styles-1.mjs.2c05c166.js.map
