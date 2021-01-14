const APP = 'AutoInputYShop';
const LOG = ( t ) => { console.log( `${ APP }: ${ t }` ); };
const TLOG = () =>
{
	let timer = 0;
	return ( output ) =>
	{
		if ( timer ) { clearTimeout( timer ); }
		timer = setTimeout( () =>
		{
			LOG( output );
			timer = 0;
		}, 500 );
	};
};
LOG( 'Start' );
( () =>
{
	function GetInputs()
	{
		const data = {};

		[
			'shopping_order_card_no',
			'shopping_order_card_exp_month',
			'shopping_order_card_exp_year',
			'shopping_order_card_owner',
			'shopping_order_security_code',
		].forEach( ( id ) =>
		{
			const input = document.getElementById( id );
			if ( !input ) { return; }
			data[ id ] = input;
		} );	

		return data;
	}

	function InitInput()
	{
		const data = GetInputs();
		if (
			!data.shopping_order_card_no ||
			!data.shopping_order_card_exp_month ||
			!data.shopping_order_card_exp_year ||
			!data.shopping_order_card_owner ||
			!data.shopping_order_security_code
		) {
			return false;
		}

		LOG( 'Init' );

		[
			'shopping_order_card_no',
			'shopping_order_card_owner',
			'shopping_order_security_code',
		].forEach( ( id ) =>
		{
			const tlog = TLOG();
			const input = data[ id ];
			input.addEventListener( 'change', () =>
			{
				const value = input.value;
				sessionStorage.setItem( id, value );
				tlog( `Update[${ id }] ... ${ value }` );
			} );
			const value = sessionStorage.getItem( id ) || '';
			if ( !value ) { return; }
			input.value = value;
			LOG( `Set[${ id }] ... ${ value }` );
		} );
		[
			'shopping_order_card_exp_month',
			'shopping_order_card_exp_year',
		].forEach( ( id ) =>
		{
			const tlog = TLOG();
			const select = data[ id ];
			select.addEventListener( 'change', () =>
			{
				const value = select.options[ select.selectedIndex ].value || '';
				sessionStorage.setItem( id, value );
				tlog( `Update[${ id }] ... ${ value }` );
			} );
			for ( let i = select.options.length - 1 ; 0 <= i ; --i )
			{
				if ( select.options[ i ].value === sessionStorage.getItem( id ) )
				{
					select.selectedIndex = i;
					LOG( `Set[${ id }] ... ${ select.options[ i ].value }` );
				}
			}
		} );

		return true;
	}

	let setuped = InitInput();
	LOG( setuped ? 'Success!' : 'Failure' );
} )();
