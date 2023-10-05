import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import Loading from './../Loading/Loading';
import { useQuery } from 'react-query';

const Category = () => {
    let {} =useQuery("categories",getCategories)
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows:false
      };
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    
    async function getCategories() {
       
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
            console.log(data);
            setCategories(data.data);
            setLoading(false);
       
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <h1 className='text-center my-5'>Categories</h1>
            {loading && <Loading/>}
        <div className='my-5'>
            <Slider {...settings}>
                {categories.map((category) => (
                    <div key={category.id}> {/* Add a unique key */}
                        <img src={category.image} className='w-100' height={300} alt="" />
                    </div>
                ))}
            </Slider>
            </div>
        </>
    )
}

export default Category;
