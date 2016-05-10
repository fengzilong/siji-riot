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
		var self = this;
		this.store = require('store/login');
		this.store.on('$UPDATE', function(){
			self.update();
		});

		this.styles = require('./page-login.css');
		this.logo = require('image/login/logo.png');

		this.doLogin = function(){
			self.store.trigger(
				'DO_LOGIN',
				self.username.value,
				self.password.value
			);
		};
	</script>
</page-login>
