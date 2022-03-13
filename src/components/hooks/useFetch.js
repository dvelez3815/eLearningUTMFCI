import {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getData = async (url) => {
            try{
                let res = await fetch(url,{
                    method: 'GET',
                    headers: {
                        'token': cookies.get("token"),
                        },
                });
                if(!res.ok){
                    throw {err:true, status: res.status, statusText: !res.statusText?"Ocurrió un error":res.statusText};
                }
                let data = await res.json();
                setData(data);
            }catch(err){
                setError(err); 
                setLoading(true);
            }
        }
        getData(url);
    },[url]);

    return {data, loading, error};
}