if(!localStorage.getItem('username')) {
	location.href = 'login.html'
}

$('#goodList').on('click', '#checked', function() {
	setTotal();
})
//计算总价
function setTotal() {
	var s = 0;
	$("#goodList :checkbox").each(function() {
		if($(this).prop("checked")) {
			s += parseInt($(this).parents('tr').find('.number')[0].value) * parseFloat($(this).parents('tr').find('.price')[0].innerText.slice(1));
		}
	});
	$("#sum").html(`￥` + s.toFixed(2));
}

//设置全选					

$(function() {
	$('#qx').click(function() {
		if($(this).is(':checked')) {
			$("#goodList :checkbox").prop("checked", true);
			setTotal();
		} else {
			$("#goodList :checkbox").removeAttr("checked", false);
			setTotal();
		}
	})
})

$("#goodList >input").change(function() {
	$('#goodList :checkbox').each(function() {
		console.log($('#qx')[0].checked);
		if($(this).is('checked')) {
			$('#qx')[0].checked = true;
			console.log($('#qx')[0].checked);
		} else {
			$('#qx')[0].checked = false;
		}
	})
})

//添加购物车
$(function() {
	$.ajax({
		type: 'get',
		url: 'http://datainfo.duapp.com/shopdata/getCar.php',
		dataType: 'jsonp',
		data: {
			userID: 5,
		},
		success: function(data) {
			if(data.length !== undefined) {
				for(var i = 0; i < data.length; i++) {
					$('#goodList').html($('#goodList').html() +
						`<tr id="tr` + i + `" goodID="` + data[i].goodsID + `"><td>
						<input type="checkbox" id='checked' style="width:1rem; height:1rem;"/ ></td>
						<td style='height:5rem;width:5rem' ><img style="height:100%;width:100%" src="` + data[i].goodsListImg + `" /></td>
						<td style='float:left;height:5rem;width:10rem'>
						<p style='font-size: 0.8rem'>` + data[i].goodsName.slice(0, 20) + `...` + `</p>
						<p style="color:red;margin-top:1rem" class="price">￥` + data[i].price + `</p>
						</td>
						
						
						<td style="color:#696969 width: 3rem" align="center">
						<input class="min" type="button" value="-" style="width:1rem"/>
						<input class="number" type="text" style="width: 2rem" value="` + data[i].number + `" /> 
						<input class="add" type="button" value="+" style="width:1rem" />
						</td></tr>`)
				}
				//更改购物车商品数量
				//增加数量
				$("#goodList").on('click', '.add', function() {
					var t = $(this).parents('tr').find('.number')[0];
					t.value = (parseInt(t.value) + 1);
					setTotal();

					$.ajax({
						type: 'get',
						url: 'http://datainfo.duapp.com/shopdata/updatecar.php',
						dataType: 'json',
						data: {
							userID: localStorage.getItem('userID'),
							goodsID: $(this).parents('tr').attr('goodID'),
							number: t.value,
						}
					})
				});
				//减少数量	
				$("#goodList").on('click', '.min', function() {
					var t = $(this).parents('tr').find('.number')[0];
					t.value = (parseInt(t.value) - 1);
					if(parseInt(t.value) < 0) {
						t.value = 0;
					}
					setTotal();
					$.ajax({
						type: 'get',
						url: 'http://datainfo.duapp.com/shopdata/updatecar.php',
						dataType: 'json',
						data: {
							userID: localStorage.getItem('userID'),
							goodsID: $(this).parents('tr').attr('goodID'),
							number: t.value,
						}
					})
				})
			} else {
				$('#goodList').html(
					`<div><img src='images/empty.png' style='width:100%;height:100%'></div>`)
			}
		}
	})
})
//删除购物车
$('#delete').click(function() {

	$("#goodList :checkbox").each(function() {

		if($(this).prop("checked")) {
			console.log($(this).parents('tr').attr('goodID'));
			var userdelete = $(this).parents('tr').remove();
			$.ajax({
				type: 'get',
				url: 'http://datainfo.duapp.com/shopdata/updatecar.php',
				dataType: 'json',
				data: {
					userID: 5,
					goodsID: $(this).parents('tr').attr('goodID'),
					number: 0,
				},
			});
		};
	});
	setTotal();
});