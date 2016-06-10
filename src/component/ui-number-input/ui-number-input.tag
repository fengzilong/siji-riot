import styles from './ui-number-input.less';

<ui-number-input>
	<div class="{ styles.action } { styles.actin_subtract }" onclick="{ opts.onsubtract }">
		-
	</div>
	<div class="{ styles.num }">
		{ opts.value }
	</div>
	<div class="{ styles.action } { styles.action_add }" onclick="{ opts.onadd }">
		+
	</div>

	<script>
		this.styles = styles;
	</script>
</ui-number-input>
