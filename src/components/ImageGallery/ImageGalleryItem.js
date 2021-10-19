import PropTypes from "prop-types";

function GalleryItem({ image, onOpenModal }) {
  return (
    <li className="ImageGalleryItem">
      <img
        src={image.webformatURL}
        alt=""
        className="ImageGalleryItem-image"
        data-img={image.largeImageURL}
        onClick={onOpenModal}
      />
    </li>
  );
}

GalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default GalleryItem;
