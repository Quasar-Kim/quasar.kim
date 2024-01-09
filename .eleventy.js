const fs = require("fs")
const CleanCSS = require("clean-css")

const seriesInfo = JSON.parse(fs.readFileSync("src/_data/series.json"))

module.exports = eleventyConfig => {
    eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'))
    eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-rss'))

    eleventyConfig.addPassthroughCopy('src/css/*')
    eleventyConfig.addPassthroughCopy('src/font/*')
    eleventyConfig.addPassthroughCopy('src/static')
    eleventyConfig.addPassthroughCopy('src/robots.txt')
    eleventyConfig.addPassthroughCopy('src/favicon.ico')

    eleventyConfig.addFilter("yyyymmdd", date => date.toISOString().split('T')[0])
    eleventyConfig.addFilter("hasSeriesTag", tags => tags.map(t => t.startsWith("series-")).reduce((acc, x) => acc + x, 0) === 1)
    eleventyConfig.addFilter("cssmin", code => new CleanCSS({}).minify(code).styles)

    eleventyConfig.addNunjucksGlobal("getSeriesTag", tags => {
        for (t of tags) {
            if (t.startsWith("series-")) return t
        }
        return null
    })
    eleventyConfig.addNunjucksGlobal("getSeriesInfo", seriesTag => {
        const seriesName = seriesTag.substring("series-".length)
        for (s of seriesInfo) {
            if (s.tag === seriesTag) return s
        }

        return null
    })

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
