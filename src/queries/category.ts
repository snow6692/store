"use server";
import { currentDbUser, isAdmin } from "@/actions/userAction";
import prisma from "@/lib/db";
import { Category } from "@prisma/client";

// Function: upsertCategory
// Description: Upserts a category into the database, updating if it exists or creating a new one if not.
// Permission Level: Admin only
// Parameters:
//   - category: Category object containing details of the category to be upserted.
// Returns: Updated or newly created category details.

export const upsertCategory = async (category: Category) => {
  try {
    const user = await currentDbUser();
    if (!user) throw new Error("UnAuthenticated");
    if (user.role !== "ADMIN")
      throw new Error(
        "UnAuthorized Access : Admin privileges required for Entry",
      );

    if (!category) throw new Error("Please provide a category data");
    // Throw error if category with same name or URL already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        AND: [
          {
            OR: [{ name: category.name }, { url: category.url }],
          },
          {
            NOT: {
              id: category.id,
            },
          },
        ],
      },
    });

    if (existingCategory) {
      let errorMessage = "";
      if (existingCategory.name === category.name) {
        errorMessage = "A category with the same name already exists.";
      } else if (existingCategory.url === category.url) {
        errorMessage = "A category with the same URL already exists.";
      }
      throw new Error(errorMessage);
    }

    //Upsert the category to the database
    const categoryDetails = await prisma.category.upsert({
      where: {
        id: category.id,
      },
      update: category,
      create: category,
    });
    return categoryDetails;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Function: getAllCategories
// Description: Retrieves all categories from the database.
// Permission Level: Public
// Returns: Array of categories sorted by updatedAt date in descending order.

export async function getAllCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });

  return categories;
}

// Function: getCategory
// Description: Retrieves a specific category from the database.
// Access Level: Public
// Parameters:
//   - categoryId: The ID of the category to be retrieved.
// Returns: Details of the requested category.

export async function getCategory(categoryId: string) {
  if (!categoryId) throw new Error("Please provide category ID.");

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  return category;
}

// Function: deleteCategory
// Description: Deletes a category from the database.
// Permission Level: Admin only
// Parameters:
//   - categoryId: The ID of the category to be deleted.
// Returns: Response indicating success or failure of the deletion operation.

export async function deleteCategory(categoryId: string) {
  const admin = await isAdmin();
  if (!admin) throw new Error("");
  if (!categoryId) throw new Error("Please provide category ID.");

  const response = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
  return response;
}
