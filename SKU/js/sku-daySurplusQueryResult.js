			var $util = new _util();
			mui.init();
			cola(function(model){
				model.set("titles", ["日期", "品牌", "最大限额","限额单位", "收获量", "剩余量"]);
				mui.plusReady(function(){
				var self = plus.webview.currentWebview();
				var param = self.queryData;
				var load = new Loading();
				load.init();
				load.start();
				$util._ajaxJSON({
						url: "board/storage_daily_ceiling/list",
						data: param,
						success: function(data) {
							load.stop();
							if(data.status == "300"){
								mui.toast("无效索引！",{ duration:'short', type:'div' });
								return;
							}
							var dataList = data.dataList;
							var tmpItms = [];
							var titles = [];
							for(k = 0 ; k < dataList.length ; k++){
								var e = dataList[k];
								var title = e["CUSTOMER_NAME"];
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
								 sitems.push([{"LIMITED_DATE":titles[i]}]);
							}
							
							for(k = 0 ; k < dataList.length ; k++){
								var e = dataList[k];
								var title = e["CUSTOMER_NAME"];
								for(i = 0 ; i <sitems.length ; i ++){
									var titleObj = sitems[i][0];
									if(titleObj["LIMITED_DATE"] == title){
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
		                    bind: ".LIMITED_DATE",
		                    caption: "日期",
		                    align: "center",
		                }, {
		                    bind: ".BRAND",
		                    caption: "品牌",
		                    align: "center"
		                }, {
		                    bind: ".CEILING",
		                    caption: "最大限额",
		                    align: "center"
		                }, {
		                    bind: ".LIMITED_UNIT",
		                    caption: "限额单位",
		                    align: "center"
		                }, {
		                    bind: ".USED_CEILING",
		                    caption: "收货量",
		                    align: "center"
		                },{
		                    bind: ".UNUSED_CEILING",
		                    caption: "剩余量",
		                    align: "center",
		                }]
		            },
					titles: {
		                $type: "label", 
		                width:window.screen.width*1.49/5,
		                text: "{{title}}",
		            }
		        });
			});