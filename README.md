# 任务系统

## 目录

* [CSS](#css)
  * [公用CSS](#baseCss)
* [JS](#js)
  * [公用JS](#commonJs)
  * [JS中的数据处理](#dataProcessing)
* [任务系统翻页组件](#pager)
* [具体页面](#pages)
  * [任务详情页](#taskInfo)
*   [兼容性](#fit)
* [个人尝试](#try)
  *   [localCache](#localCache)
* [一些想法](#thoughts)

<h2 name="css" id="css">CSS</h2>

<h3 nmae="baseCss" id="baseCss">公用CSS</h3>

`wiki-task: static/taskBase/taskBase.lesstaskBase.less`，其中包含一些任务系统常用的_css库（属性命名简写）_、_一些组件的样式（翻页、任务卡片）_、_动画_等。基本所有文件都引用了_taskBase.less_。

其中，__组件样式__包括：
*翻页
*任务卡片
*搜索框（部分页面用到，例如任务列表页.而有些页面例如编辑记录页用的又不是这个，这也算是此样式失败之处）

__动画效果__包括：
*卡片浮起+boxShadow(.tra-boxShadow) \_eg.任务卡片用
*浮起+旋转(.tra-rotate) \_eg.首页任务达人
*右上角卷角(.tra-curlRight) \_eg.首页推荐任务中的大图（希望能抽时间扩展为各个方向都可）
*抖动(.ani-buzzOut)
*loading(.loading) \_eg.页面向后台异步请求数据时的loading动画
*其他


<h2 name="js" id="js">JS</h2>

<h3 name="commonJs" id="commonJs">公用JS</h3>

`wiki-task: widget/taskUtil/taskUtil.js`，文件中扩展了Jsmart的一些调节器（_rawurlencode_、_date\_format_），以及一些公用方法：

  TaskUtil.radio(elemArr, className, callback) //用于一些选项卡切换，radio这个名字起得好像稍烂
  TaskUtil.removeDesc(arr) //调用lemmaInput插件的getLemmas方法后，返回的数据包含lemmaDesc，有时需去除
  (此方法有必要放在taskUtil中吗？~)

<h3 name="dataProcessing" id="dataProcessing">JS中的数据处理</h3>

采用每次异步请求_COUNT（default: 5）_页数据的方式，在翻页（或切换tab）时，会先查找本地数据，若有，直接渲染，否则，再请求。
每页均有一个_pageData_变量，用于存储数据，具体格式如下：

  var pageData = {
    // 热门
    hot: {
      initialized: false,
      pages: {},
      data: [],
      total: 0,
      extData: {} // 如果需要
    },
    // 入门
    simple: {
      initialized: false,
      pages: {},
      data: [],
      total: 0
    },
    // 进阶
    advanced: {
      initialized: false,
      pages: {},
      data: [],
      total: 0
    },
    // 高奖励
    complicated: {
      initialized: false,
      pages: {},
      data: [],
      total: 0
    }
  }

具体处理方法的话就是每个js文件中的_goAjax_函数了，之所以将ajax写成一个函数纯粹是因为代码中会多次用到，只是起个简化代码的作用。现在看来，在例如_任务列表页_这类只有一个htmlWrap和一个tpl模板的页面，会比较好用，当出现多处需要渲染内容时，就会有点尴尬（例如任务详情页\_taskInfo.js, 我目前的处理是写了两个goAjax函数~~）。后期如果再继续优化的话，我觉得可能得把_goAjax_函数再做拆分，或者数据处理、html渲染写成一个类。以上因为个人能力有限，做的不够优秀，希望后期能够改进。

此示例取自_wiki-task: static/taskList/taskList.js_，此文件可作为整体JS数据及逻辑处理的一个例子。

<h2 name="pager" id="pager">任务系统翻页组件</h2>

1.任务系统翻页组件使用了自定义模板(_wiki-task: widget/taskPager/taskPager.tpl_)
2.跳到指定页功能需引入taskUtil的jumpToTargetPage方法（支持enter快捷键），代码如下：
  
  var TaskUtil = require('wiki-task:widget/taskUtil/taskUtil.js');
  var pager = new Horpager({...});
  TaskUtil.jumpToTargetPage(pager);

3.其css在wikiBase.less(_wiki-task: static/taskBase/taskBase.lesstaskBase.less_)中，是以`pager-type="tpager"`为选择器的，所以创建dom时请加上此属性

<h2 name="pages" id="pages">具体页面</h2>

<h3 name="taskInfo" id="taskInfo">任务详情页</h3>

_任务词条_和_我的参与进度_处的数据更新，页面渲染，分别由_lemmaAjax()_和_progressAjax()_控制;

领取、放弃词条的一些细节：
  *在“任务词条”处_领取词条_，领取成功后，设置该词条的样式、更新本地的“任务词条”相关数据、“我的参与进度”处刷新
  *在“我的参与进度”处_放弃词条_，放弃成功后，刷新“我的参与进度”和“任务词条”

_我的参与进度_处的剩余编辑时间逻辑如下：
  1. 主体思路setInterval函数每秒剩余时间-1；
  2. 由于leftTime数据是用的本地JS存储的数据，所以得手动更新本地数据。否则，后果可能是翻到第2页，再翻回第1页，计时又回到最初的状态，因为没有ajax请求，数据没有刷新
  3. 由于并不是每一个进度都有剩余时间，所以剩余时间数组(lt)与本地数据(pageData.undone.pages)之间的对应关系就可能有误差，故在渲染_我的参与进度_的时候，多了个_serial_属性，用来对应此剩余时间在本地数据中的位置(`<div class="restTime" serial="1" leftTime="6467">`)
  4. 计算编辑剩余时间的函数_editRestTime()_主要干两件事：1.初始化lt数组，2.setInterval
  5. 在ajax请求、翻页、tab切换（未完成/已完成之间）时，会再次调用_editRestTime()_
  6. 在_editRestTime()_函数内部，会自动完成清除上一次interval的工作，避免内存泄漏
  7. 最终，编辑剩余时间的计算还是会跟服务器有所误差（本地慢于服务器），个人理解可能是因为：1.setInterval本身不精确（测试过，就算什么都不干，过一会儿刷新页面本地剩余时间也会比服务器上多~），2.在翻页、切tab等操作时，此时会清除上一次的interval并重新初始化（有一定的耗时）等的原因

<h2 name="fit" id="fit">兼容性</h2>

1.所有的loading动画的兼容性还没解决（因为用的CSS3动画）
2.t-separator 的设置思路和兼容性有（ie7以下）问题，应该像百科首页那样

<h2 name="try" id="try">个人尝试</h2>

<h3 name="localCache" id="localCache">localCache</h3>

处理了许多页面的本地数据存储、页面渲染之后，发现这一部分的代码相似性很大。想写成一个统一的类，方便管理、修改、节省代码（位于_wiki-task:widget/localCache/localCache.js_，使用示例为_wiki-task:widget/localCache/taskList.js_）。但写完才发现，所做的事情不过是把所有相似的代码写在一起而已~用起来显得没有逻辑性，自己也觉得不是滋味~最后还是放弃了~

_wiki-task:widget/localCache/taskList.js_下的taskList.js能实现taskList页的所有功能，且没有bug.（对应的html上得稍微有所修改）

并没有删除其代码，主要想着有可能对后面的人还有点用~
你要觉得没用就删了吧

<h2 name="thoughts" id="thoughts">一些感想</h2>

希望有人能真理下数据处理、页面渲染这块儿啊，不然每次有统一的改动，所有的页面都得改，很没效率啊~Orz


## Change Logs

### 移除 localCache 类

### TaskUtil 下的 jumpToTargetPage 方法改用 TaskPager 类（继承自 Horpager）扩展实现，并在该类中指定使用的分页模板，减轻脚本代码量，pager 样式从 base 中移出