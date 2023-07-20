import React, { useState } from 'react';
import { Link ,useNavigate,useParams} from 'react-router-dom';
import { Url } from '../../../connection';
import useGetRequest from '../../customeHooks/fetchData';
const BatchLandingPage = () => {
    const {id} =useParams()
    const [searchTerm, setSearchTerm] = useState('');
    const { data, isError: getrequestError, isLoading: getrequestLoading, refetch, isSuccess } = useGetRequest(`${Url}/batch/${id}`)
    console.log("batchdata :", data);
    const navigate = useNavigate();
    let filteredStudents = [];
    // Sample batch data (replace this with your actual batch data)
    //   const studentData = [
    //     {  _id:'1',email: 'hero@hero.com',username:"Pegasis",batch:"batch 8" },

    //     // Add more batches as needed
    //   ];


    // Function to handle search input change
    const handleSearchChange = (e) => {
        const searchString = e.target.value.toLowerCase();
        setSearchTerm(searchString);
    };

    // Function to filter batches based on search term

    if (isSuccess && data && data.batch && data.batch.students) {
        filteredStudents = data.batch.students.filter((student) => {
            const StudentbyEmail = student.email?.toLowerCase();
            return StudentbyEmail?.includes(searchTerm);
        });
    }
    if (getrequestLoading) {
        return <div>Data Loading...</div>
    }
    if (getrequestError) {
        return <div>Error loading data...</div>
    }

    return (
        <div className="container mt-5">
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Batch Name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {filteredStudents.length !== 0 &&
                    filteredStudents.map((student, id) => (
                        <div key={student._id} className="col">
                            <div className="card shadow-sm" style={{ backgroundColor: '#6b050b', borderRadius: '10px' }}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4">

                                    <img src="/images/hero.jpg" alt="" srcset="" style={{ height: "100%", width: '100%', borderRadius: '10px' }} />
                                        </div>
                                        <div className="col-8">
                                        <h6 className="card-title text-white">Email : {student.email}</h6>
                                    <h6 className="card-title text-white">Username : {student.username}</h6>
                                    <h6 className="card-title text-white">Batch : {data.batch.name}</h6>
                                    <Link to={`/admin/${student._id}`}>
                                        <button type="button" className="btn btn-danger" onClick={()=>navigate('')}>
                                            View Student Detail
                                        </button>
                                    </Link>
                                        </div>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>

                    ))
                    
                }
            </div>
        </div>
    );
};

export default BatchLandingPage;
