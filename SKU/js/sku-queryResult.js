			var $util = new _util();
			mui.init();
			cola(function(model){
				model.set("titles", ["SKU", "采购订单号", "订单交期","订单数", "波段", "工厂","入库日期","入库数","工厂发货数","未入库数"]);
				mui.plusReady(function(){
				var self = plus.webview.currentWebview();
				var param = self.queryData;
				var load = new Loading();
				load.init();
				load.start();
				$util._ajaxJSON({
						url: "board/product_distribution/list",
						data: param,
						success: function(data) {
							load.stop();
//							model.set("items",data.dataList);
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
								var title = e["SUPPLIER_NAME"]+","+e["WAVE_NAME"];
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
								var title = e["SUPPLIER_NAME"]+","+e["WAVE_NAME"];
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
									tmpItms.push(objs[j]);
								}
							}
							
							model.set("items",tmpItms);
						},
						//调用出错执行的函数
						error: function(e) {
							//请求出错处理
							load.stop();
						}
					});
				});
				
				model.widgetConfig({
		            queryTable: {
		                $type: "table",
		                bind: "item in items",
		                showHeader: false, 
		                height:window.screen.height - 100, 
		                columns: [{
		                    bind: ".SKU",
		                    caption: "SKU",
		                    align: "center",
		                }, {
		                    bind: ".PO_CODE",
		                    caption: "采购订单号",
		                    align: "center"
		                }, {
		                    bind: ".PO_DELIVERY_DATE",
		                    caption: "订单交期",
		                    align: "center"
		                }, {
		                    bind: ".PO_AMOUNT",
		                    caption: "订单数",
		                    align: "center"
		                }, {
		                    bind: ".WAVE_NAME",
		                    caption: "波段",
		                    align: "center"
		                },{
		                    bind: ".SUPPLIER_NAME",
		                    caption: "工厂",
		                    align: "center",
		                }, {
		                    bind: ".RECEIVED_DATE",
		                    caption: "入库日期",
		                    align: "center"
		                }, {
		                    bind: ".RECEIVED_AMOUNT",
		                    caption: "入库数",
		                    align: "center"
		                }, {
		                    bind: ".PACKED_AMOUNT",
		                    caption: "工厂发货数",
		                    align: "center"
		                }, {
		                    bind: ".UN_RECEIVED_AMOUNT",
		                    caption: "未入库数",
		                    align: "center"
		                }]
		            },
					titles: {
		                $type: "label", 
		                width:window.screen.width*3.5/5,
		                text: "{{title}}",
		            }
		        });
			});