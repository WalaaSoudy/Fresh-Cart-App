import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from './../Loading/Loading';
const Brands = () => {
    let [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    async function getBrands() {
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
        console.log(data);
        setBrands(data.data);
        setLoading(false);
    }
    useEffect(() => {
        getBrands();
    }, [])
    return (
        <>
            <div className="container">
                <h1 className="text-center my-3">Brands</h1>
            {loading && <Loading/>}
                <div className="row">
                    {brands.map((elm) => (
                        <div className="col-md-3" key={elm._id}>
                            <img src={elm.image} className="w-100" alt="" />
                            
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Brands