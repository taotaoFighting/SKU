			var $util = new _util();
			mui.init();
			cola(function(model){
				model.set("titles", ["波段", "目标", "目标SKU数", "欠量", "欠SKU数"]);
				
//				alert(window.screen.width)
				$('#queryList').css("font-size",(window.screen.width/375.0)*12);
				
				mui.plusReady(function(){
				var self = plus.webview.currentWebview();
				var param = self.queryData;
				console.log(JSON.stringify(param))
				var load = new Loading();
				load.init();
				load.start();
				$util._ajaxJSON({
						url: "board/factory_schedule/list",
						data: param,
						success: function(data) {
						console.log(JSON.stringify(data))
							load.stop();
							var dataList = data.dataList;
							if(dataList.length == 0){
								mui.toast('暂无数据',{ duration:'short', type:'div' });
							}
							var tmpItms = [];
							var titles = [];
							for(k = 0 ; k < dataList.length ; k++){
								var e = dataList[k];
								var title = e["SUPPLIER_NAME"];
								e["PO_AMOUNT"] = ""+e["PO_AMOUNT"];
								e["SKU_AMOUNT"] = ""+e["PO_AMOUNT"];
								e["UN_RECEIVED_AMOUNT"] = ""+e["UN_RECEIVED_AMOUNT"];
								e["UN_RECEIVED_SKU_AMOUNT"] = ""+e["UN_RECEIVED_SKU_AMOUNT"];
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
							load.stop();
						},
						//调用出错执行的函数
						error: function(e) {
							//请求出错处理
							console.log(JSON.stringify(e))
							load.stop();
						}
					});
				});
				
//				model.set({
//					itemes:[[{
//						label1:"2",
//						label2:"2",
//						label3:"3",
//						label4:"4",
//						label5:"5"
//					}],[{
//						label1:"1",
//						label2:"2",
//						label3:"3",
//						label4:"4",
//						label5:"5"
//					}]]
//				});
				
				model.action({
					getName:function(items){
						
						return items[0].SUPPLIER_NAME;
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
							caption:"{{item.SKU_AMOUNT}}"
						}, {
							align:"center",
							caption:"{{item.UN_RECEIVED_AMOUNT}}"
						}, {
							align:"center",
							caption:"{{item.UN_RECEIVED_SKU_AMOUNT}}"
						}]
					},
					titles: {
		                $type: "label",
		                width:window.screen.width/5,
		                text: "{{title}}"
		            }
	        	});
			});