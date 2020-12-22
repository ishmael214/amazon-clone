import React from 'react'

import './homepage.styles.css';

import Product from '../../components/products/products.component';

function Homepage() {
    return (
        <div className='home'>
            <div className="home__container">
                <img className='home__image'
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" 
                    alt="something boring"
                />

                <div className="home__row">
                    <Product 
                        id = '1234124'
                        title='Wireless Earbuds Bluetooth 5.0 Mini Headphones, IPX5 Waterproof 
                        Headset Hi-Fi Stereo in-Ear Earphones with 350Mah Charging Case, Touch 
                        Control with Built-in Mic for Gym, Sports, Workout (Matte Black)'
                        price={29.99}
                        image='https://images-na.ssl-images-amazon.com/images/I/71o1l2HRXWL._AC_SL1500_.jpg'
                        rating={5}    
                    />
                    <Product 
                        id='25738094'
                        title='SAMSUNG 65-inch Class Crystal UHD TU-8000 Series - 
                        4K UHD HDR Smart TV with Alexa Built-in (UN65TU8000FXZA, 2020 Model)' 
                        price={659.99}
                        rating={5}
                        image='https://images-na.ssl-images-amazon.com/images/I/71RiQZ0J2SL._AC_SL1000_.jpg'   
                    />
                </div>

                <div className="home__row">
                    <Product 
                        id='345421'
                        title="The Unofficial Harry Potter Cookbook: From Cauldron Cakes to 
                        Knickerbocker Glory--More Than 150 Magical Recipes for Wizards and 
                        Non-Wizards Alike (Unofficial Cookbook)" 
                        price={10.72}
                        rating={4}
                        image='https://images-na.ssl-images-amazon.com/images/I/51jQvLgbzZL._SX370_BO1,204,203,200_.jpg'   
                    />
                    
                    <Product 
                        id='65244094'
                        title='DuraSafe Cases for iPad PRO 11-1 Generation' 
                        price={16.99}
                        rating={3}
                        image='https://images-na.ssl-images-amazon.com/images/I/71ayM8E27xL._AC_SL1500_.jpg'   
                    />
                    
                    <Product 
                        id='215333921'
                        title='KODAK SCANZA Digital Film & Slide Scanner - Converts 35mm, 126, 
                        110, Super 8 & 8mm Film Negatives & Slides to JPEG' 
                        price={119.99}
                        rating={4}
                        image='https://images-na.ssl-images-amazon.com/images/I/71EndQiuq-L._AC_SL1500_.jpg'   
                    />
                    

                </div>

                <div className="home__row">
                    <Product 
                        id='49538094'
                        title='Nintendo Switch - Mario Kart 8 Deluxe Blue & Red Joy-Con Consoles W/ 
                        69 Value 13 in 1 Supper Carrying Case (Earphone, LCD film, Card Case, Silicon 
                        Case x 2pcs, Carry Bag, Wiping cloth etc.)' 
                        price={499.99}
                        rating={5}
                        image='https://images-na.ssl-images-amazon.com/images/I/71e-vDJqjDL._SL1500_.jpg'   
                    />
                </div>

            </div>
        </div>
    )
}

export default Homepage
