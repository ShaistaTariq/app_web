import React, { useState, useEffect } from 'react';

export default function Services() {
  const [data, setData] = useState([]); // State for recipes
  const [data1, setdata] = useState([]); // State for searched products
  const [searchdata, setsearchdata] = useState(''); // State for search input
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to manage selected recipe for modal
  const [showSection, setShowSection] = useState('allRecipes'); // Default to show all recipes
  const [showinrdient, setshowinrdient] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for menu visibility

  useEffect(() => {
    fetch('https://dummyjson.com/recipes')
      .then((res) => res.json())
      .then((res) => setData(res?.recipes));
  }, []);

  // Function to search for products based on user input
  const SearchRecipe = () => {
    fetch(`https://dummyjson.com/products/search?q=${searchdata}`)
      .then((res) => res.json())
      .then((res) => setdata(res.products))
      .catch((err) => console.error(err));
  };

  const handleImageClick = (recipe) => {
    setSelectedRecipe(recipe); // Set the clicked recipe to state
  };

  const closeModal = () => {
    setSelectedRecipe(null); // Close the modal by setting recipe to null
  };

  // Function to display all recipes
  const AllRecepies = () => {
    return (
      <div>
        {data?.map((e) => {
          return (
            <div
              key={e.id}
              style={{
                backgroundColor: '#76aac0',
                display: 'flex',
                border: '2px solid black',
                width: '100%', // Use '100%' for responsive layout
                marginBottom: '10px' // Space between recipes
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3 style={{ color: 'white', margin: '0 10px' }}>ID</h3>
                <h4>{e.id}</h4>
              </div>
              <div>
                <img
                  src={e.image}
                  alt={e.name}
                  style={{
                    height: 400,
                    width: 400,
                    margin: '0 10px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleImageClick(e)} // Open the modal when image is clicked
                />
              </div>
              <div style={{ margin: '0 10px' }}>
                <h2 style={{ fontWeight: 'bold' }}>Name: {e.name}</h2>
                <h3>Cook Time: {e.cookTimeMinutes} minutes</h3>
                <h3>Cuisine: {e.cuisine}</h3>
                <h3>Difficulty: {e.difficulty}</h3>
                <h3>UserId: {e.userId}</h3>
                <h3>Rating: {e.rating}</h3>
                <h3>Servings: {e.servings}</h3>
                <button onClick={() => setshowinrdient((prev) => !prev)}>
                  {showinrdient ? 'HIDE INGREDIENTS' : 'SHOW INGREDIENTS'}
                </button>

                {showinrdient && (
                  <>
                    {e.ingredients?.map((ing, ind) => (
                      <div key={ind} style={{ backgroundColor: 'gray' }}>
                        <h3>{ing}</h3>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Modal styles and logic
  const modalStyles = {
    position: 'fixed',
    top: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'White',
    padding: '20px',
    zIndex: 1000,
    maxHeight: '70vh',
    overflowY: 'auto',
    width: '50%',
    color: 'black',
  };

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
  };

  const closeButtonStyles = {
    position: 'absolute',
    top: 10,
    right: 10,
    cursor: 'pointer',
    fontSize: '20px',
    color: 'red',
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev); // Toggle menu visibility

  return (
    <div>
      {/* Three dots menu */}
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        <button onClick={toggleMenu} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '30px' }}>
          ⋮
        </button>
        {menuOpen && (
          <div style={{
            position: 'absolute',
            top: '30px',
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: 1000,
          }}>
            <div onClick={() => { setShowSection('allRecipes'); toggleMenu(); }} style={{ padding: '10px', cursor: 'pointer' }}>
              All Products
            </div>
            <div onClick={() => { setShowSection('search'); toggleMenu(); }} style={{ padding: '10px', cursor: 'pointer' }}>
              Search Products
            </div>
          </div>
        )}
      </div>

      {/* Conditionally render different sections based on which menu item is clicked */}
      {showSection === 'allRecipes' && <AllRecepies />}
      {showSection === 'search' && (
        <div>
          <input
            placeholder="ENTER FOR YOUR SEARCH"
            onChange={(txt) => setsearchdata(txt.target.value)}
          />
          <button onClick={SearchRecipe}>SEARCH</button>
          {data1 && data1.length > 0 ? (
            <div>
              {data1?.map((record) => {
                return (
                  <div key={record.id}>
                    <h1>{record.title}</h1>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <h1>NO RECORD FOUND</h1>
            </div>
          )}
        </div>
      )}

      {/* Render Modal if selectedRecipe is not null */}
      {selectedRecipe && (
        <>
          <div style={overlayStyles} onClick={closeModal}></div>
          <div style={modalStyles}>
            <span style={closeButtonStyles} onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedRecipe.name}</h2>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
              style={{ height: 200, width: 200 }}
            />
            <h3>Cook Time: {selectedRecipe.cookTimeMinutes} minutes</h3>
            <h3>Cuisine: {selectedRecipe.cuisine}</h3>
            <h3>Difficulty: {selectedRecipe.difficulty}</h3>
            <h3>User ID: {selectedRecipe.userId}</h3>
            <h3>Rating: {selectedRecipe.rating}</h3>
            <h3>Servings: {selectedRecipe.servings}</h3>
            <h3>Ingredients:</h3>
            {selectedRecipe.ingredients?.map((ing, ind) => (
              <p key={ind}>{ing}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

