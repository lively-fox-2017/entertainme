const axios = require('axios')

class modelentertaint {
  static async getAll(){
    try{
      const apiMOvies = await axios.get('http://localhost:3001/movies')
      const apiTV = await axios.get('http://localhost:3002/TV')
      const myapi = JSON.stringify({movie:apiMOvies.data,series:apiTV.data})
      return myapi
    }catch (err){
      return err
    }
  }
}

module.exports = modelentertaint;
