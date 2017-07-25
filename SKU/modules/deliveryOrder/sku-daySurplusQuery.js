			var $util = new _util();
			mui.init()
			cola(function(model){
				
				$(".v-box").click(function(){
					
				})
				
				model.set({
					queryData:{}
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
							param["dateS"] = model.get("queryData").get("dateS");
						}
						if(model.get("queryData").get("dateE")){
							param["dateE"] = model.get("queryData").get("dateE");
						}
						console.log(JSON.stringify(param))
						mui.openWindow({
						    url: 'sku-daySurplusQueryResult.html', 
						    id:'daySurplusQueryResult',
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