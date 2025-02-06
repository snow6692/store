"use server";
import { currentDbUser, isAdmin } from "@/actions/userAction";
import prisma from "@/lib/db";
import { SubCategory } from "@prisma/client";

// Function: upsertSubCategory
// Description: Upserts a subCategory into the database, updating if it exists or creating a new one if not.
// Permission Level: Admin only
// Parameters:
//   - SubCategory: subCategory object containing details of the subCategory to be upserted.
// Returns: Updated or newly created subCategory details.

export const upsertSubCategory = async (subCategory: SubCategory) => {
  try {
    const user = await currentDbUser();
    if (!user) throw new Error("UnAuthenticated");
    if (user.role !== "ADMIN")
      throw new Error(
        "UnAuthorized Access : Admin privileges required for Entry",
      );

    if (!subCategory) throw new Error("Please provide   subCategory data");
    // Throw error if category with same name or URL already exists
    const existingSubCategory = await prisma.subCategory.findFirst({
      where: {
        AND: [
          {
            OR: [{ name: subCategory.name }, { url: subCategory.url }],
          },
          {
            NOT: {
              id: subCategory.id,
            },
          },
        ],
      },
    });

    if (existingSubCategory) {
      let errorMessage = "";
      if (existingSubCategory.name === subCategory.name) {
        errorMessage = "A subCategory with the same name already exists.";
      } else if (existingSubCategory.url === subCategory.url) {
        errorMessage = "A subCategory with the same URL already exists.";
      }
      throw new Error(errorMessage);
    }

    //Upsert the category to the database
    const subCategoryDetails = await prisma.subCategory.upsert({
      where: {
        id: subCategory.id,
      },
      update: subCategory,
      create: subCategory,
    });
    return subCategoryDetails;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Function: getAllSubCategories
// Description: Retrieves all subCategories from the database.
// Permission Level: Public
// Returns: Array of categories sorted by updatedAt date in descending order.
export const getAllSubCategories = async () => {
  // Retrieve all subCategories from the database
  const subCategories = await prisma.subCategory.findMany({
    include: {
      category: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return subCategories;
};

// Function: getSubCategory
// Description: Retrieves a specific SubCategory from the database.
// Access Level: Public
// Parameters:
//   - SubCategoryId: The ID of the SubCategory to be retrieved.
// Returns: Details of the requested SubCategory.
export const getSubCategory = async (subCategoryId: string) => {
  if (!subCategoryId) throw new Error("Please provide suCategory ID.");

  const subCategory = await prisma.subCategory.findUnique({
    where: {
      id: subCategoryId,
    },
  });
  return subCategory;
};

// Function: deleteSubCategory
// Description: Deletes a SubCategory from the database.
// Permission Level: Admin only
// Parameters:
//   - SubCategoryId: The ID of the SubCategory to be deleted.
// Returns: Response indicating success or failure of the deletion operation.n.

export const deleteSubCategory = async (subCategoryId: string) => {
  const admin = await isAdmin();
  if (!admin) throw new Error("");
  if (!subCategoryId) throw new Error("Please provide subCategory ID.");

  const response = await prisma.subCategory.delete({
    where: {
      id: subCategoryId,
    },
  });
  return response;
};
