import React from 'react'
import { useAuth } from "../context/Auth"
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Animate } from 'react-simple-animate'

function CarouselFadeExample() {
  return (
    <Carousel fade>
      <Carousel.Item >
        <img
          style={{ height: "800px", objectFit: "inherit" }}
          className="d-block w-100"
          src="https://i.etsystatic.com/33826835/r/il/578335/4250410306/il_fullxfull.4250410306_79db.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "800px", objectFit: "cover" }}
          className="d-block w-100"
          src="https://cdn.shopify.com/s/files/1/0414/7209/8467/files/Untitled_design-15_1000x.jpg?v=1659547086"
          alt="Second slide"
        />


      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "800px", objectFit: "inherit" }}
          className="d-block w-100"
          src="https://cdn.shopify.com/s/files/1/0596/1505/1965/files/SF22.png"
          alt="Third slide"
        />

      </Carousel.Item>

    </Carousel>
  );
}


const categoryArr = [
  {
    img: "https://img.theloom.in/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/2/6/26-aug01155_2.jpg",
    category: "women-collection"
  },
  {
    img: "https://media.istockphoto.com/id/1425659954/photo/lifestyle-and-luxury-businessman-fashion-model-in-studio-photoshoot-for-wealthy-and-rich.jpg?b=1&s=170667a&w=0&k=20&c=279yVUji5fkmxDm6pACStKqDk0DEn7FZB_iJQqumeIw=",
    category: "men-collection"
  },
  {
    img: "https://threadcurve.com/wp-content/uploads/2021/03/types-of-perfume-Mar222021-1-min.jpg",
    category: "perfume"
  },
  {
    img: "https://cdn.shopify.com/s/files/1/0555/8658/6685/products/HNFC965019M3_0_1728x.jpg?v=1680341016",
    category: "handbag"
  },
  {
    img: "https://www.usdermatologypartners.com/wp-content/uploads/2020/04/AdobeStock_288323434-small3x2.jpg",
    category: "skin-care"
  },
  {
    img: "https://img.freepik.com/free-photo/portrait-model-with-perfect-skin-bright-make-up-big-pink-lips-necklace_273443-2102.jpg?w=360&t=st=1681014017~exp=1681014617~hmac=9da8434ec301f4e77c01f522801885496dea9af7003e80c1deb7549ad7f66e0b",
    category: "makeup"
  },
  {
    img: "https://cdn.shopify.com/s/files/1/0061/8378/0442/products/BR043_222_1024x1024.jpg?v=1675687508",
    category: "accessories"
  },
  {
    img: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/9/8/tr:w-480,/980c599MONRO00004353_first.jpg?rnd=20200526195200",
    category: "footwear"
  }
]

