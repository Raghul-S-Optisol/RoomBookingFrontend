import React , { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link ,useNavigate} from "react-router-dom";
import axios from 'axios'


function AdminLocations() {
    const [showPopup, setShowPopup] = useState(false);
    const [delPopup, setDelPopup] = useState(false);

    const [locationData, setLocationData] = useState({
        location: '',
        count: 0,
      });
    const [delData, setDelData] = useState({
        location:''
    })
    
      const handleInput = (event) => {
        setLocationData((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
      };

      const handleDelInput = (event) => {
        setDelData((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
      };
      const navigate = useNavigate();

      const handleAddSubmit = (event) => {
        event.preventDefault();

        // axios.post
        if(locationData.location!=='' && locationData.count !==0){
            axios.post('http://localhost:8000/addLocation',locationData)
            .then(res => {
                if(res.status===201){
                  navigate('/Locations')
                }else{
                  console.log('error occured')
                  alert('error occured')
                }
              
            })
            .catch(err =>console.log(err))
        }else{
          alert('Enter the fields')
        }
        console.log(locationData);
        setLocationData({ location: '', count: 0 });
        setShowPopup(false); 
      };

      const handleDeleteSubmit = (event) => {
        event.preventDefault();
        console.log(delData);
        // axios.delete
        if(delData.location!==''){
          axios.delete('http://localhost:8000/deleteLocation',{ data: delData })
          .then(res => {
            if (res.status === 200) {
              navigate('/Locations');
            } else if(res.status === 404) {
              alert('location not found');
            }
          })
          .catch(err => console.log(err));
      }else{
        alert('Enter the fields')
      }
         setDelData({ location: '' });
        // setShowPopup(false);
        setDelPopup(false);  
      };
    

  return (
   <>
    <div className='adminLocation-bg d-flex justify-content-center align-items-center'>
        <div>
            <div className='row' ><Link to={"/Locations"} className="add-btn curved ">
                <i class="bi bi-list-task"></i> show Locations
            </Link>           
            </div>
            <div className='row mt-10'>
                    <button  type='button' onClick={() => setShowPopup(true)} class="add-btn curved">
                        <i class="fa fa-plus"></i> Add Location
                    </button>
            </div>
            <div className='row mt-10' >
                    <button  type='button' onClick={() => setDelPopup(true)} class="add-btn curved">
                    <i class="bi bi-trash3-fill"></i>Delete Location 
                    </button>
            </div>
        </div>
            {showPopup && (
        <div className='popup'>
          <form onSubmit={handleAddSubmit}>
            <label htmlFor='location'> Location Name:</label>
            <input
              type='text'
              id='location'
              name='location'
              value={locationData.location}
              onChange={handleInput}
            />

            <label htmlFor='count'>Count:</label>
            <input
              type='number'
              id='count'
              name='count'
              value={locationData.count}
              onChange={handleInput}
            />
            
             <button class="btn btn-dark " type='submit'>Submit</button> 
          </form>
        </div>   
      )}

        {delPopup && (
        <div className='popup'>
          <form onSubmit={handleDeleteSubmit}>
          <label>It delete entire Locations!</label>
            <label htmlFor='location'>Name:</label>
            <input
              type='text'
              id='location'
              name='location'
              value={delData.location}
              onChange={handleDelInput}
            />            
             <button class="btn btn-dark " type='submit'>Delete</button> 
          </form>
        </div>   
      )}



    </div>   
    </>
  )
}

export default AdminLocations
