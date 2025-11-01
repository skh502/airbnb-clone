import Categories from "@/components/Categories";
import PropertyList from "@/components/properties/PropertyList";

export default function Home() {
  return (
    <main className="max-w-[1500px] mx-auto px-6">
      <Categories />

      <div className="w-full">
        <PropertyList />
      </div>
    </main>
  );
}
