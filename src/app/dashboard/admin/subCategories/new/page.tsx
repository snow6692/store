import SubCategoryDetails from "@/components/dashboard/forms/SubCategoryDetails";
import { getAllCategories } from "@/actions/category";
import React from "react";

async function AdminSubCategoryPage() {
  const categories = await getAllCategories();
  return <SubCategoryDetails categories={categories} />;
}

export default AdminSubCategoryPage;
