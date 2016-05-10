require('ui/ui-number-input');
require('ui/ui-toast');

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
		<ui-number-input value="{ store.getNum() }" onadd="{ onAdd }" onsubtract="{ onSubtract }"></ui-number-input>
		<div class="{ styles.add_to_cart }" onclick="{ onConfirmAddToCart }">
			放入购物篮
		</div>
	</div>

	<script>
		var self = this;
		this.store = require('store/detail');
		this.store.on('$UPDATE', function(){
			self.update();
		});

		this.styles = require('./page-detail.css');
		this.navBack = require('image/detail/nav_back.png');
		this.navCart = require('image/detail/nav_cart.png');

		this.onAdd = function(){
			self.store.trigger('ADD');
		};

		this.onSubtract = function(){
			self.store.trigger('SUBTRACT');
		};

		this.onConfirmAddToCart = function(){
			self.store.trigger('CART_ITEM_NUM_ADD_BY');
		};

		this.on('mount', function(){
			this.store.trigger(
				'GET_DETAIL_BY_ID',
				this.opts.pid
			);
		});
	</script>
</page-detail>
