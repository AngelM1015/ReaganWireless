const express = require("express");
const router = express.Router();
const { createClient } = require('@supabase/supabase-js')
const jsonfile = require("jsonfile");
const jp = require("jsonpath");
const path = "./config.json";

async function generate() {
  const dataDump = await jsonfile.readFile(path);
  return dataDump;
}

// READ ONLY KEYS FOR DEMO PURPOSES
const SUPABASE_URL = 'https://cthyqyqhidllkckwyvxy.supabase.co'
const SUPABASE_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0aHlxeXFoaWRsbGtja3d5dnh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5ODU1NTUsImV4cCI6MTk4MDU2MTU1NX0.H3rXA3-u0HY2Z-020zJVfTakf3T6VcZjE78eMEgl5Zc`

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

router.get("/test-Supabase", async (req, res, next) => {
    return res.status(200).json({
      title: "Testing Supabase",
      message: "The app is working properly!",
    });
  });

  router.get("/getUsers", async (req, res) => {
    const getUsers = await generate().then((data) => {
      let query = jp.query(data, `$..userJsonData`);
      return query[0];
    });
    res.send(getUsers);
  });

router.get("/users", async (req, res, next) => {
    let { data, error } = await supabase
    .from('users')
    .select('fName, email')
    .order('email', {ascending: true})
    .range(0,10)

    console.log(data)

    if (error) {
        console.error(error)
      } else {
        return res.status(200).json({
           data
          })
      }
  });

module.exports = router;
