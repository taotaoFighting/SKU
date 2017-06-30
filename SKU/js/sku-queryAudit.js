
			var $util = new _util();
			mui.init();
			cola(function(model){
				
//				alert(window.screen.width)
				$('#queryList').css("font-size",(window.screen.width/375.0)*12);
				model.action({
					itemClick:function(self,arg){
						var receiptStatus = arg.item.get("receiptStatus");
						var storageWay = arg.item.get("storageWay");
						arg.item.set("receiptStatus",model.action.transformCode(arg.item));
						arg.item.set("storageWay",model.action.transfromStorageWay(arg.item));
						console.log(receiptStatus + storageWay)
						mui.openWindow({
						    url: 'sku-auditDetial.html', 
						    id:'auditDetial',
						    extras:{
						        data: arg.item,//扩展参数
						        receiptStatus:receiptStatus,
						        storageWay:storageWay
						    }
						 });
					},
					transformCode:function(item){
						var receiptStatus = "";
						model.get("DelOrderStatus").each(function(e){
							if(item.get("receiptStatus") == e.get("enumvCode")){
								receiptStatus = e.get("enumvName");
							}
						})
						return receiptStatus;
					},
					transfromStorageWay:function(item){
						var storageWay = "";
						model.get("StorageWay").each(function(e){
							if(item.get("storageWay") == e.get("enumvCode")){
								storageWay = e.get("enumvName");
							}
						})
						return storageWay;
					}
				});
				
				mui.plusReady(function(){
				var self = plus.webview.currentWebview();
				var param = self.queryData;
				model.set("StorageWay",self.StorageWay);
				model.set("DelOrderStatus",self.DelOrderStatus);
				param["pageSize"]="20";
				param["pageNo"]="1";
				var load = new Loading();
				load.init();
				load.start();
				$util._ajaxJSON({
						url: "board/delivery_note/header/list",
						data: param,
						//返回数据的格式
						success: function(data) {
							model.set("items",data.data.entities); 
							load.stop();
							if(data.data.entities.length == 0){
								mui.toast("无搜索结果！",{ duration:'short', type:'div' });
							}
						},
						//调用出错执行的函数
						error: function(e) {
							//请求出错处理
							console.log(JSON.stringify(e));
							load.stop();
						}
					});
				});
				
				model.widgetConfig({
		            queryList: {
		                $type: "listView",
		                bind: "item in items",
		                height:window.screen.height - 54,
		                pullUp:true, 
		                pullStep: function(arg) {
		                    $("#divPullUp").text((arg.distance < arg.theshold) ? "继续上拉加载更多" : "释放以刷新");
		                },
		                pullComplete: function(self,arg) {
		                    $("#divPullUp").text("正在加载...");
		                    console.log("正在加载")
		                    
		                    arg.done();
		                    
		                },
		                getItemTemplate: function(arg) {
		                    return "row";
		                }
		            }
	        	});
			});