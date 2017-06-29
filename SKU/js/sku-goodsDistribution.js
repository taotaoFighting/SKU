			var $util = new _util();
			mui.init()
			
			cola(function(model){
				
				$(".v-box").click(function(){
					
				});
				
				var years = [];
				 years.push({year:"请选择"});
				var today = new Date();
			        for (var row = today.getFullYear() - 5; row <= today.getFullYear() + 5; row++) {
			            var item = {
			                year: row
			            };
			            years.push(item);
			        }
			        model.set("years", years);
				
				model.set({
					queryData:{},
					colors:[{
						color:"红色",
						value:"354"
					},{
						color:"蓝色",
						value:"354"
						
					},{
						color:"白色",
						value:"354"
					},{
						color:"淡红色",
						value:"354"
					}]
				});
				
				model.describe("band",{
					provider:{
						method:"POST",
						url:$util.reqUrl()+"enum/Wave/list",
						success:function(arg){
							model.set("band",arg.result.dataList);
							model.get("band").insert({"enumvName":"请选择","enumvCode":""},"begin");
							model.get("queryData").set("band","");
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
							model.get("queryData").set("season","")
						}
					}
				});
				model.describe("countries",{
					provider:{
						method:"POST",
						url:$util.reqUrl()+"board/my_attention/list",
						success:function(arg){
							model.set("countries",arg.result.dataList);
						}
					}
				});
				
				model.action({
					onRemoveClick:function(contries){//移除
						$util._ajaxJSON({
							url: "board/my_attention/delete?pkId="+contries.get("pkId"),
							success: function(data) {
								if(data.status == 200){
									
									contries.remove();
									mui.toast('删除成功！',{ duration:'short', type:'div' });
								}
							},
							//调用出错执行的函数
							error: function(e) {
								//请求出错处理
								mui.toast('删除失败！',{ duration:'short', type:'div' });
							}
						});
					},
					query:function(){//查询
						var param = {};
						if(model.get("queryData").get("styleCode")){
							param["styleCode"] = model.get("queryData").get("styleCode");
						}
						if(model.get("queryData").get("colorCode")){
							param["colorCode"] = model.get("queryData").get("colorCode");
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
						    url: 'sku-queryResult.html', 
						    id:'queryResult',
						    extras:{
						        queryData:param  //扩展参数
						    }
						 }); 
					},
					resetQuery:function(){//重置查询条件
						model.set("queryData",{});
					},
					attention:function(){//关注
						var queryData = model.get("queryData");
						if(!model.get("queryData").get("years")){
//							alert(model.get("queryData").get("years"))
							mui.toast('年份不能为空',{ duration:'short', type:'div' });
							return;
						}
						if(!model.get("queryData").get("season")){
//							alert(model.get("queryData").get("years"))
							mui.toast('季节不能为空',{ duration:'short', type:'div' });
							return;
						}
						if(!model.get("queryData").get("band")){
//							alert(model.get("queryData").get("years"))
							mui.toast('波段不能为空',{ duration:'short', type:'div' });
							return;
						}
						var param = {"years":model.get("queryData").get("years"),"season":model.get("queryData").get("season"),"band":model.get("queryData").get("band")};
						
						$util._ajaxJSON({
						url: "board/my_attention/add",
						data: param,
						//返回数据的格式
						success: function(data) {
							if(data.status == 200){
								model.get("countries").insert(data.data);
								mui.toast('关注成功！',{ duration:'short', type:'div' });
							}
						},
						//调用出错执行的函数
						error: function(e) {
							//请求出错处理
							mui.toast('关注失败！',{ duration:'short', type:'div' });
						}
					});
					},
					transfromSeason:function(country){
						var tmp = "";
						switch(country.get("season")){
							case "1":
								tmp = "春季";
								return tmp;
							case "2":
								tmp = "夏季";
								return tmp;
							case "3":
								tmp = "秋季";
								return tmp;
							case "4":
								tmp = "冬季";
								return tmp;
						}
					},
					transfromBand:function(country){
						return "第"+country.get("band")+"波";
					},
					transfromTitle:function(country){
						var tmp = country.get("years")+"年";
						switch(country.get("season")){
							case "1":
								tmp += "春季" + "第"+country.get("band")+"波";
								return tmp;
							case "2":
								tmp += "夏季" + "第"+country.get("band")+"波";
								return tmp;
							case "3":
								tmp += "秋季" + "第"+country.get("band")+"波";
								return tmp;
							case "4":
								tmp += "冬季" + "第"+country.get("band")+"波";
								return tmp;
						}
					},
					itemClick:function(self,arg){
						var param = {"years":arg.item.get("years"),"season":arg.item.get("season"),"band":arg.item.get("band")};
						mui.openWindow({
						    url: 'sku-queryResult.html', 
						    id:'queryResult',
						    extras:{
						        queryData:param  //扩展参数
						    }
						 });
						
					}
				});
				
				 model.widgetConfig({
		            fousList: {
		                $type: "listView",
		                bind: "country in countries",
		                itemSlide: "left",
		                height:window.screen.height-60,
		                getItemTemplate: function(arg) {
		                    return "odd";
		                    //(arg.item.get("label").length % 2) ? "even" : "odd";
		                }
		            }
	        	});
			})