

			var $util = new _util();
			mui.init();
			cola(function(model){
				mui.plusReady(function(){
				var self = plus.webview.currentWebview();
				model.set("storageWay",self.storageWay);
				model.set("receiptStatus",self.receiptStatus);
				model.set("data",self.data);
				if(self.receiptStatus == "02"){comeTime
					cola.widget("auditButton").set("disabled",true);
					
				}
				
				if(self.receiptStatus == "01"){comeTime
					cola.widget("comeTime").set("disabled",false);
					
				}
				
					$util._ajaxJSON({
						url: "board/PrOrderStatus/list",
						success: function(data) {
						console.log(JSON.stringify(data))
							for(var i = 0;i<data.dataList.length;i++){
								if(model.get('data').get('productionOrderStatus') == data.dataList[i]['ENUMV_CODE']){
									model.get('data').set('productionOrderStatus',data.dataList[i]['ENUMV_NAME']);
									break;
								}
							}
						},
						//调用出错执行的函数
						error: function(e) {
							//请求出错处理
						}
					});
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
						var jsonData = model.get("data").toJSON();
						delete jsonData['productionOrderStatus'];
						delete jsonData['customerCode'];
						delete jsonData['customerName'];
						jsonData["storageWay"] = model.get("storageWay");
						jsonData["receiptStatus"] = model.get("receiptStatus");
						console.log(JSON.stringify(jsonData))
						$util._ajaxJSON({
								url: "board/delivery_note/header/approve",
								data:jsonData,
								success: function(data) {
									console.log(JSON.stringify(data))
									if(data.msg == "success"){
										cola.widget("auditButton").set("disabled",true);
										model.get("data").set("receiptStatus","审批通过");
										//正常情况
										mui.toast('审批成功',{ duration:'short', type:'div' });
										cola.widget("auditButton").set("disabled",true);
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
									mui.toast('出错了！',{ duration:'short', type:'div' });
								}
							});
						
						//剩余量不足情况
					}
				});
			});