

			var $util = new _util();
			mui.init();
			cola(function(model){
				mui.plusReady(function(){
				var self = plus.webview.currentWebview();
				model.set("storageWay",self.storageWay);
				model.set("receiptStatus",self.receiptStatus);
				model.set("data",self.data);
				if(self.receiptStatus == "02"){
					cola.widget("auditButton").set("disabled",true);
				}
				}); 
				
				model.action({
					detial:function(){
						mui.openWindow({
						    url: 'sku-boxDetail.html', 
						    id:'boxDetial',
						    extras:{
						        receiptCode:model.get("data").get("receiptCode") //扩展参数
						    }
						 }); 
					},
					purchaseDetial:function(){
						mui.openWindow({
						    url: 'sku-purchaseOrder.html', 
						    id:'purchaseOrder',
						    extras:{
						        receiptCode:model.get("data").get("receiptCode"), //扩展参数
						        queryData:{
						        	productionOrderCode:model.get("data").get("productionOrderCode"),
						       		poCode:model.get("data").get("poCode")
						        }
						    }
						 }); 
					},
					passWay:function(){
						
						model.get("data").set("storageWay",model.get("storageWay"));
						model.get("data").set("receiptStatus",model.get("receiptStatus"));
						$util._ajaxJSON({
								url: "board/delivery_note/header/approve",
								data:JSON.stringify(model.get("data")),
								success: function(data) {
									console.log(JSON.stringify(data))
									if(data.msg == "success"){
										cola.widget("auditButton").set("disabled",true);
										//正常情况
										mui.toast('审批成功',{ duration:'short', type:'div' });
									}else{
										mui.confirm("剩余可收货数量小于当前交货单的数量，超出xxx,请确认是否继续审批","注意",function(value){
										if(value.index == 1){
											
										}else{
											
										}
									},"div");
									}
								},
								//调用出错执行的函数
								error: function(e) {
									//请求出错处理
								}
							});
						
						//剩余量不足情况
					}
				});
			});