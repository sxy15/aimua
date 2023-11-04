import markdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { kebabCase } from '@aimua/shared'
import { pinyin } from 'pinyin'
import type { Plugin } from 'vite'

function transformHash(hash: string) {
  return pinyin(hash, { style: 'tone2' }).flat(Infinity).join('-').replaceAll(' ', '-')
}

function extractComponents(source: string) {
  const componentRE = /import (.+) from ['"].+['"]/
  const importRE = /import .+ from ['"].+['"]/
  const vueRE = /```vue((.|\n)*?)```/g
  const components: string[] = []
  const imports: string[] = []

  source = source.replace(vueRE, (match, p1) => {
    const partImport = p1.match(importRE)

    const partComponents = partImport?.map((importer: string) => {
      importer = importer.replace(/(\n|\r)/g, '')
      const component = importer.replace(componentRE, '$1')
      !imports.includes(importer) && imports.push(importer)
      !components.includes(component) && components.push(component)

      return `<${kebabCase(component)} />`
    })

    return partComponents ? `<div class="aimua-component-preview">${partComponents.join('\n')}</div>` : ''
  })

  return {
    source,
    imports,
    components,
  }
}

function htmlWrapper(html: string) {
  const matches = html.matchAll(/<h3>(.*?)<\/h3>/g)
  const hGroup = html
    .replace(/<h3>/g, () => {
      const hash = transformHash(matches.next().value[1])

      return `:::<h3 id="${hash}"><router-link to="#${hash}">#</router-link>`
    })
    .replace(/<h2/g, ':::<h2')
    .split(':::')

  const cardGroup = hGroup
    .map((fragment) => (fragment.includes('<h3') ? `<div class="card">${fragment}</div>` : fragment))
    .join('')

  return cardGroup.replace(/<code>/g, '<code v-pre>')
}

function injectCodeExample(source: string) {
  const codeRE = /(<pre class="hljs">(.|\r|\n)*?<\/pre>)/g

  return source.replace(codeRE, (str) => {
    const flags = [
      '// playground-ignore\n',
      '<span class="hljs-meta">#</span><span class="bash"> playground-ignore</span>\n',
      '<span class="hljs-comment">// playground-ignore</span>\n',
      '<span class="hljs-comment">/* playground-ignore */</span>\n',
      '<span class="hljs-comment">&lt;!-- playground-ignore --&gt;</span>\n',
    ]

    const attr = flags.some((flag) => str.includes(flag)) ? 'playground-ignore' : ''

    str = flags.reduce((str, flag) => str.replace(flag, ''), str)

    return `<var-site-code-example ${attr}>${str}</var-site-code-example>`
  })
}

function highlight(str: string, lang: string, style?: string) {
  let link = ''

  if (style) {
    link = '<link class="hljs-style" rel="stylesheet" href="' + style + '"/>'
  }

  if (lang && hljs.getLanguage(lang)) {
    return (
      '<pre class="hljs"><code>' +
      link +
      hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
      '</code></pre>'
    )
  }

  return ''
}

function markdownToVue(source: string, options: MarkdownOptions) {
  const { source: vueSource, imports, components } = extractComponents(source)

  const md = markdownIt({
    html: true,
    highlight: (str, lang) => highlight(str, lang, options.style),
  })

  let templateString = htmlWrapper(md.render(vueSource))
  templateString = templateString.replace(/process.env/g, '<span>process.env</span>')
  templateString = injectCodeExample(templateString)

  return `
      <template><div class="varlet-site-doc">${templateString}</div></template>
      
      <script>
      ${imports.join('\n')}
      
      export default {
        components: {
          ${components.join(',')}
        }
      }
      </script>
  `
}

export interface MarkdownOptions {
  style?: string
}

export function markdown(options: MarkdownOptions): Plugin {
  return {
    name: 'vite-plugin-aimua-markdown',
    enforce: 'pre',
    transform(code, id) {
      if (!/\.md$/.test(id)) return

      try {
        markdownToVue(code, options)
      } catch (e: any) {
        this.error(e)
      }
    },
  }
}
