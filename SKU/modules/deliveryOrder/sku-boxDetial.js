			var $util = new _util();
			mui.init();
			mui.plusReady(function(){
				var self = plus.webview.currentWebview();
				var receiptCode = self.receiptCode;
				var pageSize = 10;
				var pageNo = 1;
			cola(function(model){
				$('#queryList').css("font-size",(window.screen.width/375.0)*12);
				$('#titleLabel').css("font-size",(window.screen.width/375.0)*12);
				model.set("receiptCode",receiptCode);
						cola.Provider.prototype.translateResult = function(result, invokerOptions) {
						
						if(result.status == "300"){
								mui.toast('无效索引',{ duration:'short', type:'div' });
								return ;
						}
						
						if(result.dataList.length == 0){
							mui.toast('暂无数据',{ duration:'short', type:'div' });
						}
						
							result = {
								        $entityCount: 20000,
								        $data: result.dataList
								     };
							pageNo++;
							return  result;
					}
					 
					model.describe("items",{
						provider:{ 
							beforeSend:function(self,arg){
								arg.options['contentType'] = 'application/json;charset=UTF-8';
								arg.options['url'] = $util.reqUrl() + 'board/delivery_note/inbox/list?receiptCode='+receiptCode+'&pageSize='+pageSize+'&pageNo='+pageNo
								console.log(JSON.stringify(arg.options))
							},
							method:"POST",
							url:$util.reqUrl() + 'board/delivery_note/inbox/list?receiptCode='+receiptCode,
							pageSize:10,
							success:function(arg){
								
							},
							error:function(){
								
							}
						}
					});
				
				model.action({
					transfromrear:function(item){
						if(item.get("rear") == "Y"){
							return "是";
						}else{
							return "否";
						}
					}
				
				});
				
				model.widgetConfig({
		            queryList: {
		                $type: "listView",
		                bind: "item in items",
		                autoLoadPage:true,
		                height:window.screen.height-60,
		                getItemTemplate: function(arg) {
		                    return "row";
		                }
		            }
	        	});
			});
		});