import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';


function AdminRooms() {
  const { location } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, [location]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/showRooms?location=${location}`);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (room) => {
    // Handle update logic here
    console.log('Updating user with ID:', room);
  };

  const handleDelete = async (room, location) => {
    const data = { room, location };
    console.log(data);
    try {
      await axios.delete(`http://localhost:8000/deleteRoom`, { data });
      console.log('User deleted:', room);
      fetchData(); // Fetch updated data after delete
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Admin Rooms</h1>
      <p>Location: {location}</p>
      <div className='row'>
        {users.map((user) => (
          <div className="col-2 mb-3">
            <div className="card ">
              <div className="card-body  color">
                <div className='row'>
                  <div className="user-name col-9 text-center">
                    <h2>{user.room}</h2>
                  </div>
                  <div className="dropdown col text-end">
                    <button className="dropdown-btn">
                      <i className="fa fa-ellipsis-v"></i>
                    </button>
                    <div className="dropdown-content">
                      {/* <button onClick={() => handleUpdate(user._id)}>Update</button> */}
                      <button onClick={() => handleDelete(user.room,user.location)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default AdminRooms
