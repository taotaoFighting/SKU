			var $util = new _util();
			mui.init()
			cola(function(model){
				
				$(".v-box").click(function(){
					
				})
				
				model.set({
					queryData:{
						storageCode:'请选择',
						brand:'请选择'
					}
				});
				model.describe("storages",{
					provider:{
						method:"POST",
						url:$util.reqUrl()+"board/repertory/list",
						success:function(arg){
							model.set("storages",arg.result.dataList);
							model.get("storages").insert({"ENUMV_NAME":"请选择","ENUMV_CODE":""},"begin") 
							model.get("queryData").set("storageCode",""); 
						}
					}
				});
				
				model.describe("band",{
					provider:{
						method:"POST",
						url:$util.reqUrl()+"enum/Brand/list",
						success:function(arg){
							model.set("band",arg.result.dataList);
							model.get("band").insert({"enumvName":"请选择","enumvCode":""},"begin");
							model.get("queryData").set("brand","");
						}
					}
				});
				
				model.action({
					query:function(){
						var param = {};
						if(model.get("queryData").get("storageCode")){
							param["storageCode"] = model.get("queryData").get("storageCode");
						}
						if(model.get("queryData").get("brand")){
							param["brand"] = model.get("queryData").get("brand");
						}
						if(model.get("queryData").get("dateS")){
							param["dateS"] = model.get("queryData").get("dateS").toISOString().substr(0,10);
							
						}
						if(model.get("queryData").get("dateE")){
							param["dateE"] = model.get("queryData").get("dateE").toISOString().substr(0,10);
						}
						
						console.log(JSON.stringify(param))
						
						mui.openWindow({
						    url: 'sku-daySurplusQueryResult.html', 
						    id:'daySurplusQueryResult',
						    extras:{
						        queryData:param,  //扩展参数
						        storages:model.get('storages').toJSON()
						    }
						 }); 
					},
					resetData:function(){
						model.set("queryData",{});
					}
				});
				
			});