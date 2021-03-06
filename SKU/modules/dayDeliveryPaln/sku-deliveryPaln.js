			var $util = new _util();
			mui.init()
			cola(function(model){
				
				$(".v-box").click(function(){
					
				})
				
				model.set({
					queryData:{
						brandCode:'请选择',
						storageCode:'请选择'
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
				
				model.describe("brands",{
					provider:{
						method:"POST",
						url:$util.reqUrl()+"enum/Brand/list",
						success:function(arg){
							model.set("brands",arg.result.dataList);
							model.get("brands").insert({"enumvName":"请选择","enumvCode":""},"begin");
							model.get("queryData").set("brandCode",""); 
						}
					}
				});
				
				model.action({
					query:function(){
						var param = {};
						if(model.get("queryData").get("brandCode")){
							param["brandCode"] = model.get("queryData").get("brandCode");
						}
						if(model.get("queryData").get("storageCode")){
							param["storageCode"] = model.get("queryData").get("storageCode");
						}
						if(model.get("queryData").get("deliveryDateS")){
							param["deliveryDateS"] = model.get("queryData").get("deliveryDateS").toISOString().substr(0,10);
						}
						if(model.get("queryData").get("deliveryDateE")){
							param["deliveryDateE"] = model.get("queryData").get("deliveryDateE").toISOString().substr(0,10);
						}
						console.log(JSON.stringify(param));
						mui.openWindow({
						    url: 'sku-deliveryPalnQueryResult.html', 
						    id:'deliveryPalnQueryResult',
						    extras:{
						        queryData:param  //扩展参数
						    }
						 }); 
					},
					resetData:function(){
						model.set("queryData",{});
					}
				});
				
			});