 
			var $util = new _util();
			mui.init();
			
			mui.plusReady(function(){
				var self = plus.webview.currentWebview();
				var param = self.queryData;
				param["pageSize"]="10";
				pageNo = 1;
				cola(function(model){
					model.set("StorageWay",self.StorageWay);
					model.set("DelOrderStatus",self.DelOrderStatus);
					cola.Provider.prototype.translateResult = function(result, invokerOptions) {
					
					var data = result.data['entities'];
					var entities = [];
					for(var i = 0;i< data.length;i++){
						var item = data[i][0];
						item['productionOrderStatus'] = data[i][1]['productionOrderStatus'];
						item['customerCode'] = data[i][1]['customerCode'];
						item['customerName'] = data[i][2]['customerName'];
						
						entities.push(item);
					}
					if(result.status == "300"){
							mui.toast('无效索引',{ duration:'short', type:'div' });
							return ;
					}
					
					if(data.length == 0){
						mui.toast('暂无数据',{ duration:'short', type:'div' });
					}
					
						result = {
							        $entityCount: 20000,
							        $data: entities
							     };
						return  result;
				}
				 
				model.describe("items",{
					provider:{ 
						beforeSend:function(self,arg){
							arg.options['contentType'] = 'application/json;charset=UTF-8';
							param['pageNo'] = pageNo++;
							arg.options['data'] = JSON.stringify(param);
							arg.options['url'] = $util.reqUrl() + 'board/delivery_note/header/list'
						},
						method:"POST",
						url:$util.reqUrl() + 'board/delivery_note/header/list',
						pageSize:20,
						success:function(arg){
							
						},
						error:function(){
							
						}
					}
				});
					
					$('#queryList').css("font-size",(window.screen.width/375.0)*12);
					model.set('pageNo',1);
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
					
					
					
					
					model.widgetConfig({
			            queryList: {
			                $type: "listView",
			                bind: "item in items",
			                autoLoadPage:true,
			                height:window.screen.height - 54,
			                getItemTemplate: function(arg) {
			                    return "row";
			                }
			            }
		        	});
				});
			});