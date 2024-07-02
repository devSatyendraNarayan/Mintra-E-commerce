import React from "react";

function Modal() {
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn bg-transparent rounded-sm text-rose-500 border-rose-500 hover:bg-transparent hover:border-rose-500"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        {" "}
        <span className=""> ENTER PIN CODE </span>
      </button>
      <dialog id="my_modal_3" className="modal text-gray-800 ">
        <div className="modal-box bg-white">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex flex-col ">
            <p className="mb-5 text-xl font-medium">Enter Delivery Details</p>
            <label className="input input-bordered flex items-center rounded-sm bg-white border-gray-500 gap-2">
              <input type="number" className="grow font-thin" placeholder="Enter Pincode" />
              <span className="cursor-pointer hover:text-rose-400">CHECK</span>
            </label>
            <span className="text-lg my-5 text-gray-500">OR</span>
            <button className="btn rounded-sm bg-white text-gray-800 hover:text-white transition-all ">
              ADD NEW ADDRESS
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Modal;
