import React from 'react'
import './Temp.css'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import Swal from 'sweetalert2'

function Temp() {
    const [data, setdata] = useState({
        celcius: '',
        name: '',
        humidity: '',
        speed: '',
        image: ''
    })
    const [name, setname] = useState('')


    const handleClick = () => {
        if (name !== '') {
            const Url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=2cfa31b3ec1242729f9834bb3850b070&units=metric`
            axios.get(Url)
                .then(res => {

                    let imagePath = ''
                    if (res.data.weather[0].main == 'Haze') {
                        imagePath = 'https://cdn1.iconfinder.com/data/icons/weather-471/128/HAZE-512.png'

                    } else if (res.data.weather[0].main == 'Clouds') {
                        imagePath = 'https://webstockreview.net/images/clipart-cloud-paper.png'

                    }
                    else if (res.data.weather[0].main == 'Mist') {
                        imagePath = 'https://cdn0.iconfinder.com/data/icons/weather-347/64/fog-weather-mist-512.png'

                    }



                    else {
                        imagePath = 'http://clipart-library.com/images_k/transparent-weather/transparent-weather-21.png'
                    }


                    console.log(res.data);
                    console.log(data);

                    setdata({ ...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, image: imagePath })
                })

                .catch(err => console.log(err))


        }else{
            Swal.fire("Please enter a City...")
        }
    }




    return (
        <div className='container'>
            <div className="weather">
                <div className="search">
                    <input className='inp' type="text" placeholder='enter city name' onChange={e => setname(e.target.value)} />
                    <button onClick={handleClick}>search</button>
                </div>
                <div className='weatherinfo'>
                    <img style={{ width: '200px' }} src={data.image} alt="" />

                </div>
                <div className='city'>
                    <h1>{Math.round(data.celcius)}℃</h1>
                    <h2>{data.name}</h2>
                </div>
                <div className='sub'>
                    <div className='hum' >
                        <img className='humidity' src="https://cdn-icons-png.flaticon.com/512/578/578135.png" alt="" />
                        <h1>{data.humidity}%</h1>
                    </div>
                    <div className='win'>
                        <img className='wind' src="https://cdn1.iconfinder.com/data/icons/hawcons/32/700211-icon-43-wind-512.png" alt="" />
                        <h2>{data.speed}km/hr</h2>
                    </div>
                </div>

            </div>



        </div>
    )
}
export default Temp
