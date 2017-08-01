			mui.init();
			cola(function(model){
				
				model.set({
					tel:""
				});
				
				model.action({
					ensure:function(){
						var view = plus.webview.getWebviewById("tab-setting.html");
						
						mui.fire(view,'tab-setting.html',{
					    tel:model.get("tel")
					  	}); 
						mui.back();
					}
				});
			})
			
			
//			document.getElementById("back").addEventListener('tap',function () {
//					
//					mui.back();
//				});