const HomePage = () => {
  const [auth, setAuth] = useAuth()
  return (
    <div>
      <div className="main-div">
        <div className='img-div'>
          <div className='inner-div'>
            <h1>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("Shopify")
                    .start();
                }}
              />
            </h1>
            <h3>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("Shop till you drop")
                    .start();
                }}
              />
            </h3>
          </div>
        </div>

        <div className="overlay"></div>
      </div>

      <h1 className="heading">TODAY'S FASHION DEALS</h1>

      <div className="cont">
        <div className='col1'>
          <h1>shopping</h1>
          <p>Get crazy deals on your favourite brands  </p>
           <Link to="/products/women-sarees"><button className='btn'>EXPLORE</button></Link>
        </div>

        <div className='col2'>

          <Link to="/products/women-sarees">
            <div className='card card1'>
              <h5>Designer Saress</h5>
              <p>Saree Divas</p>
            </div>
          </Link>

          <Link to="/products/men-ethnic">
            <div className='card card2'>
              <h5>Men Kurta</h5>
              <p>Uniquely You</p>
            </div>
          </Link>

          <Link to="/products/women-partywear-dresses">
            <div className='card card3'>
              <h5>Western Wear</h5>
              <p>Be Fabulla</p>
            </div>
          </Link>

          <Link to="/products/watch">
            <div className='card card4'>
              <h5>Watches</h5>
              <p>Quality Time</p>
            </div>
          </Link>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h1 className='heading'>SHOP BY CATEGORY</h1>
      </div>

      <div style={{
        marginTop: '50px',
        display: "grid",
        gridTemplateColumns: 'repeat(4,1fr)',
        width: "100%",
        margin: "auto",
        backgroundColor: " rgb(129,36,83)",
        paddingBottom: "20px",
        paddingRight: "20px",
        paddingLeft: "20px",

      }}
        className="category-card-div"
      >

        {
          categoryArr.map((item) =>
            <Animate
              play
              duration={1.5}
              delay={1}
              start={{
                transform: "translateX(-900px)"
              }}
              end={{
                transform: "translateX(0px)"
              }}
            >
              <Link to={`/products/${item.category}`}>
                <div className="card" style={{ width: "18rem", width: "350px", margin: 'auto', marginTop: "20px", border: "none", borderRadius: '0px', overflow: 'hidden' }}>
                  <img src={item.img} className="card-img-top" style={{ height: "350px", margin: "auto", borderRadius: "0px" }} alt="..." />
                  <div className="card-body">
                    <h5 className="card-title text-center">{item.category}</h5>
                  </div>
                </div>
              </Link>
            </Animate>
          )
        }

      </div>

      <Animate
        play
        duration={1.5}
        delay={1}
        start={{
          transform: "translateX(900px)"
        }}
        end={{
          transform: "translateX(0px)"
        }}
      >
        <div style={{ marginTop: "20px" }}>
          <h1 className='heading'>OFFERS</h1>
        </div>
      </Animate>

      <CarouselFadeExample />

      <Animate
        play
        duration={1.5}
        delay={1}
        start={{
          transform: "translateX(-900px)"
        }}
        end={{
          transform: "translateX(0px)"
        }}
      >

        <div className="info">
          <div>
            <img
              src="https://imgmedia.lbb.in/media/2022/05/627a573f87986d206a8dc88b_1652184895730.jpg"
              alt="sugar"
            />
          </div>

          <div>
            <h1>Incredible Prices On All Your Favourite Items</h1>
            <button>SHOP NOW</button>
          </div>
        </div>
      </Animate>

      <Animate
        play
        duration={1.5}
        delay={1}
        start={{
          transform: "translateX(900px)"
        }}
        end={{
          transform: "translateX(0px)"
        }}
      >

        <div className="info2">
          <div>
            <h1>ADDING SPEED TO YOUR DELIVERIES</h1>

          </div>

          <div>
            <div className='circle'>
              <img
                src="https://img.freepik.com/free-vector/detailed-click-collect-sign_23-2148787027.jpg?w=740&t=st=1680975826~exp=1680976426~hmac=db3c20feea8a371a394c86cd6b464e13d0dd9a4f0f33410632412f24068dc68b"
                alt="shop"
              />
            </div>
          </div>
        </div>
      </Animate>

      <h1 className="heading">MOST WANTED BRANDS WORLDWIDE</h1>
      <Animate
        play
        duration={1.5}
        delay={1}
        start={{
          transform: "translateX(-900px)"
        }}
        end={{
          transform: "translateX(0px)"
        }}
      >
        <div className='brands'>
          <div>
            <img src="https://logos-download.com/wp-content/uploads/2016/03/Lee_logo.jpg"
              alt="brand"
            />
          </div>
          <div>
            <img src="https://entrackr.com/storage/2022/03/Sugar.jpg"
              alt="brand"
            />
          </div>

          <div>
            <img src="https://images.pexels.com/photos/2491123/pexels-photo-2491123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="brand"
            />
          </div>

          <div>
            <img src="https://upload.wikimedia.org/wikipedia/en/b/b2/Logo_of_Biba_Apparels.png"
              alt="brand"
            />
          </div>

          <div>
            <img src="https://i.pinimg.com/736x/9c/9f/ca/9c9fca062b85813137d232a2af146e64.jpg"
              alt="brand"
            />
          </div>

          <div>
            <img src="https://img2.goodfon.com/wallpaper/nbig/5/10/nike-brand-znak-brend-logo.jpg"
              alt="brand"
            />
          </div>

          <div>
            <img src="https://wallpaper.dog/large/315203.jpg" alt="brand" />
          </div>

          <div>
            <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/S/abs-image-upload-na/c/AmazonStores/A21TJRUUN4KGV/adffb826cb47b697537ac07087eb6bda.w400.h400.jpg" alt="brand" />
          </div>

          <div>
            <img src="https://as2.ftcdn.net/v2/jpg/04/08/78/09/1000_F_408780978_IpQiJU59zdZEjbwdSYzWHbh6iE8dlFcu.jpg" alt="brand" />
          </div>

          <div>
            <img src="https://singaporemall.co.in/assets/img/stores/peter-england.jpg" alt="brand" />
          </div>

          <div>
            <img src="https://mir-s3-cdn-cf.behance.net/projects/404/a9a70457104569.Y3JvcCw3MzIsNTczLDEzMywyMTM.jpg" alt="brand" />
          </div>

          <div>
            <img src="https://romantic.li/wp-content/uploads/2018/06/LOreal-Custom-Thumbnail-500-a.jpg" alt="brand" />
          </div>

          <div>
            <img src="https://mir-s3-cdn-cf.behance.net/projects/404/9b9e96134935849.Y3JvcCw4NTcsNjcxLDE0LDExOA.jpeg" alt="brand" />
          </div>

          <div>
            <img src="https://img.freepik.com/free-vector/spa-business-logo-gold-lotus-icon_53876-113746.jpg" alt="brand" />
          </div>

        </div>
      </Animate>
    </div>
  )
}

export default HomePage
