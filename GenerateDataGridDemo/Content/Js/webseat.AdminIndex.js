/*
*Author  熊建
*webseat.adminindex.js
*Date: 2014-02-17
*Desc  后台首页的Js相关。 依赖 webseta.core.js
*/
(function (wj) {
    var index = wj.AdminIndex || {},
        tabId = '#tabs', accordion = '#aa', objTab, layOutId = '#body',
        //获取相关数据
        getObj = {
            getTab: function (id) {
                id = id || tabId;
                return $(id); //objTab || (objTab = $(id), objTab);
            }
        },
        saveOpenTabKey = 'openTabs';
    //首页的设置 可来源于后台用户配置
    index.settings = {
        maxTabNum: 10,
        homeTabTitle: '学校管理',
        homeTabUrl: '/Manager/MgrSchool'
    };
    //获取打开的Tab parseJSON 可能失败
    function getOpenTabs() {
        return $.parseJSON(window.decodeURIComponent(utils.Cookie(saveOpenTabKey)));
    }
    //tab保存到cookie中
    function setOpenTabs(obj) {
        utils.Cookie(saveOpenTabKey, window.encodeURIComponent($.toJSON(obj)));
    }
    //把打开过的tab保存到cookie中
    function saveOpenTabToCookie(href, title, icon) {
        var openTabs = getOpenTabs();
        openTabs = openTabs || {};
        openTabs[title] = openTabs[title] || {};
        openTabs[title]['href'] = href;
        openTabs[title]['icon'] = icon;
        setOpenTabs(openTabs);
    }
    //关闭的时候清除Cookie中保存的值
    function clearTabCookie(title) {
        var objopenTabs = getOpenTabs();
        objopenTabs && title && delete objopenTabs[title];
        title || (objopenTabs = {});//没有传title 直接全部清除
        setOpenTabs(objopenTabs);
    }
    //首页初始化
    index.InitIndex = function () {
        getObj.getTab().tabs({
            tools: [{ iconCls: 'icon-reload', plain: true, title: '刷新', handler: index.Tabs.RefreshTab },
                { iconCls: 'icon-arrow_out_longer', plain: true, title: '全屏', handler: index.setFullScreen },
                { iconCls: 'icon-no', plain: true, title: '关闭所有页面', handler: index.Tabs.CloseAll }],
            onClose: clearTabCookie,
            onSelect: index.Tabs.OnSelect
        });
        index.BindAccordionToTabs();
        index.Tabs.TabClose();
        index.Tabs.TabCloseEvent();
        index.initOpenTabs();
        index.LogOut();
    };

    index.clearAllTabCookie = function() {
        clearTabCookie();
    };

    index.LogOut = function () {
        $("#logout").click(function() {
            utils.AjaxHandle('/Manager/BackHome/LoginOut', '', function () {
                index.clearAllTabCookie();
                utils.RedirectTo('/Manager/BackHome/Login');
            });
        });
    };

    index.initOpenTabs = function () {
        var openedTabs = getOpenTabs();
        for (var obj in openedTabs) {
            if (openedTabs.hasOwnProperty(obj)) {
                var href = openedTabs[obj]['href'],
                    icon = openedTabs[obj]['icon'];
                obj && href && (index.Tabs.AddTab(href, { title: obj, icon: icon }));
            }
        }
    };
    //点击左边的才菜单，右边添加一个tab，并且加载iframe内容
    index.BindAccordionToTabs = function () {
        var $accordion = $(accordion),
         panels = $accordion.accordion('panels');
        $accordion.accordion({ animate: false, fit: true, border: false });
        $accordion.accordion('select', panels[0].panel('options').title);
        $accordion.on("click", ' li', function () {
            $accordion.find('li div').removeClass("selected");
            $(this).children('div').addClass("selected");
            var $innerA = $(this).find('a');
            if (!$innerA) { return false; }
            var href = $innerA.attr('hrefval'),
                title = $innerA.attr('title'),
                id = $innerA.attr('Id'),
                icon = $innerA.children('.icon').attr('class').replace('icon', '');
            if (!href || !title) { return false; }
            var parentText = $(this).closest('.panel').find('.panel-title').text();
            var opts = {
                title: title,
                icon: icon
            };
            index.Tabs.AddTab(href, opts, id, parentText);
            return false;
        }).on("mouseover", ' li', function () {
            $(this).children('div').addClass("hover");
        }).on("mouseout", ' li', function () {
            $(this).children('div').removeClass("hover");
        });
    };

    index.setFullScreen = function () {
        var that = $(this),
            zoomIn = 'icon-arrow_out_longer',
            zoomOut = 'icon-arrow_in_longer',
            $body = $('body'),
            panels = $body.data().layout.panels,
            selector = '.layout-panel-north [data-options*=north],.layout-panel-west [data-options*=west]';
        if (that.find('.' + zoomIn).length) {
            that.find('.' + zoomIn).removeClass(zoomIn).addClass(zoomOut);
            $(selector).panel('close');
            panels.north.length = panels.west.length = 0;
            $body.layout('resize');
        } else if ($(this).find('.' + zoomOut).length) {
            that.find('.' + zoomOut).removeClass(zoomOut).addClass(zoomIn);
            $(selector).panel('open');
            panels.north.length = panels.west.length = 1;
            $body.layout('resize');
        }
    };

    index.Tabs = (function () {
        //设置Main Title,显示导航信息
        function setMainTitle(navText, obj) {
            var body = $(layOutId);
            if (!body) {
                return;
            }
            var center = body.layout('panel', 'center');
            if (!center || !center.panel('panel')) {
                return;
            }
            var topTitle = "当前位置：导航栏", arrNav, toNext = '>>';
            if (!navText) {
                center.panel('setTitle', '');
                /*var secondText = $($(obj).parents('.panel')[0]).find('.panel-title').text(),
                    third = $(obj).text();
                arrNav = [topTitle, secondText, third];
                center.panel('setTitle', arrNav.join(toNext));*/
            } else {
                arrNav = [topTitle, navText];
                center.panel('setTitle', arrNav.join(toNext));
            }
        }
        return {
            //向指定位置添加tab，tab里面的内容是iframe形势加载, 如果该tab已经添加就刷新对应的页面
            AddTab: function (href, opts, id, parentText) {
                opts = opts || {};
                if (!opts.title) {
                    WebJs.Dialog.Tip('title不能为空');
                    return;
                }
                var tt = getObj.getTab(),
                    tabCount = tt.tabs('tabs').length | 0;
                if (tabCount >= index.settings.maxTabNum) {
                    WebJs.Dialog.Tip('您打开了太多的页面，如果继续打开，<br/>会造成程序运行缓慢，无法流畅操作！', { title: '系统提示', timeout: 3e3 });
                    return;
                }
                if (opts.title && tt.tabs('exists', opts.title)) {
                    //如果tab已经存在,选中并刷新该tab          
                    tt.tabs('select', opts.title);
                    index.Tabs.RefreshTab({ tabTitle: opts.title, url: href });
                    return;
                }
                var defopts = {
                    title: "NewTabs" + (+new Date()),
                    closable: true,
                    content: null,
                    animate: true,
                    fit: true,
                    cache: false,
                    height: '100%'
                };
                opts = $.extend(defopts, opts);
                opts.content = opts.content || com.createFrame(href, id, parentText);
                //保存添加的tab到cookie  这个最好操作location.hash cookie保存会有问题
                saveOpenTabToCookie(href, opts.title, opts.icon || '');
                tt.tabs('add', opts);
            },
            //关闭tab
            TabClose: function () {
                var $tabs = getObj.getTab();
                /*双击关闭TAB选项卡*/
                $tabs.on('dblclick', 'a.tabs-inner', function () {
                    $tabs.tabs('close', $(this).children(".tabs-closable").text());
                });
                /*为选项卡绑定右键*/
                $tabs.on('contextmenu', 'a.tabs-inner', function (e) {
                    e.preventDefault();
                    var $mm = $('#tab-mm');
                    $mm.menu('show', {
                        left: e.pageX,
                        top: e.pageY
                    });
                    var subtitle = $(this).children(".tabs-closable").text();
                    $mm.data("currtabTitle", subtitle);
                    $tabs.tabs('select', subtitle);
                    return false;
                });
            },
            CloseAll: function () {
                WebJs.Dialog.Confirm('确认要关闭所有窗口', function () {
                    var titles = index.Tabs.GetTabTitles();
                    clearTabCookie();//清除所打开的所有页面
                    setMainTitle();//清除导航栏
                    $.each(titles, function () {
                        if (this !==index.settings.homeTabTitle) {
                            getObj.getTab().tabs('close', this);
                        }
                    });
                });
            },
            //响应菜单关闭的右键事件
            TabCloseEvent: function () {
                var tabmm = '#tab-mm';
                //刷新
                $('#tab-mm-update').click(function () {
                    var currTab = $(tabId).tabs('getSelected'),
                        url = currTab.find("iframe").attr("src"),
                        currtabTitle = $(tabmm).data("currtabTitle");
                    index.Tabs.RefreshTab({ tabTitle: currtabTitle, url: url });
                });
                // 关闭当前
                $('#tab-mm-close').click(function () {
                    var currtabTitle = $(tabmm).data("currtabTitle");
                    $(tabId).tabs('close', currtabTitle);
                });
                //全部关闭
                $('#mm-tabcloseall').click(function () {
                    var tab = $(tabId);
                    $('.tabs-inner span', tab).each(function (i, n) {
                        tab.tabs('close', $(n).text());
                    });
                });
                //关闭除当前之外的TAB
                $('#mm-tabcloseother').click(function () {
                    var currtabTitle = $(tabmm).data("currtabTitle"),
                        tab = $(tabId);
                    $('.tabs-inner span', tab).each(function (i, n) {
                        var t = $(n).text();
                        if (t !== currtabTitle)
                            tab.tabs('close', t);
                    });
                });
                //关闭当前右侧的TAB
                $('#mm-tabcloseright').click(function () {
                    var tab = $(tabId);
                    var nextall = $('.tabs-selected', tab).nextAll();
                    if (!nextall.length) {
                        WebJs.Dialog.Tip('后边没有啦~~;');
                        return false;
                    }
                    nextall.each(function (i, n) {
                        var t = $('a:eq(0) span', $(n)).text();
                        tab.tabs('close', t);
                    });
                    return false;
                });
                //关闭当前左侧的TAB
                $('#mm-tabcloseleft').click(function () {
                    var tab = $(tabId);
                    var prevall = $('.tabs-selected', tab).prevAll();
                    if (prevall.length === 0) {
                        WebJs.Dialog.Tip('到头了，前边没有啦~~');
                        return false;
                    }
                    prevall.each(function (i, n) {
                        var t = $('a:eq(0) span', $(n)).text();
                        tab.tabs('close', t);
                    });
                    return false;
                });
                // 退出
                $("#tab-mm-exit").click(function () {
                    $(tabmm).menu('hide');
                });
            },
            //刷新tab对应的页面
            RefreshTab: function (cfg) {
                cfg = cfg || {};
                var refreshTab = cfg.tabTitle ? $(tabId).tabs('getTab', cfg.tabTitle) : $(tabId).tabs('getSelected');
                if (refreshTab && refreshTab.find('iframe').length > 0) {
                    var refreshIframe = refreshTab.find('iframe')[0],
                        //取得URl
                        refreshUrl = cfg.url ? cfg.url : refreshIframe.src;
                    refreshIframe.contentWindow.location.href = refreshUrl;
                }
            },
            //当tab被选中的时候 左边导航也要选择相应的选项
            OnSelect: function (title) {
                var currTab = getObj.getTab().tabs('getTab', title),
                    iframe = $(currTab.panel('options').content),
                    parentText = iframe.attr('parentText'), //取得parentText
                    fullText = parentText && "undefined" !== parentText ? parentText + '>>' + title : title;
                setMainTitle(fullText); //设置导航显示信息
                parentText && $(accordion).accordion('select', parentText); //选中左边的导航栏
            },
            CloseTab: function (which) { //which index or title, if  which is  null close current selectd tab
                var tabEl = getObj.getTab();
                //关闭指定的tab
                which && tabEl.tabs('close', which);
                //没有指定，关闭当前的Tab
                which || tabEl.tabs('close', tabEl.tabs('getTabIndex', tabEl.tabs('getSelected')));
            },
            //获取打开的所有tabs
            GetTabTitles: function () {
                var titles = [],
                    tabs = getObj.getTab().tabs('tabs');
                $.each(tabs, function () { titles.push($(this).panel('options').title); });
                return titles;
            }
        };
    })();

    wj.AdminIndex = index;
})(WebJs || {});