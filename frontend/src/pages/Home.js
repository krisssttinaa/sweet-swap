import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <div className="hero-image">
          <div className="hero-text">
            <h1></h1>
            <p>Explore the world of sugar-free food</p>
          </div>
        </div>
      </header>
      <section className="home-recipes">

        <div className="recipe-categories">
          <div className="category">
            <img src="/images/salad.jpg" alt="Salads" />
            <p>Salads</p>
          </div>
          <div className="category">
            <img src="/images/vegetarian.jpg" alt="Vegetarian Dishes" />
            <p>Vegetarian Dishes</p>
          </div>
          <div className="category">
            <img src="/images/snacks.jpg" alt="Low-Sugar Snacks" />
            <p>Low-Sugar Snacks</p>
          </div>
          <div className="category">
            <img src="/images/sugar-free-desserts.jpg" alt="Sugar-Free Desserts" />
            <p>Sugar-Free Desserts</p>
          </div>
          <div className="category">
            <img src="/images/beverages.jpg" alt="Healthy Beverages" />
            <p>Healthy Beverages</p>
          </div>
          <div className="category">
            <img src="/images/low-sugar-desserts.jpg" alt="Low-Sugar Desserts" />
            <p>Low-Sugar Desserts</p>
          </div>
        </div>
      </section>
      <section className="home-new-recipes">
        <h2>New recipes</h2>
        <div className="new-recipes-list">
          <div className="recipe-card">
            <img src="/images/low-sugar-chocolate-cake.jpg" alt="Low-Sugar Chocolate Cake" />
            <h3>Low-Sugar Chocolate Cake</h3>
            <p>Short description of the lovely offer.</p>
            <a href="#">Recipe</a>
          </div>
          <div className="recipe-card">
            <img src="/images/veggie-stirfry.jpg" alt="Veggie Stir-Fry" />
            <h3>Veggie Stir-Fry</h3>
            <p>Short description of the lovely offer.</p>
            <a href="#">Recipe</a>
          </div>
          <div className="recipe-card">
            <img src="/images/banana-bread.jpg" alt="Healthy Banana Bread" />
            <h3>Healthy Banana Bread</h3>
            <p>Short description of the lovely offer.</p>
            <a href="#">Recipe</a>
          </div>
        </div>
        <div className="all-recipes-button">
          <a href="#">All Recipes</a>
        </div>
      </section>
      <footer className="home-footer">
        <div className="social-links">
          {/* Uncomment and update with your social links if needed
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-google-plus-g"></i></a> */}
        </div>
        <p>© 2021 Sweet Swap</p>
      </footer>
    </div>
  );
};

export default Home;
