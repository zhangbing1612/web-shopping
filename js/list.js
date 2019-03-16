//热门商品
$(document).ready(function() {
	$.ajax({
		type: 'get',
		url: 'http://datainfo.duapp.com/shopdata/getGoods.php',
		dataType: 'jsonp',
		//data:{goodID:5},
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$('#goodList').html($('#goodList').html() + `<li id="list-li" goodId=` + data[i].goodsID + `>
							<img id="list-img" src="` + data[i].goodsListImg + `" alt="">
							<p id="p1">` + data[i].goodsName.slice(0, 8) + `...` + `</p>
							<p id="p2">` + `售价:&nbsp;&yen;` + data[i].price + `</p>
							</li>`);
			}
			$('#goodList>li').on('click', function() {
				window.location.href = 'goodInf.html#' + this.getAttribute('goodID');
			})
		}
	})
})
//搜索
$('#search').bind('input propertychange', function() {
	$.ajax({
		type: 'get',
		url: ' http://datainfo.duapp.com/shopdata/selectGoodes.php',
		dataType: 'jsonp',
		data: {
			selectText: $('#search').val(),
		},
		success: function(data) {
			$('#goodList').html('');
			for(var i = 0; i < data.length; i++) {
				$('#goodList').html($('#goodList').html() + `<li id="list-li" goodId=` + data[i].goodsID + `>
							<img id="list-img" src="` + data[i].goodsListImg + `" alt="">
							<p id="p1">` + data[i].goodsName.slice(0, 8) + `...` + `</p>
							<p id="p2">` + `售价:&nbsp;&yen;` + data[i].price + `</p>
							</li>`);
			}
			$('#goodList>li').on('click', function() {
				window.location.href = 'goodInf.html#' + this.getAttribute('goodID');
			})
		}
	})
})
$(function() {
	$.ajax({
		type: 'get',
		url: 'http://datainfo.duapp.com/shopdata/getclass.php',
		dataType: 'json',
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$('#classList').html($('#classList').html() +
					`<li classID=` + data[i].classID + `>
						<p>` + data[i].className + `</p>
						</li>`)
			}
			$('.wrapper').navbarscroll();
			//导航栏商品列表					 	
			$('#classList>li').on('click', function() {
				var classid = this.getAttribute('classID');
				$.ajax({
					type: 'get',
					url: 'http://datainfo.duapp.com/shopdata/getGoods.php',
					dataType: 'jsonp',
					data: {
						classID: classid,
					},
					success: function(data) {
						$('#goodList').html("");
						if(data.length !== undefined) {
							for(var i = 0; i < data.length; i++) {
								$('#goodList').html($('#goodList').html() + `<li id="list-li" goodId=` + data[i].goodsID + `>
										<img id="list-img" src="` + data[i].goodsListImg + `" alt="">
										<p id="p1">` + data[i].goodsName.slice(0, 8) + `...` + `</p>
										<p id="p2">` + `售价:&nbsp;&yen;` + data[i].price + `</p>
										</li>`);
							}

							$('#goodList>li').on('click', function() {
								window.location.href = 'goodInf.html#' + this.getAttribute('goodId');
							})
						} else {
							$('#goodList').html("<h1>该栏商品暂未上架<h1>");
						}
					}
				})
			});
		}
	})
});
//获取结束