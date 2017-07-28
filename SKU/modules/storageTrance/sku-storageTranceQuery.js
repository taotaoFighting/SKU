            var $util = new _util();
			mui.init();
				
//				alert(window.screen.width)
				$('#incomeQueryList').css("font-size",(window.screen.width/375.0)*12);
				$('.titleRow').css("font-size",(window.screen.width/375.0)*10);
				mui.plusReady(function(){
					cola(function(model){
					model.set("titles", ["波段", "目标", "目标SKU数", "欠量", "欠SKU数"]);
					var self = plus.webview.currentWebview();
					var param = self.queryData;
					var pageNo = 1;
					var pageSize = 20;
					sessionStorage.setItem('param',param);
					var load = new Loading();
					load.init();
					load.start();
					
					cola.Provider.prototype.translateResult = function(result, invokerOptions) {
							
							console.log(JSON.stringify(result)) ;
							var data = result;
							var dataList = data.dataList;
							
							if(data.status == "300"){
								mui.toast('无效索引',{ duration:'short', type:'div' });
								return [] ;

							}
							if(dataList.length == 0){
								mui.toast('暂无数据',{ duration:'short', type:'div' });
							}
							var tmpItms = [];
							var titles = [];
							for(k = 0 ; k < dataList.length ; k++){
								var e = dataList[k];
								var title = e["SUPPLIER_NAME"];
								e["PO_AMOUNT"] = ""+e["PO_AMOUNT"];
								e["SKU_AMOUNT"] = ""+e["SKU_AMOUNT"];
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
								 sitems.push([{"TITLE":titles[i]}]);
							}
							
							for(k = 0 ; k < dataList.length ; k++){
								var e = dataList[k];
								var title = e["SUPPLIER_NAME"];
								for(i = 0 ; i <sitems.length ; i ++){
									var titleObj = sitems[i][0];
									if(titleObj["TITLE"] == title){
										sitems[i].push(e);
									}
								}
							}
								
								for(i = 0 ; i < sitems.length ; i++){
									var objs = sitems[i];
									for(j = 0 ; j < objs.length ; j++){
										//if(objs[j]["SKU"]){
//											objs.splice(j,1);
											tmpItms.push(objs[j]);
										//}
									}
								}
								
							console.log(JSON.stringify(tmpItms));
							
						result = {
							        $entityCount: 20000,
							        $data: tmpItms
							     };
						pageNo++; 
						return  result;
				}
					console.log(111);
				model.describe("items",{
					provider:{ 
						beforeSend:function(self,arg){
							arg.options['contentType'] = 'application/json;charset=UTF-8';
							arg.options['data'] = JSON.stringify(param);
							arg.options['url'] = $util.reqUrl() + 'board/factory_schedule/list?pageSize='+pageSize+'&pageNo='+pageNo
							console.log(JSON.stringify(arg.options));
						},
						method:"POST",
						url:$util.reqUrl()+'board/factory_schedule/list?pageSize=20&pageNo='+pageNo,
						pageSize:20,
						success:function(arg){
							load.stop();
						},
						error:function(){
							load.stop();
							
						}
					}
				});
					
					model.action({
						getName:function(items){
							
							var e = items.get("0");
							console.log(JSON.stringify(e))
							
							return e.get("CUSTOMER_NAME")+","+e.get("BRAND_NAME")+","+e.get("YEARS_CODE")+","+e.get("QUARTER_NAME");
						}
					});
					
					model.widgetConfig({
			            incomeQueryList: {
			                $type: "listView",
			                bind: "item in items",
			                autoLoadPage:true,
			                height:window.screen.height - 110,
			                getItemTemplate: function(arg) {
			                	
			                	if(arg.item.get('PO_AMOUNT')){
			                		return "row";
			                	}
			                    
			                    return 'titleRow';
			                }
			            },
						titles: {
			                $type: "label",
			                width:window.screen.width,
			                text: "{{title}}",
			            }
		        	});
				});
			});