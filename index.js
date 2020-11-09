'use strict';
const faunadb = require('faunadb');
const express = require('express')
const app = express()
const port = 3001
const fs = require('fs')

const q = faunadb.query;
const client = new faunadb.Client({ secret: 'fnAD5_no-RACBfEBngVhP0ZFtlQM1RDOqINAqU71' });
const {
  Map,
  Paginate,
  Collection,
  Lambda,
  Get,
  Var,
  Index,
  Match,
  Update,
  Ref,
  Delete,
  Create
} = q;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/importactor', function(req,res) {
  let rawdata = fs.readFileSync('film.imdb.json');
  let student = JSON.parse(rawdata);
  console.log(student);
  client
  .query(
    Map(
      [
        student
      ],
      Lambda(
        'post_title',
        Create(
          Collection('films'),
          { data: { title: Var('post_title') } },
        )
      ),
    )
  )
  res.send("Post done!")
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})