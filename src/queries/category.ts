"use server";
import { currentDbUser } from "@/actions/userAction";
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
