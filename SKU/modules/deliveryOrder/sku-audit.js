
			var $util = new _util();
			mui.init();
			cola(function(model){
				
				$(".v-box").click(function(){
					
				})
				
				$util._ajaxJSON({
						url: "enum/StorageWay/list",
						success: function(data) {
							model.set("StorageWay",data.dataList);
						},
						//调用出错执行的函数
						error: function(e) {
							//请求出错处理
						}
					});
				$util._ajaxJSON({
						url: "enum/DelOrderStatus/list",
						datatype: "json", //"xml", "html", "script", "json", "jsonp", "text".
						success: function(data) {
							model.set("DelOrderStatus",data.dataList);
							model.get("queryData").set("receiptStatus","01");
						},
						//调用出错执行的函数
						error: function(e) {
							//请求出错处理
						}
					});
				
				model.set({
					queryData:{
//						style:"716301027003"
					}
				});
				
				model.action({
					dataBack:function(){
						model.set("queryData",{receiptStatus:"01"});  
					},
					query:function(){
						console.log(JSON.stringify(model.get("queryData")))
						if(!model.get("queryData").get("style")){
							mui.toast('款号不能为空',{ duration:'short', type:'div' });
							return;
						}
						mui.openWindow({
						    url: 'sku-queryAudit.html', 
						    id:'queryAudit',
						    extras:{
						        queryData:model.get("queryData").toJSON(),  //扩展参数
						        StorageWay:model.get("StorageWay"),
						        DelOrderStatus:model.get("DelOrderStatus")
						    }
						 }); 
					}
				});
				
			});