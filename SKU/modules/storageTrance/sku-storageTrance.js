			var $util = new _util();
			mui.init()
			cola(function(model){
				
				$(".v-box").click(function(){
					
				})
				
				var years = [];
				years.push({year:"请选择"});
				var today = new Date();
			        for (var row = today.getFullYear() - 5; row <= today.getFullYear() + 5; row++) {
			            var item = {
			                year: row+""
			            };
			            years.push(item);
			        }
			        model.set("years", years);
				
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
							model.get("queryData").set("years","请选择");
						}
					}
				});
				model.describe("seasons",{
					provider:{
						method:"POST",
						url:$util.reqUrl()+"enum/Season/list",
						success:function(arg){
							model.set("seasons",arg.result.dataList);
							model.get("seasons").insert({"enumvName":"请选择","enumvCode":""},"begin");
							model.get("queryData").set("season","");
						}
					}
				});
				model.describe("waves",{
					provider:{
						method:"POST",
						url:$util.reqUrl()+"enum/Wave/list",
						success:function(arg){
							model.set("waves",arg.result.dataList);
							model.get("waves").insert({"enumvName":"请选择","enumvCode":""},"begin")
							model.get("queryData").set("band","")
						}
					}
				});
				
				model.action({
					query:function(){//查询
						var param = {};
						if(model.get("queryData").get("brand")){
							param["brand"] = model.get("queryData").get("brand");
						}
						if(model.get("queryData").get("years") && !(model.get("queryData").get("years") == "请选择")){
							param["years"] = model.get("queryData").get("years");
						}
						if(model.get("queryData").get("season")){
							param["season"] = model.get("queryData").get("season");
						}
						if(model.get("queryData").get("band")){
							param["band"] = model.get("queryData").get("band");
						}
						if(model.get("queryData").get("deliveryDateS")){
							param["deliveryDateS"] = model.get("queryData").get("deliveryDateS").toISOString().substr(0,10);
						}
						if(model.get("queryData").get("deliveryDateE")){
							param["deliveryDateE"] = model.get("queryData").get("deliveryDateE").toISOString().substr(0,10);
						}
						
						console.log(JSON.stringify(param))
						 mui.openWindow({
						    url: 'sku-storageTranceQuery.html', 
						    id:'storageTranceQuery',
						    extras:{
						        queryData:param,//扩展参数
						    }
						 }); 
					},
					resetQuery:function(){//重置查询条件
						model.set("queryData",{});
					},
					dblclick:function(){
					}
				});
			})