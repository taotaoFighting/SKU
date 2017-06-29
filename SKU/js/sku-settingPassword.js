			cola(function(model){
				model.action({
					ensure:function(){
						mui.back();
					}
				});
			})
			mui.init()
			document.getElementById("back").addEventListener('tap',function () {
				 mui.back();
			});