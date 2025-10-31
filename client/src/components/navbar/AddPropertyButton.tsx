"use client";
import useAddPropertyModal from "@/hooks/useAddPropertyModal";

const AddPropertyButton = () => {
  const addPropertyModal = useAddPropertyModal();

  const handleClick = () => {
    addPropertyModal.open();
  };

  return (
    <div
      onClick={handleClick}
      className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200"
    >
      Airbnb home
    </div>
  );
};

export default AddPropertyButton;
