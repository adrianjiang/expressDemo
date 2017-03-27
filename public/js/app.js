


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


			if(data.pn_root == 'true'){
				$('form').show();
				init_adduser();
				init_delete();
				show_alluser();
				init_allmachine();
				return;
			}
			if(data.pn_user == 'true'){
				init_adduser();
				init_delete();
				show_alluser();

				$('#form-adduser').show();
				$('#form-deluser').show();
				$('#form-reuser').show();
				$('#table-alluser').show();
			}
			if(data.pn_export == 'true'){
				console.log('初始化导出权限')
				init_allmachine();
				$('#table-allmachine').show();

			}
			if(data.machine == 'true'){
				$('#form-addmachine').show();
				$('#form-delmachine').show();
				$('#form-setmachine').show();

			}

			$('#form-remypass').show();

			$('#table-mymachine').show();
			$('#form-setmachine').show();
			
			var manage = data.manage;
			var buff = manage.split(',');
			for(var i = 0; i < buff.length; i++){
				var b = buff[i];
				if(!b)break;
				E.ajax('machine/get',{id: userid, machineid: b},function(result){
					if(result.state == 1){
						var table = $('#table_mymachine');
						var data = result.data;
						
						var html = '';
						// for(var i = 0; i < data.length; i++){
							var buff = data;
							if(!buff)return
							html += '<tr>';
							html += '<td>' + buff.number + '</td>';
							html += '<td>' + buff.name + '</td>';
							html += '<td>' + buff.modelnum + '</td>';
							html += '<td>' + buff.licensenum + '</td>';
							html += '<td>' + buff.user + '</td>';
							html += '<td>' + buff.state + '</td>';
							html += '<td>' + buff.seat + '</td>';
							html += '<td>' + buff.problem + '</td>';
							html += '<td>' + buff.note + '</td>';
							html += '<td>' + buff.pipe + '</td>';

						// }

						table.append($(html));
					}
				})
			}
		
		}
	})
})


function init_adduser(){

}
//新建用户
$('#adduser').click(function(){
	var form = $('#form-adduser');
	var name = form.find('[eid="name"]').val();
	var pass = form.find('[eid="pass"]').val();
	var manage = form.find('[eid="manage"]').val();
	var pn_user = form.find('[eid="pn_user"]').val();
	var pn_machine = form.find('[eid="pn_machine"]').val();
	var pn_export = form.find('[eid="pn_export"]').val();

	console.log(name,pass)
	E.ajax('account/add',{id:userid,option:{
		name:name,
		pass:E.md5(pass),
		manage: manage,
		pn_user: pn_user,
		pn_machine: pn_machine,
		pn_export: pn_export
	}},function(result){
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
	var form = $('#form-reuser');
	var name = form.find('[eid="name"]').val();
	var pass = form.find('[eid="pass"]').val();
	var manage = form.find('[eid="manage"]').val();
	var pn_user = form.find('[eid="pn_user"]').val();
	var pn_machine = form.find('[eid="pn_machine"]').val();
	var pn_export = form.find('[eid="pn_export"]').val();

	console.log(name,pass,manage,pn_user,pn_machine,pn_export)
	E.ajax('account/set',{id:userid,option:{
		name:name,
		pass:E.md5(pass),
		manage: manage,
		pn_user: pn_user,
		pn_machine: pn_machine,
		pn_export: pn_export
	}},function(result){
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

//添加机器
var form_addmachine = $('#form-addmachine');

form_addmachine.find('[eid="random"]').click(function(){
	form_addmachine.find('[eid="number"]').val(E.random_id());
})
$('#addmachine').click(function(){
	var form = $('#form-addmachine');
	var number = form.find('[eid="number"]').val();
	var name = form.find('[eid="name"]').val();
	var modelnum = form.find('[eid="modelnum"]').val();
	var licensenum = form.find('[eid="licensenum"]').val();
	var user = form.find('[eid="user"]').val();
	var state = form.find('[eid="state"]').val();
	var seat = form.find('[eid="seat"]').val();
	var problem = form.find('[eid="problem"]').val();
	var note = form.find('[eid="note"]').val();
	var pipe = form.find('[eid="pipe"]').val();

	// console.log(pass)
	E.ajax('machine/add',{id:userid, option: {
		number : number,    
		name   : name  ,  
		modelnum : modelnum,  
		licensenum : licensenum,  
		user   : user  ,  
		state  : state ,  
		seat   : seat  ,  
		problem : problem,  
		note   : note  ,  
		pipe   : pipe  
	}},function(result){
		console.log(result)
		if(result.state == 1){
			alert('修改成功');
		}
	})

});

//加载所有机器信息
function init_allmachine(){
	E.ajax('machine/getall',{id: userid},function(result){
		if(result.state == 1){
			var table = $('#table_allmachine');
			
			var data = result.data;
			
			var html = '';
			for(var i = 0; i < data.length; i++){
				var buff = data[i];
				html += '<tr>';
				html += '<td>' + buff.number + '</td>';
				html += '<td>' + buff.name + '</td>';
				html += '<td>' + buff.modelnum + '</td>';
				html += '<td>' + buff.licensenum + '</td>';
				html += '<td>' + buff.user + '</td>';
				html += '<td>' + buff.state + '</td>';
				html += '<td>' + buff.seat + '</td>';
				html += '<td>' + buff.problem + '</td>';
				html += '<td>' + buff.note + '</td>';
				html += '<td>' + buff.pipe + '</td>';

			}

			table.append($(html));
		}
	})
}

//删除机器
$('#delmachine').click(function(){
	var form = $('#form-delmachine');
	var id = form.find('[eid="id"]').val();
	console.log('id',id)
	E.ajax('machine/delete',{id: userid, machineid: id}, function(result){
		console.log(result)
		if(result.state == 1){
			alert('删除机器成功')
		}
	})
})


//修改机器
$('#setmachine').click(function(){
	var form = $('#form-setmachine');
	var id = form.find('[eid="id"]').val();
	var number = form.find('[eid="number"]').val();
	var name = form.find('[eid="name"]').val();
	var modelnum = form.find('[eid="modelnum"]').val();
	var licensenum = form.find('[eid="licensenum"]').val();
	var user = form.find('[eid="user"]').val();
	var state = form.find('[eid="state"]').val();
	var seat = form.find('[eid="seat"]').val();
	var problem = form.find('[eid="problem"]').val();
	var note = form.find('[eid="note"]').val();
	var pipe = form.find('[eid="pipe"]').val();

	// console.log(pass)
	E.ajax('machine/set',{id:userid, option: {
		id     : id,
		number : number,    
		name   : name  ,  
		modelnum : modelnum,  
		licensenum : licensenum,  
		user   : user  ,  
		state  : state ,  
		seat   : seat  ,  
		problem : problem,  
		note   : note  ,  
		pipe   : pipe  
	}},function(result){
		console.log(result)
		if(result.state == 1){
			alert('修改成功');
		}
	})

});

$(function(){
    $('#form-login').show();
})