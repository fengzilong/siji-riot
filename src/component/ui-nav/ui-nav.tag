import styles from './ui-nav.less';

<ui-nav>
	<nav class="{ styles.nav }">
		<div
			class="{ styles.nav_item } { styles.home } { opts.active == 0 ? styles.active : '' }"
			ontouchstart="SJ.route('/')"
		>
			<div class="iconfont { styles.icon }">
				&#xe600;
			</div>
			首页
			<span class="{ styles.num }" if="{ typeof opts.num0 !== 'undefined' && opts.num0 > 0 }">{ opts.num0 }</span>
		</div>

		<div
			class="{ styles.nav_item } { styles.category } { opts.active == 1 ? styles.active : '' }"
			ontouchstart="SJ.route('category/sg')"
		>
			<div class="iconfont { styles.icon }">
				&#xe601;
			</div>
			分类
			<span class="{ styles.num }" if="{ typeof opts.num1 !== 'undefined' && opts.num1 > 0 }">{ opts.num1 }</span>
		</div>

		<div
			class="{ styles.nav_item } { styles.cart } { opts.active == 2 ? styles.active : '' }"
			ontouchstart="SJ.route('cart')"
		>
			<div class="iconfont { styles.icon }">
				&#xe603;
			</div>
			购物篮
			<span class="{ styles.num }" if="{ typeof opts.num2 !== 'undefined' && opts.num2 > 0 }">{ opts.num2 }</span>
		</div>

		<div
			class="{ styles.nav_item } { styles.profile } { opts.active == 3 ? styles.active : '' }"
			ontouchstart="SJ.route('profile')"
		>
			<div class="iconfont { styles.icon }">
				&#xe602;
			</div>
			我的
			<span class="{ styles.num }" if="{ typeof opts.num3 !== 'undefined' && opts.num3 > 0 }">{ opts.num3 }</span>
		</div>
	</nav>
	<script>
		this.styles = styles;
	</script>
</ui-nav>
