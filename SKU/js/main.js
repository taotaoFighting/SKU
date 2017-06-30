
var $util = new _util();
		mui.init({
			swipeBack:false //启用右滑关闭功能
		});
		
		document.addEventListener('plusready',plusReady,false);
		function plusReady(){
			plus.navigator.setStatusBarBackground('#439CF6');
			if(localStorage.getItem("firstLaunch")){
				var param = {userName:localStorage.getItem("userName"),password:localStorage.getItem("passwordDefault")};
				$util._ajaxJSON({
							url: "login",
							//提交的数据
							data: param,
							//返回数据的格式
							success: function(data) {
							},
							//调用出错执行的函数
							error: function(e) {
								//请求出错处理
								console.log(JSON.stringify(e))
							}
						});
			}
		};
		cola(function(model){
			
			model.action({
                
            })
		})
		
		
		function buttonClick(value){
			
			if(value=='交货单审批'){
				mui.openWindow({
					url: './modules/deliveryOrder/sku-audit.html', 
					id:'audit',
					back:{
						imgSrc:"img/assess.png"
					}
				});
			}else if(value == '日收货量维护'){ 
				mui.openWindow({
					url: './modules/deliveryOrder/sku-dayMaintain.html', 
					id:'dayMaintain',
				});
			}else if(value == '日收货量查询'){ 
				mui.openWindow({
					url: './modules/deliveryOrder/sku-daySurplusQuery.html', 
					id:'daySurplusQuery',
				});
			}else if(value == '预计工厂入库情况跟踪'){ 
				mui.openWindow({
					url: './modules/storageTrance/sku-storageTrance.html', 
					id:'storageTrance',
				});
			}else if(value == 'SKU商品分布'){ 
				mui.openWindow({
					url: './modules/skuDestribution/sku-goodsDistribution.html', 
					id:'goodsDistribution',
				});
			}else if(value == '我的关注'){
				mui.openWindow({
					url: './modules/skuDestribution/sku-myFocus.html', 
					id:'myFocus',
				});
			}else if(value == '仓库日交货计划'){
				mui.openWindow({
					url: './modules/dayDeliveryPaln/sku-deliveryPlan.html', 
					id:'deliveryPlan',
				});
			}else if(value == '入库计划&执行情况'){
				mui.openWindow({
					url: './modules/incomePaln/sku-incomePlan.html', 
					id:'incomePlan',
				});
			}
		}