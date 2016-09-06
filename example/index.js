import '../lib/styles.scss'
import domready from 'domready'
import React from 'react'
import ReactDOM from 'react-dom'
import BasicExample from './basic/';
import EmailExample from './email/';

domready(function () {
	ReactDOM.render(<div>
		<BasicExample />
		<EmailExample />
	</div>, document.querySelector(".reactApp"));
});