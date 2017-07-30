
		var $util = new _util();
		mui.init({
				swipeBack:false //启用右滑关闭功能
			});
		document.addEventListener('plusready',plusReady,false);
		function plusReady(){
			plus.navigator.setStatusBarBackground('#439CF6');
//			localStorage.setItem("localhost","http://202.96.245.236:8080");
		};
		cola(function(model){
			model.set({
				"param":{},
				"isSavepad":true
			});
			
			if(localStorage.getItem("password")){
				model.get("param").set("password",localStorage.getItem("password"));
			}
			
			if(localStorage.getItem("userName")){
				model.get("param").set("userName",localStorage.getItem("userName"));
			}
			
			model.action({
				launch:function(){
					
					localStorage.setItem("firstLaunch",false);
								localStorage.setItem("userName",model.get("param").get("userName"));
								localStorage.setItem("passwordDefault",model.get("param").get("password"));
								if(model.get("isSavepad")){
									localStorage.setItem("password",model.get("param").get("password"));
								}else{
									localStorage.removeItem("password");
								}
//								mui.openWindow({
//							    url: 'tab-main.html', 
//							    id:'setting',
//							    styles:{
//		    						popGesture:'none'	
//		    					}
//							  });
							  location.replace('tab-main.html');
					
					
					
					if(!model.get("param").get("userName") || !model.get("param").get("password")){
						
						mui.toast('账号密码不能为空！',{ duration:'short', type:'div'});
						
						return;
					}
					$util._ajaxJSON({
						url: "login",
						data: model.get("param"),
						success: function(data) {
							console.log(JSON.stringify(data))
							if(data.msg == "登陆成功！"){
								localStorage.setItem("firstLaunch",false);
								localStorage.setItem("userName",model.get("param").get("userName"));
								localStorage.setItem("passwordDefault",model.get("param").get("password"));
								if(model.get("isSavepad")){
									localStorage.setItem("password",model.get("param").get("password"));
								}else{
									localStorage.removeItem("password");
								}
//								mui.openWindow({
//							    url: 'tab-main.html', 
//							    id:'setting',
//							    styles:{
//		    						popGesture:'none'	
//		    					}
//							  });
							  location.replace('tab-main.html');
							}else{
								mui.toast('账号或密码错误！',{ duration:'short', type:'div'});
							}
						},
						//调用出错执行的函数
						error: function(e) {
							//请求出错处理
						}
					});
					
				},
				change:function(){
					model.set("isSavepad",!model.get("isSavepad"));
					console.log(model.get("isSavepad"))
				}
			});
		})