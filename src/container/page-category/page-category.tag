require('ui/ui-nav');

<page-category>
	<nav class="{ styles.nav }">
		<div
			class="{ styles.nav_item } { opts.category === 'sg' ? styles.active : '' }"
			onclick="SJ.route('category/sg')"
		>
			水果
		</div>
		<div
			class="{ styles.nav_item } { opts.category === 'sc' ? styles.active : '' }"
			onclick="SJ.route('category/sc')"
		>
			水产
		</div>
		<div
			class="{ styles.nav_item } { opts.category === 'rq' ? styles.active : '' }"
			onclick="SJ.route('category/rq')"
		>
			肉禽
		</div>
		<div
			class="{ styles.nav_item } { opts.category === 'gg' ? styles.active : '' }"
			onclick="SJ.route('category/gg')"
		>
			干果
		</div>
	</nav>

	<div if="{ loading }" class="{ styles.loading }">
		<img src="{ loadingImage }" alt="" />
		<div class="{ styles.loading_text }">
			努力加载中...
		</div>
	</div>

	<div if="{ !loading && items.length === 0 }" class="{ styles.empty_wrapper }">
		更多美食，备货ing
	</div>

	<div class="{ styles.items }" if="{ !loading && items.length > 0 }">
		<div each="{ items }" class="{ styles.item }" onclick="{ parent.onDetail }">
			<div class="{ parent.styles.item_inner }">
				<img class="{ parent.styles.item_image }" src="{ image }" alt="" />
				<div class="{ parent.styles.item_name }">
					{ title }
				</div>
				<div class="{ parent.styles.item_price_and_cart }">
					<div class="{ parent.styles.item_price }">
						&yen;{ price }
					</div>
					<div class="{ parent.styles.item_cart } iconfont" add onclick="{ parent.onAdd }">
						&#xe608;
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="{ styles.nomore }" if="{ !loading && items.length > 0 }">
		逛完啦~更多美味即将到来~
	</div>

	<ui-nav active="1" num2="{ cartStore.getTotalNum() }"></ui-nav>

	<script>
		var self = this;
		this.store = require('store/category');
		this.store.on('$UPDATE', function(){
			self.update();
		});

		this.cartStore = require('store/cart');
		this.cartStore.on('$UPDATE', function(){
			self.update();
		})

		this.styles = require('./page-category.css');
		this.loadingImage = require('image/lemon_loading.gif');

		this.onDetail = function(e) {
			if( !e.target.hasAttribute( 'add' ) ) {
				SJ.route( 'detail/' + e.item.pid );
			}
		};

		this.onAdd = function( e ) {
			e.preventUpdate = true;
			this.store.trigger('CART_ADD', e.item);
		};

		this.on('mount', function(){
			this.store.trigger(
				'GET_BY_CATEGORY',
				this.opts.category
			);
		});

		this.on('update', function(){
			this.items = this.store.getItems();
			this.loading = this.store.getLoading();
		});
	</script>
</page-category>
