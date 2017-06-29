			var $util = new _util();
			mui.init();
			cola(function(model){
				
//				alert(window.screen.width)
				$('#queryList').css("font-size",(window.screen.width/375.0)*12);
				$('#titleLabel').css("font-size",(window.screen.width/375.0)*12);
				mui.plusReady(function(){
				var self = plus.webview.currentWebview();
				var receiptCode = self.receiptCode;
				model.set("receiptCode",receiptCode);
				var load = new Loading();
				load.init();
				load.start();
				$util._ajaxJSON({
						url: "board/delivery_note/inbox/list?receiptCode="+receiptCode,
						success: function(data) {
							model.set("items",data.dataList);
							load.stop();
						},
						//调用出错执行的函数
						error: function(e) {
							//请求出错处理
							load.stop();
							mui.toast('出错了！',{ duration:'short', type:'div' });
						}
					});
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
		                height:window.screen.height-60,
		                getItemTemplate: function(arg) {
		                    return "row";
		                }
		            }
	        	});
			});