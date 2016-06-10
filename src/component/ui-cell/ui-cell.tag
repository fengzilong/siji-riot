import styles from './ui-cell.less';

<ui-cell>
	<div class="{ styles.left }">
		<i class="iconfont" style="font-size: .8rem;">{ opts.icon }</i>
		{ opts.text }
	</div>

	<div class="{ styles.right }">
		<div style="text-align: right;">
			<i class="iconfont" style="font-size: .8rem;color: #999;">&#xe605;</i>
		</div>
	</div>

	<script>
		this.styles = styles;
	</script>
</ui-cell>
