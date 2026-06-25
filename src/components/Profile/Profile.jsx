import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/Sidebar";
import "./Profile.css";

export default function Profile({
  clothingItems,
  handleCardClick,
  onAddClick,
  setActiveModal,
}) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        onAddClick={onAddClick}
      />
      <button
        className="profile__edit-button"
        onClick={() => setActiveModal("edit-profile")}
      >
        Edit profile
      </button>
    </section>
  );
}
