/*
 * 中文 语言包
 */
 export default{
   public:{
     bal:'余额'
   },
   toast:{
     message1:'合约调起中',
     message2:'操作成功',
     message3:'转账调起中',
     message4:'请输入买入金额',
     message5:'余额不足',
     message6:'余额不足',
     message7:'北京时间1.10日22:00开放领取'
   },
   header:{
     home:'首页',
     pools:'矿池',
     bonds:'债券',
     about:'关于'
   },
   page:{//首页
     priceTitle:'当前价格',
     numTitle:'发行总量',
     numTitle2:'流通量',
     fooTitle:'欢迎来到Apsis!',
     fooText:'通过APC交易购买、出售，并提供Apsis Cash和Apsis Share(HBG)流动性',
     next:'Rebase',
     fivePrice:'五分钟均价'
   },
   pools:{
     reward:'收益明细',
     claim:'全部领取',
     reward2:'收益',
     make:'做市',
     trade:'交易',
     liquidity:'资金池',
     pick:'选择矿池',
     pickMes:'通过提供流动性来获取APC',
     fooTitle:'购买和赎回债券',
     fooText:'随时赚取收益',
   },
   bonds:{
     price:'价格',
     over:' 大于 ',
     less:' 小于 '
   },
   about:{
     title:'Apsis:一种基算法型稳定币数字货币系统',
     intr:'简介',
     remark:'<p>Apsis是去中心化的、严格执行协议算法，且不需要人为干预的算法型稳定币。</p>'
     + '<p class="title">Apsis架构</p>'
     + '<ul>'
     + '<li><span></span>Apsis Cash(APC)</li>'
     + '<li><span></span>Apsis Bond(APB)</li>'
     + '<li><span></span>Apsis Share(HBG)</li>'
     + '<li><span></span>Rebase</li>'
     + '</ul>'
     + '<p class="title">Apsis Cash(APC)</p>'
     + '<p>APC是算法稳定币, 通过算法协议算法，根据代币汇率变化弹性供给的稳定币。目标价值 1 APC=1美元，其价格的伸缩旨在维持与美元的挂钩。</p>'
     + '<p class="title">Apsis Bond(APB)</p>'
     + '<p>APB是债券币。债券币自身并不挂钩任何货币，每一枚债券币都可以在未来回锚的情况下抵作1枚APC。</p>'
     + '<p>每次Rebase时，当APC价格低于1美元时，用户可以打折购买到APB债券币。</p>'
     + '<p>1 APB = APC price ^ 2 (APC价格的平方)。购买债券的APC被当场销毁, 减少APC供给。</p>'
     + '<p>用户持有的Apsis Bond，可以在APC高于1.05美元的时候，按 1:1的比例，赎回APC, 从而获得至少5%以上的利润。</p>'
     + '<p class="title">Apsis Share(HBG)</p>'
     + '<p>Apsis不再单独发行治理币，将对应权利赋予HBG，HBG因此可以获得系统通胀周期增发的5%的APC奖励。</p>'
     + '<p class="title">Rebase</p>'
     + '<p>Apsis系统暂时设定8小时一个周期。即每8小时进行一次rebase动作。系统根据当前的市场情况, 选择增发APC或发行APB(销毁APC)。</p>'
     + '<ul>'
     + '<li><span></span>稳定周期：当APC价值介于1～1.05美元之间时, 说明APC价值，符合市场需求。rebase什么也不用做。</li>'
     + '<li><span></span>扩张周期：当APC价值高于1.05美元的时候, 系统将增发数量为 supply * (oracle_price - 1.05) 的APC, 通胀APC95%发放APC/USDT的LP持有者，5%给到HBG/EOS的LP持有者。</li>'
     + '<li><span></span>收紧周期：当APC价值低于1美元的时候, 系统将发行数量为 supply * (1 - oracle_price) / oracle_price 的APB, 用户可以用APC打折买入APB (折扣力度相当于当前APC负溢价的百分比，APB价格等于APC价格的平方。) 买入债券的APC将被销毁, 减少了APC的市场供应, 促进APC的价值回归。 </li>'
     + '</ul>'
     + '<p>用户买入的APB债券，可以在APC价值达到1.05美元后, 按1:1兑换回 APC。</p>'
     + '<p class="title">初始流动性和流动性挖矿</p>'
     + '<p>APC的初始流动性为: 5000 APC / 5000 USDT。</p>'
     + '<p class="title">挖矿规则</p>'
     + '<p>2021年1月9号 北京时间晚上10:00，启动Apsis系统，开启1小时一个周期的Rebase。用户可以交易APC。如果APC上涨，rebase后，会增发APC，增发的APC，积累到挖矿账号，等待挖矿阶段启动后分发。</p>'
     + '<p>2021年1月10号 北京时间晚上10:00，启动APC挖矿。</p>'
     + '<p>每次通胀的APC将会分发到2个奖励池，95%给到APC+USDT的LP持有者，5%给到HBG+EOS的LP持有者。</p>'
     + '<p>奖励的APC将平均成336小时每秒发放给对应LP持有者。</p>'
     + '<p>每次通胀，APC+USDT的LP持有者挖矿奖励 = 通胀的APC数量 * 0.95 / (86400 * 14) * LP占比 * 做市的秒数</p>'
     + '<p>每次通胀，HBG+EOS的LP持有者挖矿奖励 = 通胀的APC数量 * 0.05 / (86400 * 14) * LP占比 * 做市的秒数</p>'
     + '<p class="title">参与方式</p>'
     + '<p>2021年1月9号 北京时间下午10:00后。做市APC+USDT或者HBG+EOS，即可自动加入矿池，开启APC挖矿，无需其它任何操作。</p>'
     + '<p class="title">领取规则</p>'
     + '<p>用户需要主动领取。</p>'
     + '<p>收益被领取后，做市累计时长自动清零，收益重新计算。</p>'
     + '<p>未领取部分奖励，不受池子余额影响，任何情况下都不会减少，可以放心的在任何时候领取。</p>'
     + '<p>收益小于0.0001 APC将不可领取</p>'
     + '<p class="title">治理规划</p>'
     + '<p>我们将社区治理权益都赋予HBG持有者。HBG的持有者未来可以参与Apsis的治理，如扩张周期的APC最大发行量、APB债券的最大发行量等。</p>'
     + '<p>选择HBG，是因为HBG将建立一个完全去中心化的金融网络，无需信任成本、代码即法律、所有信息都是公开和透明的。从而降低投机属性，且HBG参与者可以获得通胀奖励。</p>'
     + '<p class="title">免责声明</p>'
     + '<p>本文档只用于传达信息，并不构成投资本项目的相关意⻅。本文档不构成也不理解为提供任何买卖行为，也不是任何形式上的合约或承诺。一旦参与项目即表示了解并接受该项目⻛险，并愿意为此承担一 切相应后果，Apsis以及HBG Inc.明确表示不承担任何参与本项目所造成的直接或间接的损失。</p>'
     + '<p>HBG死而复生，众星之心。Apsis稳定币之战，当放手一搏。   ---干将·莫邪</p>'
     + '<p>献给(那些)曾经热爱区块链世界，信仰代码即法律，并和这个世界的伙伴们一同度过时光的人们。</p>'
     + '<p>此刻，让我们再度欢聚，集结在HBG！</p>'
     + '<p>新年快乐！</p>'
     + '<p style="text-align:right;">------ By 打工人.饭来.板烧鸡腿堡  2021.1.8</p>'
   },
   popup:{
     purchase:'买入',
     cancel:'取消'
   }
 }
