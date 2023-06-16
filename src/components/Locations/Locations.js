import React ,{ useEffect, useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";


function Locations() {


  const [users, setUsers] = useState([]);
  const [delPopup, setDelPopup] = useState(false);
  const [delData, setDelData] = useState({
    location: ''
  });
  const [updatePopup, setUpdatePopup] = useState(false);
  const [updateData, setUpdateData] = useState({
    location: '',
    count:0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/showLocation');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleYes = (event) => {
    event.preventDefault();

    axios
      .delete('http://localhost:8000/deleteLocation', { data: delData })
      .then((res) => {
        if (res.status === 200) {
          setUsers(users.filter((user) => user.location !== delData.location));
        } else if (res.status === 404) {
          alert('location not found');
        }
      })
      .catch((err) => console.log(err));
    setDelData({ location: '' });
    setDelPopup(false); // Close the confirmation popup
  };

  const handleNo = () => {
    setDelPopup(false); // Close the confirmation popup
  };

  const handleUpdateInput = (event) => {
    setUpdateData((prev) => ({
      ...prev,
      [event.target.name]: parseInt(event.target.value, 10),
    }));
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    console.log(updateData);
    // axios.update
    if(updateData.location!==''){
      axios.put('http://localhost:8000/updateLocation',updateData)
      .then(res => {
        if (res.status === 200) {
          fetchData();
        } else if(res.status === 404) {
          alert('location not found');
        }
      })
      .catch(err => console.log(err));
    }else{
        alert('Enter the fields')
    }
    setUpdateData({ location: '',count : 0 });
    setUpdatePopup(false);  
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red', fontSize: '30px' }}>
        LIST OF LOCATIONS
      </div>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">LOCATIONS</th>
            <th scope="col">ROOMS</th>
            <th scope="col" colSpan="2">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.location}>
              <td>
                <Link to={`/AdminRooms/${encodeURIComponent(user.location)}`} className="btn btn-link curved ">
                  {user.location}
                </Link>
              </td>
              <td>{user.count}</td>
              <td>
              <button
                  onClick={() => {
                    setUpdateData({ location: user.location });
                    setUpdatePopup(true);
                  }}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    setDelData({ location: user.location });
                    setDelPopup(true);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {delPopup && (
        <div className="popup-del">
          <div className="popup-del1">
            <p>Are you sure you want to delete?</p>
            <div className='row'>
            <button className='col' onClick={handleYes}>Yes</button>
            <div className='col'>   </div>
            <button className='col' onClick={handleNo}>No</button>
            </div>
          </div>
        </div>
      )}

      {updatePopup && (
        <div className='popup'>
          <form onSubmit={handleUpdateSubmit}>
            <label>How many rooms do you want to Update?</label>
            <label htmlFor='count'>Count:</label>
            <input
                type='number'
                id='count'
                name='count'
                value={updateData.count}
                onChange={handleUpdateInput}
/>           
             <button class="btn btn-dark " type='submit'>Add</button> 
          </form>
        </div>   
      )}
    </>
  );
}

export default Locations
