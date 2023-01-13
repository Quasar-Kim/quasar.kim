module.exports = eleventyConfig => {
    eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'))

    eleventyConfig.addPassthroughCopy('src/css/*.css')

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
