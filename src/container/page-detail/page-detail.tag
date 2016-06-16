import store from 'store/detail';

<page-detail>
	<div class="{ styles.container }">
		<div class="{ styles.sliders }">
			<img if="{ store.getSliderImages().length > 0 }" src="{ store.getSliderImages()[0] }" alt="" />
		</div>

		<div class="{ styles.title }">
			{ store.getTitle() }
		</div>

		<div class="{ styles.desc }">
			{ store.getDesc() }
		</div>

		<div class="{ styles.price }">
			<span class="{ styles.cprice }">&yen;{ store.getCurrentPrice() }</span>
			<span class="{ styles.oprice }">&yen;{ store.getOriginalPrice() }</span>
		</div>
	</div>

	<img class="{ styles.nav_back }" src="{ navBack }" onclick="SJ.route.back()" alt="" />
	<img class="{ styles.nav_cart }" src="{ navCart }" onclick="SJ.route('cart')" alt="" />

	<div class="{ styles.cartbar }" if="{ store.getDataReady() }">
		<ui-number-input
			value="{ store.getNum() }"
			on-add="{ onAdd }"
			on-subtract="{ onSubtract }"
			min="{ 1 }"
		></ui-number-input>
		<div class="{ styles.add_to_cart }" onclick="{ onConfirmAddToCart }">
			放入购物篮
		</div>
	</div>

	<script>
		this.styles = require('./page-detail.less');
		this.navBack = require('image/detail/nav_back.png');
		this.navCart = require('image/detail/nav_cart.png');

		this.store = store;
		this.store.on('$UPDATE', () => this.update());

		this.onAdd = () => this.store.trigger('ADD');
		this.onSubtract = () => this.store.trigger('SUBTRACT');
		this.onConfirmAddToCart = () => this.store.trigger('CART_ITEM_NUM_ADD_BY');

		this.on('mount', () => this.store.trigger( 'GET_DETAIL_BY_ID', this.opts.pid ));
	</script>
</page-detail>
