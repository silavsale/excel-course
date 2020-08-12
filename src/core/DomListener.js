import {capitalize} from './utils'

export class DomListener {

	constructor($root, listeners = []) {
		if (!$root) {
			throw new Error(`No $root providet for DomListener`)
		}

		this.$root = $root
		this.listeners = listeners
	}

	initDOMListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)
			if (!this[method]) {
				throw new Error(`Method is not implemented in ${this.name} Component`)
			}
			this[method] = this[method].bind(this)
			// the same thing thet addEventListener
			this.$root.on(listener, this[method])
		})
	}

	removeDOMListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)
			this.$root.off(listener, this[method])
		})
	}

}

// input => onInput
function getMethodName(eventName) {
	return 'on' + capitalize(eventName)
}
