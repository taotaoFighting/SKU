            var $util = new _util();
			mui.init();
			cola(function(model){
				model.set("titles", ["波段", "订单数", "工厂发货数", "入库数", "未入库数"]);
				
//				alert(window.screen.width)
				$('#queryList').css("font-size",(window.screen.width/375.0)*12);
				mui.plusReady(function(){
				var self = plus.webview.currentWebview();
				var param = self.queryData;
				var load = new Loading();
				load.init();
				load.start();
				$util._ajaxJSON({
						url: "board/received_plan/list",
						data: param,
						success: function(data) {
							if(data.status == "300"){
								mui.toast('无效索引',{ duration:'short', type:'div' });
								load.stop();
								return ;
							}
							load.stop();
							var dataList = data.dataList; 
							if(dataList.length == 0){
								mui.toast('暂无数据',{ duration:'short', type:'div' });
								return;
							}
							var tmpItms = [];
							var titles = [];
							for(k = 0 ; k < dataList.length ; k++){
								var e = dataList[k];
								var title = e["CUSTOMER_NAME"]+e["BRAND_NAME"]+e["YEARS_CODE"]+e["QUARTER_NAME"];
								e["PO_AMOUNT"] = "" + e["PO_AMOUNT"];
								e["PACKED_AMOUNT"] = "" + e["PACKED_AMOUNT"];
								e["RECEIVED_AMOUNT"] = "" + e["RECEIVED_AMOUNT"];
								e["UNRECEIVED_AMOUNT"] = "" + e["UNRECEIVED_AMOUNT"];
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
								var title = e["CUSTOMER_NAME"]+e["BRAND_NAME"]+e["YEARS_CODE"]+e["QUARTER_NAME"];
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
							console.log(JSON.stringify(sitems))
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
						
						var e = items[0];
						
						return e["CUSTOMER_NAME"]+","+e["BRAND_NAME"]+","+e["YEARS_CODE"]+","+e["QUARTER_NAME"];
					}
				});
				
				model.widgetConfig({
		            queryList: {
		                $type: "listView",
		                bind: "items in itemes",
		                getItemTemplate: function(arg) {
		                    return "row";
		                }
		            },
			        labelRow: {
						$type:"table",
						bind: "i in item",
						showHeader: true,
						renderRow: function(self, arg) {
						},
						columns: [{
							align:"center",
							caption:"{{item.WAVE_NAME}}",
							height:"1"
						}, {
							align:"center",
							caption:"{{item.PO_AMOUNT}}"
						}, {
							align:"center",
							caption:"{{item.PACKED_AMOUNT}}"
						}, {
							align:"center",
							caption:"{{item.RECEIVED_AMOUNT}}"
						}, {
							align:"center",
							caption:"{{item.UNRECEIVED_AMOUNT}}"
						}]
					},
					titles: {
		                $type: "label",
		                width:window.screen.width*0.975/5,
		                text: "{{title}}",
		            }
	        	});
			});