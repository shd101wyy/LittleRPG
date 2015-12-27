'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

import './less/entry.less'

import Console from './data/console.js'

Array.prototype.randomPick = function() {
  return this[Math.floor(Math.random() * this.length)]
}

ReactDOM.render(
  <Console></Console>,
  document.getElementById('app')
)
