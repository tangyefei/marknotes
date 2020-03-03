const boot = require('../app').boot
const shutdown = require('../app').shutdown
const port = require('../app').port
const superagent = require('superagent')
const expect = require('expect.js')

const seedArticles = require('../db/articles.json')

describe('server', () => {
  
  before(() => {
    boot()
  })

  describe('homepage', () => {

    it('should respond to GET', (done) => {
      // ...
    })

    it('should contain posts', (done) => {
      superagent
        .get(`http://localhost:${port}`)
        .end((error, res) => {
          expect(error).to.be(null)
          expect(res.text).to.be.ok
          seedArticles.forEach((item, index, list) => {
            if (item.published) {
              expect(res.text).to.contain(`<h2><a href="/articles/${item.slug}">${item.title}`)
            } else {
              expect(res.text).not.to.contain(`<h2><a href="/articles/${item.slug}">${item.title}`)
            }
          })
          done()
        })
    })
  })

  describe('article page', () => {
    it('should display text or 401', (done) => {
      let n = seedArticles.length
      seedArticles.forEach((item, index, list) => {
        superagent
          .get(`http://localhost:${port}/articles/${seedArticles[index].slug}`)
          .end((error, res) => {
            if (item.published) {
              expect(error).to.be(null)
              expect(res.text).to.contain(seedArticles[index].text)
            } else {
              expect(error).to.be.ok
              expect(res.status).to.be(401)
            }
            // console.log(item.title)
            if (index + 1 === n) {
              done()
            }
          })
      })
    })
  })
  
  after(() => {
    shutdown()
  })

})