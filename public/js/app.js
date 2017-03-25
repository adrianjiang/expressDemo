


var userid = '';

var alluser = [];

//登入
$('#login').click(function(){
	var form = $('#form-login');
	var name = form.find('[eid="name"]').val();
	var pass = form.find('[eid="pass"]').val();
	console.log(name,pass)
	E.ajax('account/login',{name:name,pass:E.md5(pass)},function(result){
		console.log(result);
		if(result.state == 1){
			var data = result.data;
			alert('登入成功');
			userid = data.id;

			if(data.pn_user == 'true'){
				init_adduser();
				init_delete();
				show_alluser();
			}

		}
	})
})


function init_adduser(){

}
//登入
$('#adduser').click(function(){
	var form = $('#form-adduser');
	var name = form.find('[eid="name"]').val();
	var pass = form.find('[eid="pass"]').val();
	console.log(name,pass)
	E.ajax('account/add',{id:userid,option:{name:name,pass:E.md5(pass)}},function(result){
		console.log(result);
		if(result.state == 1){
			alert('添加成功');

			
		}
	})
})

//初始化删除用户表单
function init_delete(){
	E.ajax('account/getall',{id: userid},function(result){
		console.log(result);
		if(result.state == 1){
			var form = $('#form-deluser'); 
			var select = form.find('[eid="name"]');
			select.empty();
			var select_reuser = $('#form-reuser').find('[eid="name"]');
			var html = '';
			
			var data = result.data;
		
			for(var i = 0; i < data.length; i++){
				html += '<option>' + data[i].name + '</option>'
			}
			select.append($(html));
			select_reuser.append($(html));
		}
	})
}
$('#deluser').click(function(){
	var form = $('#form-deluser');
	var name = form.find('[eid="name"]').val();
	console.log(name)
	E.ajax('account/delete',{id:userid,name: name},function(result){
		console.log(result);
		if(result.state == 1){
			alert('删除成功');
		}
	})
})
//显示所有用户信息
function show_alluser(){
	E.ajax('account/getall',{id: userid},function(result){
		if(result.state == 1){
			var table = $('#table_alluser');
			
			var data = result.data;
			
			var html = '';
			for(var i = 0; i < data.length; i++){
				var buff = data[i];
				html += '<tr>';
				html += '<td>' + buff.name + '</td>';
				html += '<td>' + buff.manage + '</td>';
				html += '<td>' + buff.pn_user + '</td>';
				html += '<td>' + buff.pn_export + '</td>';
				html += '<td>' + buff.pn_machine + '</td>';


			}

			table.append($(html));
		}
	})
}

//修改密码

$('#remypass').click(function(){
	var form = $('#form-remypass');
	var pass = form.find('[eid="pass"]').val();
	console.log(pass)
	E.ajax('account/repass',{id:userid,pass: E.md5(pass)},function(result){
		console.log(result);
		if(result.state == 1){
			alert('修改成功');
		}
	})
})

//修改别人的信息
function init_reuser(){

}
$('#reuser').click(function(){
	var form = $('#form-remypass');
	var pass = form.find('[eid="pass"]').val();
	console.log(pass)
	E.ajax('account/reuser',{id:userid, option: option},function(result){
		console.log(result);
		if(result.state == 1){
			alert('修改成功');
		}
	})
});
$('#select_reuser').change(function(){
	var name = $(this).val();
	console.log(name);
});