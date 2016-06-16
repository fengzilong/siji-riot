import cartStore from 'store/cart';

<page-profile>
	<div class="{ styles.avatar_wrapper }">
		<img class="{ styles.avatar_image }" src="{ defaultAvatar }" alt="" />
	</div>
	<div class="{ styles.order_entries }">
		<div class="{ styles.order_entry }">
			<img src="{ icon0 }" alt="" />
			<br />
			全部订单
		</div>
		<div class="{ styles.order_entry }">
			<img src="{ icon1 }" alt="" />
			<br />
			待付款
		</div>
		<div class="{ styles.order_entry }">
			<img src="{ icon2 }" alt="" />
			<br />
			待发货
		</div>
		<div class="{ styles.order_entry }">
			<img src="{ icon3 }" alt="" />
			<br />
			已发货
		</div>
	</div>

	<ui-cells>
		<ui-cell icon="&#xe604;" text="红包"></ui-cell>
		<ui-cell icon="&#xe606;" text="我的地址"></ui-cell>
		<ui-cell icon="&#xe609;" text="意见反馈"></ui-cell>
		<ui-cell icon="&#xe607;" text="帮助中心"></ui-cell>
	</ui-cells>

	<ui-nav active="{ activeTabIndex }" num2="{ cartStore.getTotalNum() }"></ui-nav>

	<script>
		this.cartStore = cartStore;
		this.cartStore.on('$UPDATE', () => this.update());

		this.styles = require('./page-profile.less');
		this.defaultAvatar = require('image/profile/default_avatar.png');
		this.icon0 = require('image/profile/order_icon_01.png');
		this.icon1 = require('image/profile/order_icon_02.png');
		this.icon2 = require('image/profile/order_icon_03.png');
		this.icon3 = require('image/profile/order_icon_04.png');
		this.activeTabIndex = 3;
	</script>
</page-profile>
