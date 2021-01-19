/*
 * English language Pack
 */
 export default{
   public:{
     bal:'balance'
   },
   toast:{
     message1:'Contract is being transferred',
     message2:'Successful operation',
     message3:'Transferring funds',
     message4:'Please enter the purchase amount',
     message5:'Insufficient balance',
     message6:'Insufficient balance',
     message7:'Open for collection at 22:00 on 1.10, Beijing time'
   },
   header:{
     home:'Home',
     pools:'Pools',
     bonds:'Bonds',
     about:'About'
   },
   page:{//首页
     priceTitle:'Current Price',
     numTitle:'Circulating supply',
     numTitle2:'Total supply',
     fooTitle:'Welcome to Apsis!',
     fooText:'Buy,sell,and provide liquidity for used cash and APC shares one hamburger swap.',
     next:'Next Epoch',
     fivePrice:'5-min Avg'
   },
   pools:{
     reward:'Rewar Details',
     claim:'Claim All',
     reward2:'Reward',
     make:'Select',
     trade:'Trade',
     liquidity:'Liquidity',
     pick:'Pick a Pool',
     pickMes:'Earn APC Cash by providing liquidity',
     fooTitle:'Buy & Redeem Bonds',
     fooText:'Earn premiums upon redemption',
   },
   bonds:{
     price:'Price',
     over:' is over ',
     less:' less than '
   },
   about:{
     title:'APC: A peer-to-peer decentralized algorithmic stable currency system',
     intr:'Introduction',
     remark:'<p>Apsis is an algorithm-based stablecoin that is decentralized, strictly enforces the protocol algorithm, and does not require human intervention.</p>'
     + '<p class="title">Apsis architecture</p>'
     + '<ul>'
     + '<li><span></span>Apsis Cash(APC)</li>'
     + '<li><span></span>Apsis Bond(APB)</li>'
     + '<li><span></span>Apsis Share(HBG)</li>'
     + '<li><span></span>Rebase</li>'
     + '</ul>'
     + '<p class="title">Apsis Cash(APC)</p>'
     + '<p>APC is an algorithmic stable currency, a stable currency that is flexibly supplied according to the exchange rate of the token through the algorithm protocol algorithm. Target value 1 APC = 1 U.S. dollar, and the expansion of its price aims to maintain the peg to the U.S. dollar.</p>'
     + '<p class="title">Apsis Bond(APB)</p>'
     + '<p>APB is a bond currency. The bond currency itself is not linked to any currency, and each bond currency can be used as an APC in the case of anchoring in the future.</p>'
     + '<p>Every time when rebase, when the APC price is less than $1, users can buy APB bond coins at a discount.</p>'
     + '<p>1 APB = APC price ^ 2 (the square of the APC price). The APC purchased for the bond is destroyed on the spot, reducing the supply of APC.</p>'
     + '<p>The Apsis Bond held by the user can redeem the APC at a ratio of 1:1 when the APC is higher than $1.05, thereby obtaining at least 5% or more of profit.</p>'
     + '<p class="title">Apsis Share(HBG)</p>'
     + '<p>Apsis no longer issues governance coins separately, and assigns the corresponding rights to HBG, so HBG can obtain an additional 5% APC reward for the system inflation cycle.</p>'
     + '<p class="title">Rebase</p>'
     + '<p>The Apsis system temporarily sets a period of 8 hour. That is, a rebase action is performed every 8 hour. According to the current market conditions, the system chooses to issue additional APC or issue APB (destroy APC).</p>'
     + '<ul>'
     + '<li><span></span>Stable cycle: When the value of APC is between 1 and 1.05 US dollars, it indicates that the value of APC meets market demand. No need to do rebase.</li>'
     + '<li><span></span>Expansion cycle: When the value of APC is higher than US$1.05, the system will issue additional supply * (oracle_price-1.05) APC. Inflation APC 95% will be issued to APC/USDT LP holders, and 5% will be given to HBG/EOS LP Holder.</li>'
     + "<li><span></span>Tightening cycle: When the value of APC is less than $1, the system will issue APB with the quantity of supply * (1-oracle_price) / oracle_price, and users can use APC to buy APB at a discount (the discount is equivalent to the percentage of the current negative APC premium , The APB price is equal to the square of the APC price.) The APC bought in bonds will be destroyed, reducing the market supply of APC and promoting the return of APC's value. </li>"
     + '</ul>'
     + '<p>APB bonds purchased by users can be exchanged back to APC at a 1:1 ratio after the value of APC reaches $1.05.</p>'
     + '<p class="title">Initial liquidity and liquidity mining</p>'
     + '<p>The initial liquidity of APC is: 5000 APC / 5000 USDT.</p>'
     + '<p class="title">Mining rules</p>'
     + '<p>On January 9th, 2021, at 10:00 pm Beijing time, the Apsis system will be activated and the Rebase will be activated in a 1-hour cycle. Users can trade APC. If the APC rises, after the rebase, additional APC will be issued, and the additional APC will be accumulated to the mining account and distributed after the mining phase starts.</p>'
     + '<p>On January 10, 2021, at 10:00 pm Beijing time, APC mining will be started.</p>'
     + '<p>Each inflation APC will be distributed to 2 reward pools, 95% will be given to APC+USDT LP holders, and 5% will be given to HBG+EOS LP holders.</p>'
     + '<p>The rewarded APC will be distributed to corresponding LP holders every second for 336 hours.</p>'
     + '<p>For each inflation, the mining reward of APC+USDT LP holders = the number of inflation APC * 0.95 / (86400 * 14) * LP proportion * market-making seconds</p>'
     + '<p>Every time inflation, HBG+EOS LP holder mining reward = inflation APC number * 0.05 / (86400 * 14) * LP proportion * market-making seconds</p>'
     + '<p class="title">Way of participation</p>'
     + '<p>January 9, 2021 after 10:00 pm Beijing time. Market making APC+USDT or HBG+EOS, you can automatically join the mining pool and start APC mining without any other operations.</p>'
     + '<p class="title">Collection rules</p>'
     + '<p>Users need to take the initiative.</p>'
     + '<p>After the income is received, the accumulated market-making time is automatically cleared and the income is recalculated.</p>'
     + '<p>Part of the rewards not received will not be affected by the balance of the pool, and will not be reduced under any circumstances, so you can claim them at any time with confidence.</p>'
     + '<p>Income less than 0.0001 APC will not be received</p>'
     + '<p class="title">Governance planning</p>'
     + '<p>We give all rights to community governance to HBG holders. Holders of HBG can participate in the governance of Apsis in the future, such as the maximum issuance of APC during the expansion cycle and the maximum issuance of APB bonds.</p>'
     + '<p>HBG was chosen because HBG will build a completely decentralized financial network without trust costs, code is the law, and all information is open and transparent. Thereby reducing speculative properties, and HBG participants can obtain inflation rewards.</p>'
     + '<p class="title">Disclaimer</p>'
     + '<p>This document is only used to convey information and does not constitute any relevant intention to invest in this project. This document does not constitute and is not understood to provide any trading behavior, nor is it any form of contract or promise. Once participating in the project, it means that you understand and accept the risks of the project and are willing to bear all the corresponding consequences. Apsis and HBG Inc. clearly stated that they will not bear any direct or indirect losses caused by participating in the project.</p>'
     + '<p>HBG came back from the dead, the heart of the stars. The battle of Apsis stablecoins, let it go. --- Gan Jiang Moxie</p>'
     + '<p>Dedicated to (those) who once loved the blockchain world, believed in the code as the law, and spent time with their partners in this world.</p>'
     + '<p>At this moment, let us get together again and gather in HBG!</p>'
     + '<p>Happy New Year!</p>'
     + '<p style="text-align:right;">------ By hitting the workers. Rice is coming. Grilled Chicken Drumsticks 2021.1.8</p>'
   },
   popup:{
     purchase:'Purchase',
     cancel:'Cancel'
   }
 }
