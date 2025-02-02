import CategoryDetails from "@/components/dashboard/forms/CategoryDetails";
import DataTable from "@/components/ui/DataTable";
import { getAllCategories } from "@/queries/category";
import { Plus } from "lucide-react";
import { columns } from "./columns";

async function AdminCategoriesPage() {
  const categories = await getAllCategories();

  if (!categories) return null;
  return (
    <DataTable
    
      columns={columns}
      searchPlaceholder="Search category name..."
      data={categories}
      filterValue="name"
      modalChildren={<CategoryDetails />}
      actionButtonText={
        <>
          <Plus size={15} /> Create category
        </>
      }
    />
  );
}

export default AdminCategoriesPage;
