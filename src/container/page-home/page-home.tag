require('ui/ui-nav');

<page-home>
	<img src="{ banner }" style="height: 7rem;" />

	<nav class="{ styles.category_nav }">
		<div class="{ styles.category_nav_item }" onclick="SJ.route('category/sg')">
			<img src="{ icon0 }" alt="" />
			<br />
			水果
		</div>
		<div class="{ styles.category_nav_item }" onclick="SJ.route('category/sc')">
			<img src="{ icon1 }" alt="" />
			<br />
			水产
		</div>
		<div class="{ styles.category_nav_item }" onclick="SJ.route('category/rq')">
			<img src="{ icon2 }" alt="" />
			<br />
			肉禽
		</div>
		<div class="{ styles.category_nav_item }" onclick="SJ.route('category/gg')">
			<img src="{ icon3 }" alt="" />
			<br />
			干果
		</div>
	</nav>

	<ui-nav active="{ activeTabIndex }" num2="{ cartStore.getTotalNum() }"></ui-nav>

	<script>
		this.cartStore = require('store/cart');
		this.cartStore.on('$UPDATE', () => {
			this.update();
		});

		this.styles = require('./page-home.css');
		this.banner = require('image/home/banner.jpg');
		this.icon0 = require('image/home/cate_icon_01.png');
		this.icon1 = require('image/home/cate_icon_02.png');
		this.icon2 = require('image/home/cate_icon_03.png');
		this.icon3 = require('image/home/cate_icon_04.png');
		this.activeTabIndex = 0;

		// 每个page内部有一个loading方法，供外部调用，再提供一个render方法，调用内部的update进行更新
		this.on('mount', function(){
		});
	</script>
</page-home>
