import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../store/slices/menu";
import "./style.scss";

const Modal = ({ modalImage }) => {
  const { isModalOpen } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    }
  }, [isModalOpen]);

  const modalHandler = () => {
    document.body.style.overflow = "unset";
    dispatch(toggleModal());
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal" onClick={modalHandler}>
          <img src={modalImage} alt="" className="modal__image" />
        </div>
      )}
    </>
  );
};

export default Modal;
