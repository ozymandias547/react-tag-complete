import '../lib/styles.scss'
import domready from 'domready'
import React from 'react'
import ReactDOM from 'react-dom'
import BasicExample from './basic/';

domready(function () {
	ReactDOM.render(<BasicExample />, document.querySelector(".reactApp"));
});