import CategoryDetails from "@/components/dashboard/forms/CategoryDetails";
import DataTable from "@/components/ui/DataTable";
import { getAllCategories } from "@/queries/category";
import { columns } from "./columns";

async function AdminCategoriesPage() {
  const categories = await getAllCategories();

  if (!categories) return null;
  return (
    <DataTable
    newTabLink="/dashboard/admin/categories/new"
      columns={columns}
      searchPlaceholder="Search category name..."
      data={categories}
      filterValue="name"
      modalChildren={<CategoryDetails />}
  
    />
  );
}

export default AdminCategoriesPage;
