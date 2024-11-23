import axios from 'axios'
import { jwtDecode } from 'jwt-decode';

// Create
    async function createData(url, data) 
    {
        try 
        {
            const response = await axios.post(url, data);
            return response.data;
        } 
        catch (error)
        {
            throw error; 
        }
    }


// Read
    function receiveData(data) 
    {
        return axios
            .get(data)
            .then(response => 
            {   
                const RESULT = response.data;
                return RESULT;
            })
            .catch(error => {console.error(error); });
    }

    function filterData(datas, model) 
    {
        let data_processed = 0

        if (datas.lenght > 1) 
        {
            data_processed =  datas.map(data => new model(...Object.values(data)));
        }
        else
        {
            data_processed = datas
        }
        return data_processed

    }

    async function processData(route, model)
    {
        const data_recived = await receiveData(route); 
        const data_processed = filterData(data_recived, model)

        return data_processed
    }
// Update
    async function updateData(url, data) 
    {
        try 
        {
            const response = await axios.put(url, data);
            return response.data;
        } 
        catch (error)
        {
            throw error;
        }
    }


// Delete
    async function deleteByStatus(route, urlRead)
    {
        try 
        {
            await axios.put(route)
        } 
        catch (error) {console.error(error);}
    }

    async function deleteById(route)
    {
        try 
        {
            await axios.delete(route)
        } 
        catch (error) {console.error(error);}
    }

// User
function getUser(token)
{
  if (token) 
  {
    try 
    {
      const decodedToken = jwtDecode(token)
      return  decodedToken;
    }
    catch (err) 
    {
      console.error('Erro ao decodificar token:', err)
    }
  }
}
    
export { processData, deleteByStatus, deleteById, createData, updateData, getUser };
