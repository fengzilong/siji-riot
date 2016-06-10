import styles from './ui-number-input.less';

<ui-number-input>
	<div class="{ styles.action } { styles.actin_subtract } { opts.value <= min ? styles.disabled : '' }" onclick="{ onSubtract }">
		-
	</div>
	<div class="{ styles.num }">
		{ opts.value }
	</div>
	<div class="{ styles.action } { styles.action_add } { opts.value >= max ? styles.disabled : '' }" onclick="{ onAdd }">
		+
	</div>

	<script>
		this.styles = styles;
		this.min = this.opts.min || -Infinity;
		this.max = this.opts.max || Infinity;

		this.onSubtract = e => {
			if( this.opts.value <= this.min ) {
				return;
			}
			this.opts.onSubtract && this.opts.onSubtract( e );
		};

		this.onAdd = e => {
			if( this.opts.value >= this.max ) {
				return;
			}
			this.opts.onAdd && this.opts.onAdd( e );
		};
	</script>
</ui-number-input>
