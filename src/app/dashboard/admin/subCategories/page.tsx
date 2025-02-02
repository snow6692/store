import SubCategoryDetails from "@/components/dashboard/forms/SubCategoryDetails";
import DataTable from "@/components/ui/DataTable";
import { getAllCategories } from "@/queries/category";
import { getAllSubCategories } from "@/queries/subCategory";
import React from "react";
import { columns } from "./columns";

async function page() {
  const subCategories = await getAllSubCategories();
  if (!subCategories) return null;
  const categories = await getAllCategories();
  return (
    <DataTable
      newTabLink="/dashboard/admin/subCategories/new"
      filterValue="name"
      searchPlaceholder="Search SubCategory name."
      columns={columns}
      data={subCategories}
      modalChildren={<SubCategoryDetails categories={categories} />}
    />
  );
}

export default page;
