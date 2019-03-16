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