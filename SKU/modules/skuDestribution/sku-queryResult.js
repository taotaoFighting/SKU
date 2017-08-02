			var $util = new _util();
			mui.init();
			mui.plusReady(function(){
				var self = plus.webview.currentWebview();
				var param = self.queryData;
				var title = self.title;
				var pageNo = 1;
				var pageSize = 20;
				sessionStorage.setItem('param',param);
				var load = new Loading();
				cola(function(model){
				console.log('title = '+ title)
				model.set('title',title);
				cola.Provider.prototype.translateResult = function(result, invokerOptions) {
					
					var data = result;
					
//					console.log(JSON.stringify(data))
							if(data.status == "300"){
								mui.toast('无效索引',{ duration:'short', type:'div' });
//								return ;
							}
							var dataList = data.dataList; 
							if(dataList.length == 0){
								mui.toast('暂无数据',{ duration:'short', type:'div' });
//								return;
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
							
							console.log(JSON.stringify(sitems));
							model.set('tmpDataArrs',sitems);
							
							for(i = 0 ; i < sitems.length ; i++){
								var objs = sitems[i];
								for(j = 0 ; j < objs.length ; j++){
									tmpItms.push(objs[j]);
								}
							}
							
							//model.set("items",tmpItms);
							console.log(JSON.stringify(tmpItms));
							
						result = {
							        $entityCount: 20000,
							        $data: tmpItms
							     };
						pageNo++;
						return  result;
				}
				
				model.set("titles", ["SKU", "采购订单号", "订单交期","订单数", "波段", "工厂","入库日期","入库数","工厂发货数","未入库数"]);
				var load = new Loading();
				model.describe("items",{
					provider:{ 
						beforeSend:function(self,arg){
							load.init();
							load.start();
							arg.options['contentType'] = 'application/json;charset=UTF-8';
							arg.options['data'] = JSON.stringify(param);
							arg.options['url'] = $util.reqUrl() + 'board/product_distribution/list?pageSize='+pageSize+'&pageNo='+pageNo
//							console.log(JSON.stringify(arg.options));
						},
						method:"POST",
						url:'http://192.168.3.107:8080/scmmk/rest/mobile/board/product_distribution/list?pageSize=20&pageNo='+pageNo,
						pageSize:20,
						success:function(arg){
							load.stop();
							
						},
						error:function(){
							load.stop();
							
						}
					}
				});
				
				model.widgetConfig({
		            queryList: {
		                $type: "listView",
		                bind: "item in items",
		                height:window.screen.height - 110,
		                autoLoadPage:true,
		                getItemTemplate: function(arg) {
		                	if(!arg.item.get('WAVE_NAME')){
		                		return 'titleRow'
		                	}
		                	console.log(JSON.stringify(arg.item))
		                    return "row";
		                }
		            },
					titles: {
		                $type: "label", 
		                width:window.screen.width*3.5/5,
		                text: "{{title}}",
		            }
	        	});
				
			});
				});
			