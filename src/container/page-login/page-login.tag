import store from 'store/login';

<page-login>
	<div if="{ store.getShowLogin() }" class="{ styles.base }">
		<div class="{ styles.logo }">
			<img class="{ styles.logo_image }" src="{ logo }" alt="" />
		</div>

		<form class="{ styles.form }">
			<input class="{ styles.form_input }" type="text" name="username" value="" placeholder="用户名">
			<input class="{ styles.form_input }" type="password" name="password" value="" placeholder="密码">
			<div class="{ styles.button }" onclick="{ doLogin }">登录</div>
		</form>
	</div>

	<script>
		this.styles = require('./page-login.css');
		this.logo = require('image/login/logo.png');

		this.store = store;
		this.store.on('$UPDATE', () => this.update());

		this.doLogin = () => {
			this.store.trigger(
				'DO_LOGIN',
				this.username.value,
				this.password.value
			);
		};
	</script>
</page-login>
