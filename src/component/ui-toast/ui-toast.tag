import styles from './ui-toast.less';

<ui-toast>
	<div class="{ styles.base }">
		{ opts.content }
	</div>
	<script>
		this.styles = styles;
	</script>
</ui-toast>
