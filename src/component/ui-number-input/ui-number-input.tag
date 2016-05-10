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
		// 展示/木偶型组件，数据映射到ui，用户行为对外输出，绝不自行修改状态，由外界传入更改后的opts.value
		this.styles = require('./ui-number-input.css');
	</script>
</ui-number-input>
