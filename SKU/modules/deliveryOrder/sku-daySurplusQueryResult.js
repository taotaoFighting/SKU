			var $util = new _util();
			mui.init();
			
			$('#queryList').css("font-size",(window.screen.width/375.0)*12);
			$('.titleRow').css("font-size",(window.screen.width/375.0)*10);
			mui.plusReady(function(){
				var self = plus.webview.currentWebview();
				var param = self.queryData;
				var storages = self.storages;
				var title = self.title;
				var pageNo = 1;
				var pageSize = 40;
				sessionStorage.setItem('param',param);
				cola(function(model){
				console.log('title = '+ title)
				model.set('title',title);
				cola.Provider.prototype.translateResult = function(result, invokerOptions) {
					
							var data = result;
							var dataList = data.dataList;
							if(data.status == "300"){
								mui.toast('无效索引',{ duration:'short', type:'div' });
								return [];
							}
							
							if(dataList.length == 0){
								mui.toast('暂无数据',{ duration:'short', type:'div' });
//								return;
							}
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
								 sitems.push([{"TITLE":titles[i]}]);
							}
							
							for(k = 0 ; k < dataList.length ; k++){
								var e = dataList[k];
								var title = e["CUSTOMER_NAME"];
								for(i = 0 ; i <sitems.length ; i ++){
									var titleObj = sitems[i][0];
									if(titleObj["TITLE"] == title){
										sitems[i].push(e);
									}
								}
							}
							
							console.log(JSON.stringify(sitems));
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
				
				model.set("titles", ["日期", "品牌", "最大限额","限额单位", "收获量", "剩余量"]);
				model.describe("items",{
					provider:{ 
						beforeSend:function(self,arg){
							arg.options['contentType'] = 'application/json;charset=UTF-8';
							arg.options['data'] = JSON.stringify(param);
							arg.options['url'] = $util.reqUrl() + 'board/storage_daily_ceiling/list?pageSize='+pageSize+'&pageNo='+pageNo
							console.log(JSON.stringify(arg.options))
						},
						method:"POST",
						url:$util.reqUrl() + +'board/storage_daily_ceiling/list?pageSize=40&pageNo='+pageNo,
						pageSize:20,
						success:function(arg){
							
						},
						error:function(){
							
						}
					}
				});
				
				model.action({
					changeTitle:function(item){
						console.log(JSON.stringify(storages))
						var title = '不在任何仓库的数据';
						for(var i = 0; i< storages.length;i++){
							if(item.get('TITLE') == storages[i]['ENUMV_CODE']){
								title = storages[i]['ENUMV_NAME'];
								break;
							}
						}
						
						return title;
					}
				});
				model.widgetConfig({
		            cellingQueryList: {
		                $type: "listView",
		                bind: "item in items",
		                height:window.screen.height - 110,
		                autoLoadPage:true,
		                getItemTemplate: function(arg) {
		                	if(!arg.item.get('LIMITED_UNIT')){
		                		return 'titleRow'
		                	}
		                	console.log(JSON.stringify(arg.item))
		                    return "row";
		                }
		            },
					titles: {
		                $type: "label", 
		                width:window.screen.width*1.9/5,
		                text: "{{title}}",
		            }
	        	});
				
			});
				});
			