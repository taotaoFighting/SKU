			var $util = new _util();
			mui.init()
			cola(function(model){
				
				$(".v-box").click(function(){
					
				})
				model.set({
					queryData:{limitedUnit:"箱"}
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
							model.get("band").insert({"enumvName":"请选择","enumvCode":""},"begin") 
							model.get("queryData").set("brand",""); 
						}
					}
				});
				
				model.action({
					change:function(self,arg){
						if(self.get("label") == "按箱维护"){
							cola.widget("nubs").set("checked",false);
							if(model.get("queryData").get("limitedUnit") == "箱"){
								model.get("queryData").set("limitedUnit","件");
								cola.widget("nubs").set("checked",true);
							}else{
								model.get("queryData").set("limitedUnit","箱");
							}
						}else{
							cola.widget("boxs").set("checked",false);
							if(model.get("queryData").get("limitedUnit") == "件"){   
								model.get("queryData").set("limitedUnit","箱");
								cola.widget("boxs").set("checked",true);
							}else{
								model.get("queryData").set("limitedUnit","件");
							}
						}
						
					},
					commit:function(){
						
						if(!model.get("queryData").get("storageCode")){
							mui.toast('仓库不能为空',{ duration:'short', type:'div' });
							return;
						}
						if(!model.get("queryData").get("brand")){
							mui.toast('品牌不能为空',{ duration:'short', type:'div' });
							return;
						}
						if(!model.get("queryData").get("dateS")){
							mui.toast('开始日期不能为空',{ duration:'short', type:'div' });
							return;
						}
						if(!model.get("queryData").get("dateE")){
							mui.toast('结束日期不能为空',{ duration:'short', type:'div' });
							return;
						}
						if(!model.get("queryData").get("ceiling")){
							mui.toast('最大限额不能为空',{ duration:'short', type:'div' });
							return;
						}
						var load = new Loading();
						load.init();
						load.start();
						//检查是否已维护
						$util._ajaxJSON({
						url: "board/storage_daily_ceiling/check",
						//提交的数据
						data: model.get("queryData"),
						//返回数据的格式
						success: function(data) {
							if(data.msg == ""){
								$util._ajaxJSON({
									url: "board/storage_daily_ceiling/add",
									//提交的数据
									data: model.get("queryData"),
									//返回数据的格式
									success: function(data) {
										mui.toast(data.msg,{ duration:'short', type:'div' });
										load.stop();
									},
									//调用出错执行的函数
									error: function(e) {
										//请求出错处理
										load.stop();
									}
								});
							}else{
								var btnArray = ['取消', '覆盖'];
								mui.confirm(data.msg,'注意？', btnArray, function(e) {
									if (e.index == 1) {
										$util._ajaxJSON({
											url: "board/storage_daily_ceiling/add",
											//提交的数据
											data: model.get("queryData"),
											//返回数据的格式
											success: function(data) {
												mui.toast(data.msg,{ duration:'short', type:'div' });
												load.stop();
											},
											//调用出错执行的函数
											error: function(e) {
												//请求出错处理
												load.stop();
											}
										});
									}else {
										load.stop();
									}
								})
							}
						},
						//调用出错执行的函数
						error: function(e) {
							//请求出错处理
							console.log(JSON.stringify(e))
						}
					});
					}
				});
				
				model.widgetConfig({
					unit:{
						$type:"RadioGroup",
							items:[{
							    	label:"按箱维护",
							 		value:"1"
							 	},{
							 		label:"按量维护",
							 		value:"11111"
							 	}]
					}
				})
			});