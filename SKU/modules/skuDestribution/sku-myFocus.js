			var $util = new _util();
			mui.init()
			cola(function(model){
				model.set({
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
			});