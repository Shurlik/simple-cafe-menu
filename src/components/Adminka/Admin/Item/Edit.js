import React, { useState } from "react";
import "./style.scss";
import { useForm } from "react-hook-form";
import { useFirebase } from "../../../../hooks/useFirebase";
import Loader from "../../../Loader";
import { categoryUA } from "../../../../constants";

const Edit = ({ editItem, cancel }) => {
  const { register, handleSubmit, setValue } = useForm({
    shouldUseNativeValidation: true,
  });
  const { updateItem, fbFileUpload } = useFirebase();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [showFileField, setShowFileField] = useState(false);
  const [dishImage, setDishImage] = useState(editItem.image || "");

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      description: {
        en: data.descriptionEn,
        ua: data.descriptionUa,
      },
      title: {
        en: data.titleEn,
        ua: data.titleUa,
      },
    };
    delete newData.descriptionEn;
    delete newData.descriptionUa;
    delete newData.titleEn;
    delete newData.titleUa;

    setLoading(true);
    const res = await updateItem({ index: editItem.index, data: newData });
    if (res === false) {
      setLoading(false);
      setError("Щось пішло не так");
      return;
    }
    setLoading(false);
    cancel();
  };

  const imageUploadHandler = async (event) => {
    event.preventDefault();
    setFileLoading(true);
    const result = await fbFileUpload(imageUpload);
    if (result) {
      setValue("image", result);
      setDishImage(result);
      setShowFileField(false);
    }
    setFileLoading(false);
  };

  return (
    <div className={"edit"}>
      <div className="edit__wrapper">
        {error && <div className={"edit__error"}>{error}</div>}
        <div>
          <span className="item__buttons--edit" onClick={cancel}>
            Закрити
          </span>
        </div>
        <h2 className={"edit__title"}>
          {editItem ? "Редагування картки товару" : "Додавання нового товару"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className={"edit"}>
          <div className="edit__container">
            <div>
              <div className={"edit__item"}>
                <span>Індекс блюда у меню:</span>
                <input
                  maxLength={3}
                  {...register("index", {
                    required: "Унікальне значення",
                    value: editItem?.index,
                  })}
                />
              </div>
              <div className={"edit__item"}>
                <span>Категорія блюда:</span>
                <select
                  {...register("category", {
                    value: editItem?.category || 1,
                  })}
                >
                  {categoryUA.map((_, key) => {
                    return (
                      <option value={key} key={key}>
                        {categoryUA[key]}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={"edit__item"}>
                <span>Назва блюда Укр:</span>
                <input
                  {...register("titleUa", {
                    value: editItem?.title?.ua,
                  })} // custom message
                />
              </div>
              <div className={"edit__item"}>
                <span>Назва блюда En:</span>
                <input
                  {...register("titleEn", {
                    value: editItem?.title?.en,
                  })} // custom message
                />
              </div>
              <div className={"edit__item"}>
                <span>Опис блюда Укр:</span>
                <input
                  {...register("descriptionUa", {
                    value: editItem?.description?.ua,
                  })} // custom message
                />
              </div>
              <div className={"edit__item"}>
                <span>Опис блюда En:</span>
                <input
                  {...register("descriptionEn", {
                    value: editItem?.description?.en,
                  })} // custom message
                />
              </div>
              <div className={"edit__item"}>
                <span>Вага або кількість:</span>
                <input
                  type={"number"}
                  step={0.1}
                  {...register("weight", {
                    required: false,
                    value: editItem?.weight,
                  })} // custom message
                />
                <select
                  {...register("unit", {
                    value: editItem?.unit || "gram",
                  })}
                >
                  <option value="gram">Грами</option>
                  <option value="piece">Штуки</option>
                  <option value="litr">Літри</option>
                </select>
              </div>

              <div className={"edit__item"}>
                <span>Ціна:</span>
                <input
                  type={"number"}
                  {...register("price", {
                    required: true,
                    value: editItem?.price,
                  })} // custom message
                />
              </div>
              <div className={"edit__item"}>
                <span>Наявність:</span>
                <input
                  type={"checkbox"}
                  {...register("available", {
                    value: editItem?.available,
                  })} // custom message
                />
              </div>
            </div>
            <div className="edit__image">
              <img src={dishImage} alt="" />
            </div>
          </div>
          <div className={"edit__item"}>
            <span>Картинка блюда:</span>
            <input
              placeholder="Посилання на картинку"
              {...register("image", {
                value: editItem?.image || "",
              })} // custom message
            />
            <div>
              <input
                className="edit__fileField--checkbox"
                type="checkbox"
                checked={showFileField}
                onChange={() => {
                  setShowFileField(!showFileField);
                }}
              />
              <span className="edit__fileField--text">Файл</span>
            </div>
          </div>
          {showFileField && (
            <div className="edit__item edit__fileChoose">
              {fileLoading ? (
                <Loader />
              ) : (
                <div>
                  <input
                    title={"Обрати файл"}
                    type="file"
                    onChange={(event) => setImageUpload(event.target.files[0])}
                  />
                  <button onClick={imageUploadHandler}>Завантажити</button>
                </div>
              )}
            </div>
          )}
          <div className={"edit__item"}>
            <span>Гострота блюда:</span>
            <select {...register("hot", { value: editItem?.hot || 0 })}>
              <option value={0}>Не гостре</option>
              <option value={1}>Трохи гостре</option>
              <option value={2}>Гостре</option>
              <option value={3}>Дуже гостре</option>
            </select>
          </div>
          <div className={"edit__btn"}>
            {loading ? (
              <div className="edit__waiting" />
            ) : (
              <input type="submit" />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
