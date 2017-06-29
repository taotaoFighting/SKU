			var $util = new _util();
			mui.init();
			cola(function(model){
				model.set("titles", ["交货单", "工厂", "交期", "订单数", "工厂发货数"]);
				
				$('#queryList').css("font-size",(window.screen.width/375.0)*12);
				
				mui.plusReady(function(){
				var self = plus.webview.currentWebview();
				var param = self.queryData;
				var load = new Loading();
				load.init();
				load.start();
				$util._ajaxJSON({
						url: "board/storage_daily_delivery_plan/list",
						//提交的数据
						data: param,
						//返回数据的格式
						success: function(data) {
							console.log(JSON.stringify(data));
							load.stop();
							if(data.status == "300"){
								mui.toast('无效索引',{ duration:'short', type:'div' });
								return ;
							}
							var dataList = data.dataList; 
							if(dataList.length == 0){
								mui.toast('暂无数据',{ duration:'short', type:'div' });
								return;
							}
							var tmpItms = [];
							var titles = [];
							for(k = 0 ; k < dataList.length ; k++){
								var e = dataList[k];
								var title = e["SUPPLIER_NAME"];
								e["PO_AMOUNT"] = "" + e["PO_AMOUNT"];
								e["PACKED_AMOUNT"] = "" + e["PACKED_AMOUNT"];
								if(titles.length == 0){
									titles.push(title);
								}else{ 
									var count = 0;
									for(i = 0 ; i<titles.length ; i++){
										if(title == titles[i]){
											break;
										}else{
											count++;
										}
										if(count == titles.length){
											titles.push(title);
										}
								}
								}
							}
							
							var sitems = [];
							for(i = 0 ; i < titles.length ; i++){
								 sitems.push([{"SKU":titles[i]}]);
							}
							
							for(k = 0 ; k < dataList.length ; k++){
								var e = dataList[k];
								var title = e["SUPPLIER_NAME"];
								for(i = 0 ; i <sitems.length ; i ++){
									var titleObj = sitems[i][0];
									if(titleObj["SKU"] == title){
										sitems[i].push(e);
									}
								}
							}
							
							for(i = 0 ; i < sitems.length ; i++){
								var objs = sitems[i];
								for(j = 0 ; j < objs.length ; j++){
									if(objs[j]["SKU"]){
										objs.splice(j,1);
									}
								}
							}
							model.set("itemes",sitems);
						},
						//调用出错执行的函数
						error: function(e) {
							//请求出错处理
							console.log(JSON.stringify(e));
						}
					});
				});
				
				model.action({
					getName:function(items){
						
						return items[0].SUPPLIER_NAME;
					}
				});
				
				model.widgetConfig({
		            queryList: {
		                $type: "listView",
		                bind: "items in itemes",
		                highlightCurrentItem:false,
		                getItemTemplate: function(arg) {
		                    return "row";
		                }
		            },
			        labelRow: {
						$type:"table",
						bind: "i in item",
						showHeader: true,
						highlightCurrentItem:false,
						renderRow: function(self, arg) {
						},
						columns: [{
							align:"center",
							caption:"{{item.RECEIPT_CODE}}",
							height:"1"
						}, {
							align:"center",
							caption:"{{item.SUPPLIER_NAME}}"
						}, {
							align:"center",
							caption:"{{item.PO_DELIVERY_DATE}}"
						}, {
							align:"center",
							caption:"{{item.PO_AMOUNT}}"
						}, {
							align:"center",
							caption:"{{item.PACKED_AMOUNT}}"
						}]
					},
					titles: {
		                $type: "label",
		                width:window.screen.width*(2.1)/5,
		                text: "{{title}}",
		            }
	        	});
			});