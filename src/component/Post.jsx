import axios from "../config/axios";
import React, { useState } from "react";
import { useAuth } from "../hook/use-auth";

export default function Post({ title, userId, id, postObj }) {
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const { authUser } = useAuth();

  const handleDeleteClick = async (blogId) => {
    try {
      axios.delete(`/blogs/${blogId}`);
      location.reload();
      console.log("clicked");
    } catch (err) {
      console.log(err);
    }
  }; //ผูกไว้กับ Button Detele
  const handleEdit = async (blogId) => {
    try {
      axios.put(`/blogs/${blogId}`, { title: editedTitle });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    //     <div
    //       id={id}
    //       className="flex justify-between border border-gray-500 w-[560px] p-4 ml-48"
    //     >
    //       <div>
    //         <h1 className="">{title}</h1>
    //         <h6 className="">สมาชิกหมายเลข {userId}</h6>
    //       </div>
    //       <div className="flex gap-4 pt-6">
    //         <button
    //           className="bg-green-500 p-2 rounded-md text-white"
    //           onClick={() => handleEdit(id)}
    //         >
    //           Save
    //         </button>
    //         <button
    //           className=" bg-gray-500 p-2 rounded-md text-white"
    //           onClick={() => setEditMode(true)}
    //         >
    //           edit
    //         </button>
    //         <button
    //           onClick={() => {
    //             handleDeleteClick(id);
    //           }}
    //           className="bg-red-500 p-2 rounded-md text-white"
    //         >
    //           Delete
    //         </button>
    //       </div>
    //     </div>
    //   );
    // }

    <div
      id={id}
      className="flex justify-between border border-gray-500 w-[560px] p-4 ml-48"
    >
      <div>
        {editMode ? (
          <input
            className="w-full"
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <h1 className="">{title}</h1>
        )}
        <h6 className="">สมาชิกหมายเลข {userId}</h6>
      </div>
      {authUser?.id === postObj.userId ? (
        <div className="flex gap-4 pt-6">
          {editMode ? (
            <button
              className="bg-green-500 p-2 rounded-md text-white"
              onClick={() => handleEdit(id)}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-gray-500 p-2 rounded-md text-white"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
          )}
          <button
            onClick={() => {
              handleDeleteClick(id);
            }}
            className="bg-red-500 p-2 rounded-md text-white"
          >
            Delete
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
