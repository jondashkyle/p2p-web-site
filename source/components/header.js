var Page = require('enoki/page')
var html = require('choo/html')
var css = require('sheetify')

var styles = css`
  :host .breadcrumbs span:first-child:after,
  :host .breadcrumbs span:not(:last-child):after {
    display: inline-block;
    content: '/';
    margin: 0 0.5rem;
  }

  :host .header-empty-line {
    background: #000;
    height: 0.05em;
    width: 4rem;
    margin-bottom: 0.1em;
    align-self: flex-end;
  }
`

module.exports = header

function header (state, emit, props) {
  var page = Page(state)
  props = props || { }

  return html`
    <div class="psr z3 fs1 c12 lh1 p0-5 x xjb ${styles}">
      <div class="p0-5 x breadcrumbs wsnw oh toe"> 
        <span><a href="/">Peer-to-Peer Web</a></span>
        ${breadcrumbs({
          content: state.content,
          page: page().value()
        })}
      </div>
      <div class="p0-5">
        <a href="?subscribe=active">Subscribe</a>
      </div>
    </div>
  `
}

function breadcrumbs (props) {
  props = props || { }
  content = props.content || { }
  var page = props.page || { }
  var path = page.url || ''

  var pagePaths = path
    .split('/')
    .filter(str => str)
    .reduce(function (result, path) {
      var href = result.map(crumb => crumb.path).join('/') + '/' + path
      result.push({
        path: path,
        el: html`<span class="wsnw toe"><a href="${href}">${content[href].title}</a></span>`
      })
      return result
    }, [{ path: '', el: ''}])

    var result = pagePaths
      .reduce(function (arr, crumb) {
        arr.push(crumb.el)
        return arr
      }, [ ])

    if (result.length <= 1) return html`<div class="header-empty-line"></div>`
    else return result
}