const pgPool = require('../postgre/connection');
const apiurl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
require('dotenv').config({path:('../.env')});
const axios = require('axios');




async function getPopularMovies() {
    try {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        headers: {
          accept: 'application/json',
          Authorization: process.env.MOVIEDB_API_KEY
        }
      };
  
      const response = await axios.request(options);
      return response.data.results;
      
    } catch (error) {
      throw error;
    }
  }

async function searchMovies(search){
  try {
    const options = {
      method: 'GET',
      //todo remove "+"
      url: `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${search}`,
      headers: {
        accept: 'application/json',
        Authorization: process.env.MOVIEDB_API_KEY
      }
    };


    const response = await axios.request(options);
    return response.data.results;
    
  } catch (error) {
    throw error;
  }
}


module.exports = {getPopularMovies,searchMovies};