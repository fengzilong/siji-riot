(function( global ){
	global.SJ = {};

	const slice = Array.prototype.slice;

	// ==========================
	// Transition
	// ==========================

	let indexElm = document.getElementById('J_main');
	let detailElm = document.getElementById('J_detail');

	let transition = ( fromRoute, toRoute ) => {
		if( __DEV__ ){
			console.log( 'from', fromRoute.name, 'to', toRoute.name );
		}

		if( fromRoute.el === null || fromRoute.el === toRoute.el ){
			// no animation
			let pageElm = document.querySelectorAll( '.page' );
			let fromElm = document.querySelector( fromRoute.el );
			let toElm = document.querySelector( toRoute.el );
			slice.call( pageElm ).forEach(( v, k ) => {
				v.classList.remove( 'page-current' );
			});
			toElm.classList.add( 'page-current' );
			return;
		}

		let onAnimationEnd;
		if(
			fromRoute.el === '#J_main' &&
			toRoute.el === '#J_detail'
		){
			onAnimationEnd = () => {
				indexElm.classList.remove('from-center-to-left');
				detailElm.classList.remove('from-right-to-center');
				indexElm.classList.remove('page-current');
				indexElm.removeEventListener('webkitAnimationEnd', onAnimationEnd, false);
			};
			indexElm.addEventListener('webkitAnimationEnd', onAnimationEnd, false);

			indexElm.classList.add('from-center-to-left');
			detailElm.classList.add('page-current');
			detailElm.classList.add('from-right-to-center');
		} else if(
			fromRoute.el === '#J_detail' &&
			toRoute.el === '#J_main'
		){
			onAnimationEnd = () => {
				indexElm.classList.remove('from-left-to-center');
				detailElm.classList.remove('from-center-to-right');
				detailElm.classList.remove('page-current');
				detailElm.removeEventListener('webkitAnimationEnd', onAnimationEnd, false);
			};
			detailElm.addEventListener('webkitAnimationEnd', onAnimationEnd, false);

			indexElm.classList.add('page-current');
			indexElm.classList.add('from-left-to-center');
			detailElm.classList.add('from-center-to-right');
		}
	};

	// ==========================
	//  Route
	// ==========================

	let _routeHistoryLog = [];

	SJ.routeHistory = {
		add({ name, el, url }) {
			// always keep lastest 10 records
			_routeHistoryLog = _routeHistoryLog.splice(-9, 9);
			_routeHistoryLog.push({ name, el, url });
		},
		get() {
			return _routeHistoryLog;
		},
		getLatest() {
			return _routeHistoryLog[ _routeHistoryLog.length - 1 ]
		}
	};

	SJ.route = ( ...args ) => {
		return riot.route( ...args );
	};

	SJ.route.back = () => {
		history.go(-1);
	};

	SJ.handleRoute = ({ name, url, el, target, once=true, title, component, data }) => {
		document.title = title;

		let elm = document.querySelector( target );
		if( !elm.hasAttribute( 'resolved' ) ){
			riot.mount(target, component, data || {});
			if( once ){
				elm.setAttribute( 'resolved', true );
			}
		}

		let lastRoute = SJ.routeHistory.getLatest();
		let hasRouteHistory = !!lastRoute;
		let toRoute = { name, el, url };
		let fromRoute = hasRouteHistory ? lastRoute : {
			name: null,
			el: null,
			url: null
		};

		// route to subpages in #J_main, modify current subpage
		if( el === '#J_main' ){
			let subpages = document.querySelectorAll('.subpage');
			slice.call( subpages ).forEach(( v, k ) => {
				if( '#' + v.id !== target ) {
					v.classList.remove('subpage-current');
				} else {
					v.classList.add('subpage-current');
				}
			});
		}

		transition( fromRoute, toRoute );

		SJ.routeHistory.add({ name, el, url });
	};

	// ==========================
	// Notify
	// ==========================

	class Toast {
		constructor( content, timeout ) {
			// TODO: toast实例超过两个则复用dom

			let mountNodeId = 'J_notify';
			this.timeout = timeout || 2000;

			let ts = +new Date();

			document.getElementById( mountNodeId ).innerHTML = `<div class="toast" id="J_toast${ts}">
				${content}
			</div>`;

			this.dom = document.getElementById(`J_toast${ts}`);
		}
		content( content ) {
			this.dom.innerHTML = content;
			return this;
		}
		show() {
			this.dom.style.display = 'block';

			setTimeout(() => {
				this.hide();
			}, this.timeout);

			return this;
		}
		hide() {
			this.dom.style.display = 'none';
			return this;
		}
	}

	SJ.toast = ( content ) => {
		return new Toast( content ).show();
	};

	// ==========================
	// Debug
	// ==========================

	if( __DEV__ ){
		window.riot = riot;
	}
})( window );
