<page-cart>
	<div if="{ Object.keys(store.getCartItems()).length === 0 }" class="{ styles.empty }">
		<img class="{ styles.empty_icon }" src="{ emptyIcon }" alt="" />
		<div class="{ styles.empty_tip }">
			您还没有挑选任何商品哦~
		</div>
		<div href="javascript:;" onclick="SJ.route('/')" class="{ styles.button }">
			去逛逛吧
		</div>
	</div>

	<div class="{ styles.cart_items }">
		<div class="{ styles.cart_item }" each="{ k, v in store.getCartItems() }">
			<div class="{ styles.cart_item_image }">
				<img src="{ v.image }" alt="" />
			</div>
			<div class="{ styles.cart_item_detail }">
				<div class="{ styles.cart_item_name }">
					{ v.title }
				</div>
				<div class="{ styles.cart_item_price }">
					&yen;{ v.price }
				</div>
				<div class="{ styles.cart_item_num }">
					<ui-number-input value="{ v.num }" onsubtract="{ onSubtract }" onadd="{ onAdd }"></ui-number-input>
				</div>
			</div>
		</div>
	</div>

	<div class="{ styles.pay }" if="{ Object.keys(store.getCartItems()).length > 0 }">
		<div class="{ styles.amount }">
			合计：<span>&yen;{ store.getTotalAmount() + '' }</span>
		</div>
		<div class="{ styles.paybtn }">
			结算
		</div>
	</div>

	<ui-nav active="2" num2="{ store.getTotalNum() }"></ui-nav>

	<script>
		var self = this;
		this.store = require('store/cart');
		this.store.on('$UPDATE', function(){
			self.update();
		});

		this.styles = require('./page-cart.css');
		this.emptyIcon = require('image/cart/empty.png');
		this.onSubtract = function( e ){
			self.store.trigger('CART_ITEM_NUM_SUBTRACT', e.item.v.pid);
		};
		this.onAdd = function( e ){
			self.store.trigger('CART_ITEM_NUM_ADD', e.item.v.pid);
		};
	</script>
</page-cart>
