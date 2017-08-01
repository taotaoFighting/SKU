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
					queryData:{
						brand:'请选择',
						storageCode:'请选择',
						years:'请选择',
						season:'请选择',
						band:'请选择',
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
							model.get("queryData").set("brand","")
							model.get("queryData").set("years","请选择")
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
							model.get("queryData").set("season","")
						}
					}
				});
				
				model.describe("waves",{
					provider:{
						method:"POST",
						url:$util.reqUrl()+"enum/Wave/list",
						success:function(arg){
							model.set("waves",arg.result.dataList);
							model.get("waves").insert({"enumvName":"请选择","enumvCode":""},"begin");
							model.get("queryData").set("band","")
						}
					}
				});
				
				model.action({
					query:function(){
						var param = {};
						if(model.get("queryData").get("brand")){
							param["brand"] = model.get("queryData").get("brand");
						}
						if(model.get("queryData").get("storageCode")){
							param["storageCode"] = model.get("queryData").get("storageCode");
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
						console.log(JSON.stringify(param))
						mui.openWindow({
						    url: 'sku-incomePlanQuery.html', 
						    id:'incomePlanQuery',
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