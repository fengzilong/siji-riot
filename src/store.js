let data = {
	isLogin: false,
	cart: {
		num: 0,
		items: []
	},
	profile: {
		waitPayNum: 0,
		waitSendNum: 0,
		alreadySendNum: 0,
		addressList: [],
		defaultAddress: -1,
	},
	category: [
		{
			key: 'sg',
			name: '水果'
		},
		{
			key: 'sc',
			name: '水产'
		},
		{
			key: 'rq',
			name: '肉禽'
		},
		{
			key: 'gg',
			name: '干果'
		}
	],
	items: {
		sg: [],
		sc: [],
		rq: [],
		gg: [],
	}
};
