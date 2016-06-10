import styles from './ui-confirm.less';

<ui-confirm if="{ opts.show }">
	<div class="{ styles.base }">
		<div class="{ styles.content }">
			{ opts.content }
		</div>
		<div class="{ styles.actions }">
			<div class="{ styles.action } { styles.cancel }" onclick="{ opts.oncancel || noop }">
				{ opts.canceltext }
			</div>
			<div class="{ styles.action } { styles.ok }" onclick="{ opts.onok || noop }">
				{ opts.oktext }
			</div>
		</div>
	</div>

	<script>
		this.styles = styles;
		this.noop = () => {};
		this.on('mount', function(){

		});
	</script>
</ui-confirm>
