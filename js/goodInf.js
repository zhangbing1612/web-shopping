//商品详情
var goodId = window.location.hash.slice(1);
$.ajax({
	type: 'get',
	url: 'http://datainfo.duapp.com/shopdata/getGoods.php',
	dataType: 'jsonp',
	data: {
		goodsID: goodId,
	},
	success: function(data) {
		console.log(data)
		$('#goodList').html($('#goodList').html() +
			`<li goodId=` + goodId + `>
				<h5>` + data[0].goodsName + `</h5>
				<p style='height:10px'></P>
				<p style='font-size: 0.8rem'>` + data[0].detail.slice(5) + `</p>
				<p style="color:red">` + `￥` + data[0].price + `</p>
				</li>`)
		//商品轮播图
		var imgs = JSON.parse(data[0]['goodsBenUrl']);
		for(var i = 0; i < imgs.length; i++) {
			$('.swiper-wrapper').html($('.swiper-wrapper').html() +
				`<div class="swiper-slide">
					<img src="` + imgs[i] + `" alt="获取失败" />
					</div>`)
		}
		var mySwiper = new Swiper('.swiper-container', {
			loop: true,
			pagination: '.swiper-pagination',
			autoplay: 2000
		})
	}
});
//添加购物车
function Join() {
	if($('#gmsl').val() !== "") {
		$.ajax({
			type: 'get',
			url: 'http://datainfo.duapp.com/shopdata/updatecar.php',
			datatype: 'jsonp',
			data: {
				userID: 5,
				goodsID: goodId,
				number: $('#gmsl').val(),
			},
			success: function(info) {
				switch(info) {
					case '0':
						alert('数据更新失败');
						break;
					case '1':
						alert('添加成功');
						break;
				}
			}
		});
	}
}

function toCart() {
	window.location.href = 'cart.html'
}