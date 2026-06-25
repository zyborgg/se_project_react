import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/Sidebar";
import "./Profile.css";

export default function Profile({
  clothingItems,
  handleCardClick,
  onAddClick,
}) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        onAddClick={onAddClick}
      />
    </section>
  );
}
