import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { HiEye, HiPencilAlt, HiTrash } from "react-icons/hi";

const AllScholarshipsAdmin = () => {
  const axiosSecure = useAxiosSecure();

  const { data: scholarships = [], refetch } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return res.data;
    },
  });

  const handleDeleteScholarship = (scholarship) => {
    const id = scholarship._id;
    axiosSecure.delete(`/scholarships/${id}`).then((result) => {
      console.log(result.data);
      if (result.data.deletedCount) {
        refetch();
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl md:text-5xl text-primary font-bold my-10">
        Scholarships : {scholarships.length}
      </h2>

      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead className="text-primary">
              <tr>
                <th>SL</th>
                <th>Scholarship Name</th>
                <th>Job</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((scholarship, index) => (
                <tr key={scholarship._id}>
                  <th>{index + 1}</th>
                  <td>{scholarship.scholarshipName}</td>
                  <td>Quality Control Specialist</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium w-2/12">
                    <div className="flex space-x-2">
                      {/* Details Button (Link to property/comment page) */}
                      <Link
                        to={`/scholarships/details/${scholarship._id}`}
                        className="p-2 text-blue-600 hover:text-blue-800 rounded-full transition duration-150"
                        title="View Details"
                      >
                        <HiEye className="w-5 h-5" />
                      </Link>

                      {/* Edit Button */}
                      <button
                        // onClick={() => editHandler(comment.id)}
                        className="p-2 text-yellow-600 hover:text-yellow-800 rounded-full transition duration-150"
                        title="Update Scholarship"
                      >
                        <HiPencilAlt className="w-5 h-5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteScholarship(scholarship)}
                        className="p-2 text-red-600 hover:text-red-800 rounded-full transition duration-150"
                        title="Trash Scholarship"
                      >
                        <HiTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllScholarshipsAdmin;
