import { useEffect, useRef, useState } from "react";
import { Button, Input, CloseButton, useToast } from "@chakra-ui/react";
import uploadApi from "../../utils/uploadAxios";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/reselect";
import { fillUser } from "../../redux/reducers/userSlice";

const Photos = () => {
  const dispatch = useDispatch();
  const image = useRef();
  const toast = useToast();
  const user = useSelector(userSelector);
 
  const [photo, setPhoto] = useState("");
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      toast({
        title: "Ошибка",
        description: "Можно загружать только изображения",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview({ file, url, desc: "" });
  };

  const handleSavePreview = async () => {
    if (!preview?.file) return;

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("image", preview.file);

      const { data } = await uploadApi.post("/upload", formData);
      const fullUrl = `http://localhost:3001${data.url}`;

      const newPhoto = { url: fullUrl, description: preview.desc };
      const updatedPhotos = [...(user.photos || []), newPhoto];

      await axios.patch(`/users/${user.id}`, { photos: updatedPhotos });

      dispatch(fillUser({ ...user, photos: updatedPhotos }));
      toast({
        title: "Фото добавлено",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setPreview(null);
    } catch (err) {
      console.error("Ошибка:", err);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить фото",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const savePhotoToProfile = async (url) => {
    if (!url) return;

    const newPhoto = { url, description: desc };
    const updatedPhotos = [...(user.photos || []), newPhoto];

    try {
      await axios.patch(`/users/${user.id}`, {
        photos: updatedPhotos,
      });

      const newUser = {
        ...(user || {}),
        photos: updatedPhotos,
      };

      dispatch(fillUser(newUser));

      toast({
        title: "Фото сохранено",
        description: "Фото добавлено в ваш профиль",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      resetHandler();
    } catch (err) {
      console.error("Ошибка сохранения:", err);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить фото",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const resetHandler = () => {
    setPhoto("");
    setDesc("");
  };

  const deletePhoto = async (url) => {
    try {
      setIsLoading(true);
      console.log("delete", url);
      const fileName = url.split("/").pop();
      await uploadApi.delete(`/upload/${encodeURIComponent(fileName)}`);

      const updatedPhotos = user.photos.filter((photo) => photo.url !== url);

      await axios.patch(`/users/${user.id}`, {
        photos: updatedPhotos,
      });

      dispatch(fillUser({ ...user, photos: updatedPhotos }));
      toast({
        title: "Фото удалено",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Ошибка удаления:", err);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить фото",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="photos">
      <div className="container">
        <div className="photos__content">
          <div className="photos__top">
            <h2 className="photos__images">Мои картинки</h2>
            <div className="photos__btns">
              <Button colorScheme="blue" variant="solid" size="sm">
                Создать альбом
              </Button>
              <Button
                onClick={() => image.current.click()}
                colorScheme="gray"
                size="sm"
                variant="solid"
                isLoading={isLoading}
                loadingText="Загрузка..."
              >
                Добавить фотографию
              </Button>

              <input
                onChange={handleImage}
                ref={image}
                hidden
                type="file"
                id="image"
                accept="image/*"
              />
            </div>
          </div>

          {user.photos?.length > 0 ? (
            <>
              <div className="photos__list">
                {user.photos.map((item, i) => (
                  <div className="photos__list-item">
                    <div className="photos__image" key={i}>
                      <CloseButton
                        className="photos__image-close"
                        onClick={() => deletePhoto(item.url)}
                        position="absolute"
                        right="8px"
                        top="8px"
                        zIndex="1"
                      />

                      <img
                        className="photos__image-img"
                        src={item.url}
                        alt={item.description || `Фото ${i + 1}`}
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                     
                    </div>
                     <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="photos__empty">
              Вы можете загружать тысячи фотографий и помещать их в альбомы
            </div>
          )}

          {preview && (
            <div className="photos__preview">
              <img
                src={preview.url}
                alt="Предпросмотр"
                className="photos__image-img"
              />
              <Input
                placeholder="Введите описание"
                value={preview.desc}
                onChange={(e) =>
                  setPreview((prev) => ({ ...prev, desc: e.target.value }))
                }
                mt={2}
              />
              <Button
                onClick={handleSavePreview}
                colorScheme="teal"
                mt={2}
                isLoading={isLoading}
              >
                Сохранить
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Photos;
