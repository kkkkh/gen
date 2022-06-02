/**
 * From: https://github.com/egoist/codepan/blob/2c22bb3d7a7a4e31fd99fc640d320f7ec24d2951/src/utils/iframe.js
 */
class Iframe {
	$el: Element
	sandboxAttributes: string[] = []
	constructor({el, sandboxAttributes = []}: {el: Element; sandboxAttributes: string[]}) {
		this.$el = el
		this.sandboxAttributes = sandboxAttributes
	}

	setHTML(obj: string | {head: string; body: string}) {
		let html
		if (typeof obj === 'string') {
			html = obj
		} else {
			const {head = '', body = ''} = obj
			html = `<!DOCTYPE html><html><head>${head}</head><body>${body}</body></html>`
		}
		const iframe = this.createIframe()
		this.$el.parentNode?.replaceChild(iframe, this.$el)
		iframe.contentWindow?.document.open()
		iframe.contentWindow?.document.write(html)
		iframe.contentWindow?.document.close()
		this.$el = iframe
	}

	createIframe() {
		const iframe = document.createElement('iframe')
		iframe.setAttribute('sandbox', this.sandboxAttributes.join(' '))
		iframe.setAttribute('scrolling', 'yes')
		iframe.style.width = '100%'
		iframe.style.height = '100%'
		iframe.style.border = '0'
		return iframe
	}
}

export default (args: {el: Element; sandboxAttributes: string[]}) => new Iframe(args)
