import { GitHubApiClient } from '../src/index'
const sqlite3 = require('sqlite3')

describe('GitHubApiClient', () => {
  beforeEach(async (done) => {
    done()
  })

  test('check for Mike Chirico', async (done) => {
    const g = new GitHubApiClient()

    g.fetchUser('mchirico')
      .then((user) => {
        console.log(user.name)
        expect(user.name).toContain('Mike Chirico')
        done()
      })
      .catch(err => {
        console.error(`Error: ${err.message}`)
      })
  })

  test('test sqlite', (done) => {
    const db = new sqlite3.Database('test.db')

    db.serialize(function () {
      db.run('CREATE TABLE IF NOT EXISTS lorem (info TEXT)')

      var stmt = db.prepare('INSERT INTO lorem VALUES (?)')
      for (var i = 0; i < 10; i++) {
        stmt.run('Ipsum ' + i)
      }
      stmt.finalize()

      db.each('SELECT count(*) as total FROM lorem',
        function (err: string, row: { total: string}) {
          if (err !== null) {
            console.log(row.total + ': ' + err)
          } else {
            console.log('total count: ' + row.total)
          }
        })

      db.each('SELECT rowid AS id, info FROM lorem limit 3',
        function (err: string, row: { id: string; info: string }) {
          if (err !== null) {
            console.log(row.id + ': ' + row.info + ' ' + err)
          } else {
            console.log(row.id + ': ' + row.info + ' ')
          }
        }).close(() => {
        done()
      })
    })

    // db.close()
  })

  afterEach(() => {

  })
})
