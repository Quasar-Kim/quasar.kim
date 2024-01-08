module.exports = eleventyConfig => {
    eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'))
    eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-rss'))

    eleventyConfig.addPassthroughCopy('src/css/*')
    eleventyConfig.addPassthroughCopy('src/font/*')
    eleventyConfig.addPassthroughCopy('src/static')
    eleventyConfig.addPassthroughCopy('src/robots.txt')
    eleventyConfig.addPassthroughCopy('src/favicon.ico')

    eleventyConfig.addFilter("yyyymmdd", date => date.toISOString().split('T')[0])

    return {
        passthroughFileCopy: true,
        dir: {
            input: 'src',
            includes: '_includes',
            data: '_data',
            output: '_site'
        }
    }
}
